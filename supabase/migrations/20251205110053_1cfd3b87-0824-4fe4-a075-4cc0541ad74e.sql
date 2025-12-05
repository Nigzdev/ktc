-- Create page blocks table for the page builder
CREATE TABLE public.page_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name text NOT NULL DEFAULT 'home',
  block_type text NOT NULL,
  block_key text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page_name, block_key)
);

-- Create pricing plans table
CREATE TABLE public.pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_name text NOT NULL,
  price integer NOT NULL,
  duration text NOT NULL,
  features text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE public.achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  achievement_date date,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create website settings table
CREATE TABLE public.website_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for page_blocks
CREATE POLICY "Anyone can view page blocks" ON public.page_blocks FOR SELECT USING (true);
CREATE POLICY "Anyone can manage page blocks" ON public.page_blocks FOR ALL USING (true) WITH CHECK (true);

-- RLS policies for pricing_plans
CREATE POLICY "Anyone can view pricing plans" ON public.pricing_plans FOR SELECT USING (true);
CREATE POLICY "Anyone can manage pricing plans" ON public.pricing_plans FOR ALL USING (true) WITH CHECK (true);

-- RLS policies for achievements
CREATE POLICY "Anyone can view achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Anyone can manage achievements" ON public.achievements FOR ALL USING (true) WITH CHECK (true);

-- RLS policies for website_settings
CREATE POLICY "Anyone can view website settings" ON public.website_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can manage website settings" ON public.website_settings FOR ALL USING (true) WITH CHECK (true);

-- Insert default website settings
INSERT INTO public.website_settings (setting_key, setting_value) VALUES
('contact', '{"phone": "+91 93547 20445", "address": "Rajendra Nagar Sector 2, Shahibabad, Near Karan Gate Police Choki", "email": ""}'),
('logo', '{"url": ""}'),
('social', '{"whatsapp": "+91 93547 20445", "instagram": "", "facebook": ""}');

-- Insert default page blocks
INSERT INTO public.page_blocks (page_name, block_type, block_key, content, display_order) VALUES
('home', 'hero', 'hero_main', '{"title": "Master the Art of Taekwondo", "subtitle": "Join KTC Club and transform your life through discipline, fitness, and self-defense", "cta_text": "Join Now"}', 1),
('home', 'about', 'about_main', '{"title": "About KTC Club", "description": "Khatri Taekwondo Club (KTC) has been nurturing martial arts excellence for years. Led by Master Khatri sir (3rd Dan Black Belt), we provide comprehensive training for all age groups.", "instructor_name": "Khatri Sir", "instructor_title": "3rd Dan Black Belt", "experience_years": "10+"}', 2),
('home', 'schedule', 'schedule_info', '{"title": "Class Schedule", "subtitle": "Training sessions Monday to Friday"}', 3),
('home', 'pricing', 'pricing_info', '{"title": "Membership Plans", "subtitle": "Choose the plan that suits you best"}', 4),
('home', 'achievements', 'achievements_info', '{"title": "Our Achievements", "subtitle": "Celebrating our students success"}', 5),
('home', 'gallery', 'gallery_info', '{"title": "Gallery", "subtitle": "Moments from our training sessions and ceremonies"}', 6),
('home', 'footer', 'footer_main', '{"copyright": "© 2024 KTC Club. All rights reserved.", "tagline": "Train Hard, Fight Easy"}', 7);

-- Insert default pricing plans
INSERT INTO public.pricing_plans (plan_name, price, duration, features, is_featured, display_order) VALUES
('Admission Fee', 2500, 'one-time', ARRAY['Includes uniform', 'Belt included', 'Registration'], false, 1),
('Monthly Training', 1500, 'month', ARRAY['All classes access', 'Expert coaching', 'Certificate eligibility'], true, 2);