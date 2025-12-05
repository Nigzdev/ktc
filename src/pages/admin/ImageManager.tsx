import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, RefreshCw, Upload, Image } from 'lucide-react';

interface ImageSettings {
  hero_image: string;
  instructor_image: string;
  about_background: string;
}

const ImageManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<ImageSettings>({
    hero_image: '',
    instructor_image: '',
    about_background: ''
  });
  const [previews, setPreviews] = useState<ImageSettings>({
    hero_image: '',
    instructor_image: '',
    about_background: ''
  });
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    hero_image: null,
    instructor_image: null,
    about_background: null
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('website_settings')
      .select('setting_value')
      .eq('setting_key', 'images')
      .maybeSingle();

    if (data?.setting_value) {
      const imgSettings = data.setting_value as unknown as ImageSettings;
      setImages(imgSettings);
      setPreviews(imgSettings);
    }
    if (error) console.error('Error fetching images:', error);
    setLoading(false);
  };

  const handleFileChange = (key: keyof ImageSettings, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: 'File too large', description: 'Max size is 5MB', variant: 'destructive' });
        return;
      }
      setFiles({ ...files, [key]: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews({ ...previews, [key]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveImages = async () => {
    setSaving(true);
    const newImages = { ...images };

    try {
      for (const [key, file] of Object.entries(files)) {
        if (file) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${key}-${Date.now()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('gallery')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('gallery')
            .getPublicUrl(fileName);

          newImages[key as keyof ImageSettings] = publicUrl;
        }
      }

      await supabase
        .from('website_settings')
        .upsert({
          setting_key: 'images',
          setting_value: newImages,
          updated_at: new Date().toISOString()
        }, { onConflict: 'setting_key' });

      setImages(newImages);
      setFiles({ hero_image: null, instructor_image: null, about_background: null });
      toast({ title: 'Images saved successfully!' });
    } catch (error: any) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const imageFields = [
    { key: 'hero_image' as const, label: 'Hero Banner Image', desc: 'Main banner image on the homepage' },
    { key: 'instructor_image' as const, label: 'Instructor Photo', desc: 'Photo of the instructor in About section' },
    { key: 'about_background' as const, label: 'About Section Background', desc: 'Background image for About section' },
  ];

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <RefreshCw className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Image Manager</h1>
        <p className="text-muted-foreground">Upload and replace website images</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {imageFields.map(({ key, label, desc }) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="text-lg">{label}</CardTitle>
              <CardDescription>{desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                  {previews[key] ? (
                    <img src={previews[key]} alt={label} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Image className="w-8 h-8 mx-auto mb-2" />
                      <span className="text-sm">No image set</span>
                    </div>
                  )}
                </div>
                <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors justify-center">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">{files[key] ? files[key]!.name : 'Upload Image'}</span>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(key, e)}
                    className="hidden"
                  />
                </label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={saveImages} disabled={saving} size="lg">
        {saving ? (
          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Save className="w-4 h-4 mr-2" />
        )}
        Save All Images
      </Button>
    </div>
  );
};

export default ImageManager;