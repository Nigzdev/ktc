import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Images, Calendar, DollarSign, Trophy, FileText, Settings } from 'lucide-react';

interface Stats {
  galleryCount: number;
  scheduleCount: number;
  pricingCount: number;
  achievementsCount: number;
  blocksCount: number;
}

const DashboardOverview = () => {
  const [stats, setStats] = useState<Stats>({
    galleryCount: 0,
    scheduleCount: 0,
    pricingCount: 0,
    achievementsCount: 0,
    blocksCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [gallery, schedule, pricing, achievements, blocks] = await Promise.all([
        supabase.from('gallery_photos').select('id', { count: 'exact', head: true }),
        supabase.from('class_schedule').select('id', { count: 'exact', head: true }),
        supabase.from('pricing_plans').select('id', { count: 'exact', head: true }),
        supabase.from('achievements').select('id', { count: 'exact', head: true }),
        supabase.from('page_blocks').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        galleryCount: gallery.count || 0,
        scheduleCount: schedule.count || 0,
        pricingCount: pricing.count || 0,
        achievementsCount: achievements.count || 0,
        blocksCount: blocks.count || 0,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Gallery Photos', value: stats.galleryCount, icon: Images, color: 'text-blue-500' },
    { title: 'Class Schedules', value: stats.scheduleCount, icon: Calendar, color: 'text-green-500' },
    { title: 'Pricing Plans', value: stats.pricingCount, icon: DollarSign, color: 'text-yellow-500' },
    { title: 'Achievements', value: stats.achievementsCount, icon: Trophy, color: 'text-purple-500' },
    { title: 'Content Blocks', value: stats.blocksCount, icon: FileText, color: 'text-red-500' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you can perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/admin/gallery" className="p-4 border rounded-lg hover:bg-muted transition-colors text-center">
              <Images className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <span className="text-sm">Add Photo</span>
            </a>
            <a href="/admin/schedule" className="p-4 border rounded-lg hover:bg-muted transition-colors text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <span className="text-sm">Edit Schedule</span>
            </a>
            <a href="/admin/content" className="p-4 border rounded-lg hover:bg-muted transition-colors text-center">
              <FileText className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <span className="text-sm">Edit Content</span>
            </a>
            <a href="/admin/settings" className="p-4 border rounded-lg hover:bg-muted transition-colors text-center">
              <Settings className="w-8 h-8 mx-auto mb-2 text-gray-500" />
              <span className="text-sm">Site Settings</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;