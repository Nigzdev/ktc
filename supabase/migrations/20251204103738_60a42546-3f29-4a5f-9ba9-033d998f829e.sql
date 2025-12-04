-- Drop existing admin-only policies
DROP POLICY IF EXISTS "Admins can manage gallery photos" ON public.gallery_photos;
DROP POLICY IF EXISTS "Admins can manage schedules" ON public.class_schedule;
DROP POLICY IF EXISTS "Admins can upload gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete gallery images" ON storage.objects;

-- Allow anyone to view all gallery photos (not just active)
DROP POLICY IF EXISTS "Anyone can view active gallery photos" ON public.gallery_photos;
CREATE POLICY "Anyone can view gallery photos"
ON public.gallery_photos
FOR SELECT
USING (true);

-- Allow anyone to manage gallery photos (protected by hardcoded password in app)
CREATE POLICY "Anyone can manage gallery photos"
ON public.gallery_photos
FOR ALL
USING (true)
WITH CHECK (true);

-- Allow anyone to view all schedules
DROP POLICY IF EXISTS "Anyone can view active schedules" ON public.class_schedule;
CREATE POLICY "Anyone can view schedules"
ON public.class_schedule
FOR SELECT
USING (true);

-- Allow anyone to manage schedules
CREATE POLICY "Anyone can manage schedules"
ON public.class_schedule
FOR ALL
USING (true)
WITH CHECK (true);

-- Allow anyone to upload gallery images
CREATE POLICY "Anyone can upload gallery images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'gallery');

-- Allow anyone to delete gallery images
CREATE POLICY "Anyone can delete gallery images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'gallery');