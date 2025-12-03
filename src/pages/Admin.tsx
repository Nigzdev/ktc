import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { LogOut, Trash2, Plus, Clock, Image } from 'lucide-react';
import logo from '@/assets/ktc-logo.png';

interface GalleryPhoto {
  id: string;
  image_url: string;
  title: string;
  display_order: number;
}

interface ClassSchedule {
  id: string;
  class_name: string;
  days: string;
  start_time: string;
  end_time: string;
  level: string;
}

const Admin = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'photos' | 'schedule'>('photos');
  
  // New schedule form
  const [newSchedule, setNewSchedule] = useState({
    class_name: '',
    days: '',
    start_time: '',
    end_time: '',
    level: ''
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/auth');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchPhotos();
      fetchSchedules();
    }
  }, [isAdmin]);

  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .order('display_order');
    
    if (data) setPhotos(data);
    if (error) console.error('Error fetching photos:', error);
  };

  const fetchSchedules = async () => {
    const { data, error } = await supabase
      .from('class_schedule')
      .select('*')
      .order('display_order');
    
    if (data) setSchedules(data);
    if (error) console.error('Error fetching schedules:', error);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
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
          title: file.name,
          display_order: photos.length
        });

      if (insertError) throw insertError;

      toast({ title: 'Photo uploaded successfully!' });
      fetchPhotos();
    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
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

  const addSchedule = async () => {
    if (!newSchedule.class_name || !newSchedule.days || !newSchedule.start_time || !newSchedule.end_time) {
      toast({
        title: 'Please fill all required fields',
        variant: 'destructive'
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('class_schedule')
        .insert({
          ...newSchedule,
          display_order: schedules.length
        });

      if (error) throw error;

      toast({ title: 'Schedule added!' });
      setNewSchedule({ class_name: '', days: '', start_time: '', end_time: '', level: '' });
      fetchSchedules();
    } catch (error: any) {
      toast({
        title: 'Add failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const deleteSchedule = async (id: string) => {
    try {
      const { error } = await supabase
        .from('class_schedule')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({ title: 'Schedule deleted!' });
      fetchSchedules();
    } catch (error: any) {
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="KTC Logo" className="w-10 h-10" />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              View Website
            </Button>
            <Button variant="destructive" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-4 mb-6">
          <Button 
            variant={activeTab === 'photos' ? 'default' : 'outline'}
            onClick={() => setActiveTab('photos')}
          >
            <Image className="w-4 h-4 mr-2" />
            Gallery Photos
          </Button>
          <Button 
            variant={activeTab === 'schedule' ? 'default' : 'outline'}
            onClick={() => setActiveTab('schedule')}
          >
            <Clock className="w-4 h-4 mr-2" />
            Class Schedule
          </Button>
        </div>

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Photo</CardTitle>
                <CardDescription>Add images to your gallery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    disabled={uploading}
                    className="max-w-sm"
                  />
                  {uploading && <span className="text-muted-foreground">Uploading...</span>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gallery Photos ({photos.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {photos.length === 0 ? (
                  <p className="text-muted-foreground">No photos uploaded yet.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photos.map((photo) => (
                      <div key={photo.id} className="relative group">
                        <img
                          src={photo.image_url}
                          alt={photo.title || 'Gallery photo'}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => deletePhoto(photo.id, photo.image_url)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Class</CardTitle>
                <CardDescription>Create a new class schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                  <Input
                    placeholder="Class Name"
                    value={newSchedule.class_name}
                    onChange={(e) => setNewSchedule({...newSchedule, class_name: e.target.value})}
                  />
                  <Input
                    placeholder="Days (e.g., Mon-Fri)"
                    value={newSchedule.days}
                    onChange={(e) => setNewSchedule({...newSchedule, days: e.target.value})}
                  />
                  <Input
                    type="time"
                    placeholder="Start Time"
                    value={newSchedule.start_time}
                    onChange={(e) => setNewSchedule({...newSchedule, start_time: e.target.value})}
                  />
                  <Input
                    type="time"
                    placeholder="End Time"
                    value={newSchedule.end_time}
                    onChange={(e) => setNewSchedule({...newSchedule, end_time: e.target.value})}
                  />
                  <Input
                    placeholder="Level (e.g., Beginners)"
                    value={newSchedule.level}
                    onChange={(e) => setNewSchedule({...newSchedule, level: e.target.value})}
                  />
                </div>
                <Button className="mt-4" onClick={addSchedule}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Class
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Schedule ({schedules.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {schedules.length === 0 ? (
                  <p className="text-muted-foreground">No classes scheduled yet.</p>
                ) : (
                  <div className="space-y-4">
                    {schedules.map((schedule) => (
                      <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{schedule.class_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {schedule.days} • {schedule.start_time} - {schedule.end_time}
                            {schedule.level && ` • ${schedule.level}`}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => deleteSchedule(schedule.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
