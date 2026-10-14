import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
const supabaseUrl = "https://ydahlwdufvfminawjapc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkYWhsd2R1ZnZmbWluYXdqYXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NTg3NzksImV4cCI6MjEwNDAzNDc3OX0.IeN76nlqiyOI6j5LbcBpZnzypDUc--a09AAL8rKEtx0";
const isomorphicStorage = {
  getItem: (key) => {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key, value) => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {
      }
    }
  },
  removeItem: (key) => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(key);
      } catch (e) {
      }
    }
  }
};
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: isomorphicStorage,
    autoRefreshToken: typeof window !== "undefined",
    persistSession: true,
    detectSessionInUrl: typeof window !== "undefined"
  }
});
export {
  supabase as s
};
