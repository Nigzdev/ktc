import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, RefreshCw, Phone, MapPin, Mail } from 'lucide-react';

interface ContactInfo {
  phone: string;
  address: string;
  email: string;
}

const ContactSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contact, setContact] = useState<ContactInfo>({
    phone: '',
    address: '',
    email: ''
  });

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('website_settings')
      .select('setting_value')
      .eq('setting_key', 'contact')
      .maybeSingle();

    if (data?.setting_value) {
      setContact(data.setting_value as unknown as ContactInfo);
    }
    if (error) console.error('Error fetching contact:', error);
    setLoading(false);
  };

  const saveContact = async () => {
    setSaving(true);

    const { error } = await supabase
      .from('website_settings')
      .update({
        setting_value: JSON.parse(JSON.stringify(contact)),
        updated_at: new Date().toISOString()
      })
      .eq('setting_key', 'contact');

    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Contact information saved!' });
    }
    setSaving(false);
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
        <h1 className="text-3xl font-bold">Contact Settings</h1>
        <p className="text-muted-foreground">Manage your contact information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>This information will be displayed on your website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </Label>
            <Input
              placeholder="+91 93547 20445"
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Address
            </Label>
            <Textarea
              placeholder="Your full address..."
              value={contact.address}
              onChange={(e) => setContact({ ...contact, address: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={saveContact} disabled={saving} size="lg">
        {saving ? (
          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Save className="w-4 h-4 mr-2" />
        )}
        Save Contact Info
      </Button>
    </div>
  );
};

export default ContactSettings;