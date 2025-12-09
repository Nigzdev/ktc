import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Upload, RefreshCw, Video } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string | null;
  description: string | null;
  video_url: string;
  video_type: string;
  thumbnail_url: string | null;
  display_order: number;
  is_active: boolean;
}

const VideoManager = () => {
  const { toast } = useToast();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('display_order');

    if (data) setVideos(data);
    if (error) console.error('Error fetching videos:', error);
    setLoading(false);
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (const file of Array.from(files)) {
      try {
        // Validate file size (max 100MB for videos)
        if (file.size > 100 * 1024 * 1024) {
          toast({
            title: 'File too large',
            description: `${file.name} exceeds 100MB limit`,
            variant: 'destructive'
          });
          continue;
        }

        // Validate file type
        if (!file.type.startsWith('video/')) {
          toast({
            title: 'Invalid file type',
            description: `${file.name} is not a video file`,
            variant: 'destructive'
          });
          continue;
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('videos')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('videos')
          .getPublicUrl(fileName);

        const { error: insertError } = await supabase
          .from('videos')
          .insert({
            video_url: publicUrl,
            title: file.name.replace(/\.[^/.]+$/, ''),
            video_type: 'uploaded',
            display_order: videos.length
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

    toast({ title: 'Videos uploaded successfully!' });
    fetchVideos();
    setUploading(false);
  };

  const deleteVideo = async (id: string, videoUrl: string) => {
    try {
      // Extract filename from URL and delete from storage
      const fileName = videoUrl.split('/').pop();
      if (fileName) {
        await supabase.storage.from('videos').remove([fileName]);
      }

      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Video deleted!' });
      fetchVideos();
    } catch (error: any) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    }
  };

  const updateVideoTitle = async (id: string, title: string) => {
    const { error } = await supabase
      .from('videos')
      .update({ title, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      toast({ title: 'Update failed', variant: 'destructive' });
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    const { error } = await supabase
      .from('videos')
      .update({ is_active: !isActive })
      .eq('id', id);

    if (error) {
      toast({ title: 'Update failed', variant: 'destructive' });
    } else {
      fetchVideos();
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
        <h1 className="text-3xl font-bold">Video Manager</h1>
        <p className="text-muted-foreground">Upload and manage videos for your website</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Videos</CardTitle>
          <CardDescription>Add video files from your device (max 100MB each)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors">
              <Upload className="w-5 h-5" />
              <span>{uploading ? 'Uploading...' : 'Choose Video Files'}</span>
              <Input
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideoUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Videos ({videos.length})
          </CardTitle>
          <CardDescription>Manage your video content</CardDescription>
        </CardHeader>
        <CardContent>
          {videos.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No videos uploaded yet.</p>
          ) : (
            <div className="space-y-4">
              {videos.map((video) => (
                <div 
                  key={video.id} 
                  className={`border rounded-lg p-4 ${!video.is_active ? 'opacity-50' : ''}`}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Video Preview */}
                    <div className="w-full md:w-64 flex-shrink-0">
                      <video
                        src={video.video_url}
                        className="w-full h-36 object-cover rounded bg-black"
                        controls
                        preload="metadata"
                      />
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1 space-y-2">
                      <Input
                        value={video.title || ''}
                        onChange={(e) => setVideos(videos.map(v => 
                          v.id === video.id ? { ...v, title: e.target.value } : v
                        ))}
                        onBlur={(e) => updateVideoTitle(video.id, e.target.value)}
                        placeholder="Video title"
                      />
                      <p className="text-xs text-muted-foreground truncate">{video.video_url}</p>
                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          variant={video.is_active ? 'secondary' : 'outline'}
                          size="sm"
                          onClick={() => toggleActive(video.id, video.is_active)}
                        >
                          {video.is_active ? 'Active' : 'Inactive'}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex md:flex-col gap-2">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteVideo(video.id, video.video_url)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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

export default VideoManager;
