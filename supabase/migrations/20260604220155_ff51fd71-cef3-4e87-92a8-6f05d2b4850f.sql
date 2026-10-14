-- Create the function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to run the function on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure profiles table has proper RLS for the user to manage their own profile
-- (Already exists, but let's make sure it's robust)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to manage their own profiles
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can manage their own profiles') THEN
        CREATE POLICY "Users can manage their own profiles" ON public.profiles
        FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
    END IF;
END $$;

-- Allow service_role to manage all profiles (important for edge functions and triggers)
GRANT ALL ON public.profiles TO service_role;
GRANT ALL ON public.profiles TO postgres;
