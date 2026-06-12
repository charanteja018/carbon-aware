-- Profiles Table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    display_name TEXT,
    green_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emissions Log Table
CREATE TABLE public.emissions_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL, -- 'Transport', 'Food', 'Electricity', 'Purchases'
    amount_kg_co2 NUMERIC NOT NULL,
    action_description TEXT, -- e.g., 'Commuted to work by car'
    logged_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Goals / Nudges Table (Behavior change focus)
CREATE TABLE public.user_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL, -- e.g., 'Meatless Week'
    target_reduction_kg NUMERIC NOT NULL,
    current_progress_kg NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'active', -- 'active', 'completed', 'failed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)

-- Profiles RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile." ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Emissions Logs RLS
ALTER TABLE public.emissions_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own logs." ON public.emissions_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own logs." ON public.emissions_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own logs." ON public.emissions_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own logs." ON public.emissions_logs FOR DELETE USING (auth.uid() = user_id);

-- User Goals RLS
ALTER TABLE public.user_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own goals." ON public.user_goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own goals." ON public.user_goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own goals." ON public.user_goals FOR UPDATE USING (auth.uid() = user_id);

-- Trigger to automatically create a profile when a new user signs up in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, green_score)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 0);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
