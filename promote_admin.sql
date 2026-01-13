-- Run this in the Supabase SQL Editor to promote the user to Admin

DO $$
DECLARE
  target_user_id uuid;
BEGIN
  -- 1. Find the user's UUID from the auth system table
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = 'admin@stressfreeholidaymakers.com';

  IF target_user_id IS NOT NULL THEN
    -- 2. Upsert into profiles making them an admin
    -- This handles both cases: if profile exists (Update) or doesn't exist (Insert)
    INSERT INTO public.profiles (id, email, role, updated_at)
    VALUES (target_user_id, 'admin@stressfreeholidaymakers.com', 'admin', now())
    ON CONFLICT (id) DO UPDATE
    SET role = 'admin', updated_at = now();
    
    RAISE NOTICE 'SUCCESS: User % has been promoted to admin.', 'admin@stressfreeholidaymakers.com';
  ELSE
    RAISE NOTICE 'WARNING: User % not found in auth.users. Please ensure they have signed up first.', 'admin@stressfreeholidaymakers.com';
  END IF;
END $$;
