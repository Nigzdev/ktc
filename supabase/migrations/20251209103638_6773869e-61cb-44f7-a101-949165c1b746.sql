-- Create videos table for storing video content
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  description TEXT,
  video_url TEXT NOT NULL,
  video_type TEXT NOT NULL DEFAULT 'youtube',
  thumbnail_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view videos" 
ON public.videos 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can manage videos" 
ON public.videos 
FOR ALL 
USING (true)
WITH CHECK (true);