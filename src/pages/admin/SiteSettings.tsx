import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, RefreshCw, Upload } from 'lucide-react';

interface Settings {
  logo: { url: string };
  social: { whatsapp: string; instagram: string; facebook: string };
}

const SiteSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    logo: { url: '' },
    social: { whatsapp: '', instagram: '', facebook: '' }
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('website_settings')
      .select('*')
      .in('setting_key', ['logo', 'social']);

    if (data) {
      const newSettings = { ...settings };
      data.forEach((item) => {
        if (item.setting_key === 'logo') {
          newSettings.logo = item.setting_value as Settings['logo'];
        } else if (item.setting_key === 'social') {
          newSettings.social = item.setting_value as Settings['social'];
        }
      });
      setSettings(newSettings);
      if (newSettings.logo.url) {
        setLogoPreview(newSettings.logo.url);
      }
    }
    if (error) console.error('Error fetching settings:', error);
    setLoading(false);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveSettings = async () => {
    setSaving(true);

    try {
      let logoUrl = settings.logo.url;

      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `logo-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(fileName, logoFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('gallery')
          .getPublicUrl(fileName);

        logoUrl = publicUrl;
      }

      // Update logo setting
      await supabase
        .from('website_settings')
        .upsert({
          setting_key: 'logo',
          setting_value: { url: logoUrl },
          updated_at: new Date().toISOString()
        }, { onConflict: 'setting_key' });

      // Update social setting
      await supabase
        .from('website_settings')
        .upsert({
          setting_key: 'social',
          setting_value: settings.social,
          updated_at: new Date().toISOString()
        }, { onConflict: 'setting_key' });

      toast({ title: 'Settings saved successfully!' });
      setLogoFile(null);
    } catch (error: any) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
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
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground">Manage your website logo and social links</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Logo Settings</CardTitle>
          <CardDescription>Upload a new logo for your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 border rounded-lg flex items-center justify-center bg-muted">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <span className="text-muted-foreground text-sm">No logo</span>
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm">{logoFile ? logoFile.name : 'Upload New Logo'}</span>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-muted-foreground">Recommended: PNG or SVG, max 500KB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>Add your social media profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>WhatsApp Number</Label>
            <Input
              placeholder="+91 93547 20445"
              value={settings.social.whatsapp}
              onChange={(e) => setSettings({
                ...settings,
                social: { ...settings.social, whatsapp: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label>Instagram URL</Label>
            <Input
              placeholder="https://instagram.com/yourprofile"
              value={settings.social.instagram}
              onChange={(e) => setSettings({
                ...settings,
                social: { ...settings.social, instagram: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label>Facebook URL</Label>
            <Input
              placeholder="https://facebook.com/yourpage"
              value={settings.social.facebook}
              onChange={(e) => setSettings({
                ...settings,
                social: { ...settings.social, facebook: e.target.value }
              })}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={saveSettings} disabled={saving} size="lg">
        {saving ? (
          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Save className="w-4 h-4 mr-2" />
        )}
        Save All Settings
      </Button>
    </div>
  );
};

export default SiteSettings;