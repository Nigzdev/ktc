import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Plus, RefreshCw, Edit2, Check, X } from 'lucide-react';

interface ClassSchedule {
  id: string;
  class_name: string;
  days: string;
  start_time: string;
  end_time: string;
  level: string | null;
  display_order: number;
}

const ScheduleManager = () => {
  const { toast } = useToast();
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newSchedule, setNewSchedule] = useState({
    class_name: '',
    days: '',
    start_time: '',
    end_time: '',
    level: ''
  });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('class_schedule')
      .select('*')
      .order('display_order');

    if (data) setSchedules(data);
    if (error) console.error('Error fetching schedules:', error);
    setLoading(false);
  };

  const addSchedule = async () => {
    if (!newSchedule.class_name || !newSchedule.days || !newSchedule.start_time || !newSchedule.end_time) {
      toast({ title: 'Please fill all required fields', variant: 'destructive' });
      return;
    }

    const { error } = await supabase
      .from('class_schedule')
      .insert({
        ...newSchedule,
        display_order: schedules.length
      });

    if (error) {
      toast({ title: 'Add failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Schedule added!' });
      setNewSchedule({ class_name: '', days: '', start_time: '', end_time: '', level: '' });
      fetchSchedules();
    }
  };

  const updateSchedule = async (schedule: ClassSchedule) => {
    const { error } = await supabase
      .from('class_schedule')
      .update({
        class_name: schedule.class_name,
        days: schedule.days,
        start_time: schedule.start_time,
        end_time: schedule.end_time,
        level: schedule.level
      })
      .eq('id', schedule.id);

    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Schedule updated!' });
      setEditingId(null);
    }
  };

  const deleteSchedule = async (id: string) => {
    const { error } = await supabase
      .from('class_schedule')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Schedule deleted!' });
      fetchSchedules();
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
        <h1 className="text-3xl font-bold">Schedule Manager</h1>
        <p className="text-muted-foreground">Manage class schedules and timings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Class</CardTitle>
          <CardDescription>Create a new class schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <Label>Class Name *</Label>
              <Input
                placeholder="e.g., Beginners Class"
                value={newSchedule.class_name}
                onChange={(e) => setNewSchedule({ ...newSchedule, class_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Days *</Label>
              <Input
                placeholder="e.g., Mon-Fri"
                value={newSchedule.days}
                onChange={(e) => setNewSchedule({ ...newSchedule, days: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Start Time *</Label>
              <Input
                type="time"
                value={newSchedule.start_time}
                onChange={(e) => setNewSchedule({ ...newSchedule, start_time: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>End Time *</Label>
              <Input
                type="time"
                value={newSchedule.end_time}
                onChange={(e) => setNewSchedule({ ...newSchedule, end_time: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Level</Label>
              <Input
                placeholder="e.g., Beginners"
                value={newSchedule.level}
                onChange={(e) => setNewSchedule({ ...newSchedule, level: e.target.value })}
              />
            </div>
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
          <CardDescription>Click edit to modify a schedule</CardDescription>
        </CardHeader>
        <CardContent>
          {schedules.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No classes scheduled yet.</p>
          ) : (
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  {editingId === schedule.id ? (
                    <>
                      <div className="flex-1 grid gap-2 md:grid-cols-5">
                        <Input
                          value={schedule.class_name}
                          onChange={(e) => setSchedules(schedules.map(s =>
                            s.id === schedule.id ? { ...s, class_name: e.target.value } : s
                          ))}
                        />
                        <Input
                          value={schedule.days}
                          onChange={(e) => setSchedules(schedules.map(s =>
                            s.id === schedule.id ? { ...s, days: e.target.value } : s
                          ))}
                        />
                        <Input
                          type="time"
                          value={schedule.start_time}
                          onChange={(e) => setSchedules(schedules.map(s =>
                            s.id === schedule.id ? { ...s, start_time: e.target.value } : s
                          ))}
                        />
                        <Input
                          type="time"
                          value={schedule.end_time}
                          onChange={(e) => setSchedules(schedules.map(s =>
                            s.id === schedule.id ? { ...s, end_time: e.target.value } : s
                          ))}
                        />
                        <Input
                          value={schedule.level || ''}
                          onChange={(e) => setSchedules(schedules.map(s =>
                            s.id === schedule.id ? { ...s, level: e.target.value } : s
                          ))}
                        />
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => updateSchedule(schedule)}>
                        <Check className="w-4 h-4 text-green-500" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => { setEditingId(null); fetchSchedules(); }}>
                        <X className="w-4 h-4 text-red-500" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                        <h3 className="font-semibold">{schedule.class_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {schedule.days} • {schedule.start_time} - {schedule.end_time}
                          {schedule.level && ` • ${schedule.level}`}
                        </p>
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => setEditingId(schedule.id)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => deleteSchedule(schedule.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleManager;