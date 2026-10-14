ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS business_address TEXT,
ADD COLUMN IF NOT EXISTS business_city TEXT,
ADD COLUMN IF NOT EXISTS business_state TEXT,
ADD COLUMN IF NOT EXISTS business_zip TEXT,
ADD COLUMN IF NOT EXISTS business_phone TEXT,
ADD COLUMN IF NOT EXISTS business_whatsapp TEXT,
ADD COLUMN IF NOT EXISTS business_instagram TEXT,
ADD COLUMN IF NOT EXISTS opening_hours JSONB DEFAULT '{"mon": {"open": "09:00", "close": "18:00", "active": true}, "tue": {"open": "09:00", "close": "18:00", "active": true}, "wed": {"open": "09:00", "close": "18:00", "active": true}, "thu": {"open": "09:00", "close": "18:00", "active": true}, "fri": {"open": "09:00", "close": "18:00", "active": true}, "sat": {"open": "09:00", "close": "14:00", "active": true}, "sun": {"open": "00:00", "close": "00:00", "active": false}}'::jsonb,
ADD COLUMN IF NOT EXISTS notification_preferences JSONB DEFAULT '{"reminders": true, "stock_alerts": true, "risk_clients": true}'::jsonb;
