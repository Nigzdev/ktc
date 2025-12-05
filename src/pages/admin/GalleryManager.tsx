import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Upload, RefreshCw, GripVertical } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  image_url: string;
  title: string | null;
  display_order: number;
}

const GalleryManager = () => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .order('display_order');

    if (data) setPhotos(data);
    if (error) console.error('Error fetching photos:', error);
    setLoading(false);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    for (const file of Array.from(files)) {
      try {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: 'File too large',
            description: `${file.name} exceeds 5MB limit`,
            variant: 'destructive'
          });
          continue;
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('gallery')
          .getPublicUrl(fileName);

        const { error: insertError } = await supabase
          .from('gallery_photos')
          .insert({
            image_url: publicUrl,
            title: file.name.replace(/\.[^/.]+$/, ''),
            display_order: photos.length
          });

        if (insertError) throw insertError;
      } catch (error: any) {
        toast({
          title: 'Upload failed',
          description: error.message,
          variant: 'destructive'
        });
      }
    }

    toast({ title: 'Photos uploaded successfully!' });
    fetchPhotos();
    setUploading(false);
  };

  const deletePhoto = async (id: string, imageUrl: string) => {
    try {
      const fileName = imageUrl.split('/').pop();

      if (fileName) {
        await supabase.storage.from('gallery').remove([fileName]);
      }

      const { error } = await supabase
        .from('gallery_photos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({ title: 'Photo deleted!' });
      fetchPhotos();
    } catch (error: any) {
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const updatePhotoTitle = async (id: string, title: string) => {
    const { error } = await supabase
      .from('gallery_photos')
      .update({ title })
      .eq('id', id);

    if (error) {
      toast({ title: 'Update failed', variant: 'destructive' });
    }
  };

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
        <h1 className="text-3xl font-bold">Gallery Manager</h1>
        <p className="text-muted-foreground">Upload and manage gallery photos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Photos</CardTitle>
          <CardDescription>Add new images to your gallery (max 5MB each)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors">
              <Upload className="w-5 h-5" />
              <span>{uploading ? 'Uploading...' : 'Choose Files'}</span>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Photos ({photos.length})</CardTitle>
          <CardDescription>Click on a photo to edit its title</CardDescription>
        </CardHeader>
        <CardContent>
          {photos.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No photos uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="group relative border rounded-lg overflow-hidden">
                  <img
                    src={photo.image_url}
                    alt={photo.title || 'Gallery photo'}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deletePhoto(photo.id, photo.image_url)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="p-2">
                    <Input
                      value={photo.title || ''}
                      onChange={(e) => {
                        setPhotos(photos.map(p => 
                          p.id === photo.id ? { ...p, title: e.target.value } : p
                        ));
                      }}
                      onBlur={(e) => updatePhotoTitle(photo.id, e.target.value)}
                      placeholder="Photo title"
                      className="text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GalleryManager;