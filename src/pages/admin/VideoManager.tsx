import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Plus, RefreshCw, Video, Youtube } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [adding, setAdding] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    video_url: '',
    video_type: 'youtube'
  });

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

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getYoutubeThumbnail = (url: string) => {
    const videoId = extractYoutubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
  };

  const addVideo = async () => {
    if (!newVideo.video_url.trim()) {
      toast({ title: 'Please enter a video URL', variant: 'destructive' });
      return;
    }

    setAdding(true);
    try {
      const thumbnail = newVideo.video_type === 'youtube' 
        ? getYoutubeThumbnail(newVideo.video_url) 
        : null;

      const { error } = await supabase
        .from('videos')
        .insert({
          title: newVideo.title || null,
          description: newVideo.description || null,
          video_url: newVideo.video_url,
          video_type: newVideo.video_type,
          thumbnail_url: thumbnail,
          display_order: videos.length
        });

      if (error) throw error;

      toast({ title: 'Video added successfully!' });
      setNewVideo({ title: '', description: '', video_url: '', video_type: 'youtube' });
      fetchVideos();
    } catch (error: any) {
      toast({ title: 'Failed to add video', description: error.message, variant: 'destructive' });
    }
    setAdding(false);
  };

  const deleteVideo = async (id: string) => {
    try {
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

  const updateVideo = async (id: string, field: string, value: string) => {
    const { error } = await supabase
      .from('videos')
      .update({ [field]: value, updated_at: new Date().toISOString() })
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
        <p className="text-muted-foreground">Add and manage videos for your website</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Video
          </CardTitle>
          <CardDescription>Add YouTube or other video URLs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Video Title"
              value={newVideo.title}
              onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
            />
            <Select
              value={newVideo.video_type}
              onValueChange={(value) => setNewVideo({ ...newVideo, video_type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Video Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="vimeo">Vimeo</SelectItem>
                <SelectItem value="direct">Direct URL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            placeholder="Video URL (e.g., https://www.youtube.com/watch?v=...)"
            value={newVideo.video_url}
            onChange={(e) => setNewVideo({ ...newVideo, video_url: e.target.value })}
          />
          <Textarea
            placeholder="Video Description (optional)"
            value={newVideo.description}
            onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
          />
          <Button onClick={addVideo} disabled={adding}>
            {adding ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            Add Video
          </Button>
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
            <p className="text-muted-foreground text-center py-8">No videos added yet.</p>
          ) : (
            <div className="space-y-4">
              {videos.map((video) => (
                <div 
                  key={video.id} 
                  className={`border rounded-lg p-4 ${!video.is_active ? 'opacity-50' : ''}`}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Thumbnail */}
                    <div className="w-full md:w-48 flex-shrink-0">
                      {video.thumbnail_url ? (
                        <img
                          src={video.thumbnail_url}
                          alt={video.title || 'Video thumbnail'}
                          className="w-full h-28 object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-28 bg-muted rounded flex items-center justify-center">
                          <Youtube className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1 space-y-2">
                      <Input
                        value={video.title || ''}
                        onChange={(e) => setVideos(videos.map(v => 
                          v.id === video.id ? { ...v, title: e.target.value } : v
                        ))}
                        onBlur={(e) => updateVideo(video.id, 'title', e.target.value)}
                        placeholder="Video title"
                      />
                      <Input
                        value={video.video_url}
                        onChange={(e) => setVideos(videos.map(v => 
                          v.id === video.id ? { ...v, video_url: e.target.value } : v
                        ))}
                        onBlur={(e) => updateVideo(video.id, 'video_url', e.target.value)}
                        placeholder="Video URL"
                        className="text-sm"
                      />
                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          variant={video.is_active ? 'secondary' : 'outline'}
                          size="sm"
                          onClick={() => toggleActive(video.id, video.is_active)}
                        >
                          {video.is_active ? 'Active' : 'Inactive'}
                        </Button>
                        <span className="text-xs text-muted-foreground capitalize">{video.video_type}</span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex md:flex-col gap-2">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteVideo(video.id)}
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
