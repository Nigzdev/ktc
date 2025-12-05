import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Plus, RefreshCw, Upload, Trophy } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  achievement_date: string | null;
  display_order: number;
}

const AchievementsManager = () => {
  const { toast } = useToast();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    description: '',
    achievement_date: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('display_order');

    if (data) setAchievements(data);
    if (error) console.error('Error fetching achievements:', error);
    setLoading(false);
  };

  const addAchievement = async () => {
    if (!newAchievement.title) {
      toast({ title: 'Please enter a title', variant: 'destructive' });
      return;
    }

    setUploading(true);
    let imageUrl = null;

    try {
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `achievement-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(fileName, selectedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('gallery')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const { error } = await supabase
        .from('achievements')
        .insert({
          title: newAchievement.title,
          description: newAchievement.description || null,
          image_url: imageUrl,
          achievement_date: newAchievement.achievement_date || null,
          display_order: achievements.length
        });

      if (error) throw error;

      toast({ title: 'Achievement added!' });
      setNewAchievement({ title: '', description: '', achievement_date: '' });
      setSelectedFile(null);
      fetchAchievements();
    } catch (error: any) {
      toast({ title: 'Add failed', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const deleteAchievement = async (id: string, imageUrl: string | null) => {
    try {
      if (imageUrl) {
        const fileName = imageUrl.split('/').pop();
        if (fileName) {
          await supabase.storage.from('gallery').remove([fileName]);
        }
      }

      const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({ title: 'Achievement deleted!' });
      fetchAchievements();
    } catch (error: any) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
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
        <h1 className="text-3xl font-bold">Achievements Manager</h1>
        <p className="text-muted-foreground">Add and manage student achievements</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Achievement</CardTitle>
          <CardDescription>Record a new achievement or milestone</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                placeholder="e.g., State Championship Winner"
                value={newAchievement.title}
                onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={newAchievement.achievement_date}
                onChange={(e) => setNewAchievement({ ...newAchievement, achievement_date: e.target.value })}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe the achievement..."
                value={newAchievement.description}
                onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Image (optional)</Label>
              <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm">{selectedFile ? selectedFile.name : 'Choose Image'}</span>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <Button className="mt-4" onClick={addAchievement} disabled={uploading}>
            {uploading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            Add Achievement
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements ({achievements.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {achievements.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No achievements added yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id}>
                  {achievement.image_url && (
                    <img
                      src={achievement.image_url}
                      alt={achievement.title}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                  )}
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        {achievement.achievement_date && (
                          <p className="text-xs text-muted-foreground">{achievement.achievement_date}</p>
                        )}
                        {achievement.description && (
                          <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="mt-3 w-full"
                      onClick={() => deleteAchievement(achievement.id, achievement.image_url)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementsManager;