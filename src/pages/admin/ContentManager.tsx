import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, RefreshCw } from 'lucide-react';

interface PageBlock {
  id: string;
  block_type: string;
  block_key: string;
  content: Record<string, any>;
  display_order: number;
}

const ContentManager = () => {
  const { toast } = useToast();
  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('page_blocks')
      .select('*')
      .order('display_order');

    if (data) {
      setBlocks(data.map(d => ({
        ...d,
        content: d.content as Record<string, any>
      })));
    }
    if (error) console.error('Error fetching blocks:', error);
    setLoading(false);
  };

  const updateBlock = async (id: string, content: Record<string, any>) => {
    setSaving(id);
    const { error } = await supabase
      .from('page_blocks')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Content saved successfully!' });
    }
    setSaving(null);
  };

  const updateBlockContent = (id: string, key: string, value: string) => {
    setBlocks(blocks.map(block => {
      if (block.id === id) {
        return { ...block, content: { ...block.content, [key]: value } };
      }
      return block;
    }));
  };

  const renderBlockEditor = (block: PageBlock) => {
    const content = block.content;
    
    return (
      <Card key={block.id} className="mb-4">
        <CardHeader>
          <CardTitle className="capitalize">{block.block_type} Section</CardTitle>
          <CardDescription>Edit the {block.block_key.replace('_', ' ')} content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(content).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label className="capitalize">{key.replace(/_/g, ' ')}</Label>
              {typeof value === 'string' && value.length > 100 ? (
                <Textarea
                  value={value as string}
                  onChange={(e) => updateBlockContent(block.id, key, e.target.value)}
                  rows={4}
                />
              ) : (
                <Input
                  value={value as string}
                  onChange={(e) => updateBlockContent(block.id, key, e.target.value)}
                />
              )}
            </div>
          ))}
          <Button 
            onClick={() => updateBlock(block.id, block.content)}
            disabled={saving === block.id}
          >
            {saving === block.id ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </CardContent>
      </Card>
    );
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
        <h1 className="text-3xl font-bold">Content Manager</h1>
        <p className="text-muted-foreground">Edit all text content on your website</p>
      </div>

      <div className="space-y-4">
        {blocks.map(renderBlockEditor)}
      </div>
    </div>
  );
};

export default ContentManager;