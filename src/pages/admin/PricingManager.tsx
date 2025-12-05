import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Plus, RefreshCw, Edit2, Check, X, Star } from 'lucide-react';

interface PricingPlan {
  id: string;
  plan_name: string;
  price: number;
  duration: string;
  features: string[];
  is_featured: boolean;
  display_order: number;
}

const PricingManager = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPlan, setNewPlan] = useState({
    plan_name: '',
    price: '',
    duration: 'month',
    features: '',
    is_featured: false
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .order('display_order');

    if (data) setPlans(data);
    if (error) console.error('Error fetching plans:', error);
    setLoading(false);
  };

  const addPlan = async () => {
    if (!newPlan.plan_name || !newPlan.price) {
      toast({ title: 'Please fill required fields', variant: 'destructive' });
      return;
    }

    const features = newPlan.features.split(',').map(f => f.trim()).filter(Boolean);

    const { error } = await supabase
      .from('pricing_plans')
      .insert({
        plan_name: newPlan.plan_name,
        price: parseInt(newPlan.price),
        duration: newPlan.duration,
        features,
        is_featured: newPlan.is_featured,
        display_order: plans.length
      });

    if (error) {
      toast({ title: 'Add failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Plan added!' });
      setNewPlan({ plan_name: '', price: '', duration: 'month', features: '', is_featured: false });
      fetchPlans();
    }
  };

  const updatePlan = async (plan: PricingPlan) => {
    const { error } = await supabase
      .from('pricing_plans')
      .update({
        plan_name: plan.plan_name,
        price: plan.price,
        duration: plan.duration,
        features: plan.features,
        is_featured: plan.is_featured
      })
      .eq('id', plan.id);

    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Plan updated!' });
      setEditingId(null);
    }
  };

  const deletePlan = async (id: string) => {
    const { error } = await supabase
      .from('pricing_plans')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Plan deleted!' });
      fetchPlans();
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
        <h1 className="text-3xl font-bold">Pricing Manager</h1>
        <p className="text-muted-foreground">Manage membership plans and pricing</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Plan</CardTitle>
          <CardDescription>Create a new pricing plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label>Plan Name *</Label>
              <Input
                placeholder="e.g., Monthly Plan"
                value={newPlan.plan_name}
                onChange={(e) => setNewPlan({ ...newPlan, plan_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Price (₹) *</Label>
              <Input
                type="number"
                placeholder="e.g., 1500"
                value={newPlan.price}
                onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <Input
                placeholder="e.g., month, one-time"
                value={newPlan.duration}
                onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Features (comma-separated)</Label>
              <Input
                placeholder="Feature 1, Feature 2"
                value={newPlan.features}
                onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Checkbox
              id="featured"
              checked={newPlan.is_featured}
              onCheckedChange={(checked) => setNewPlan({ ...newPlan, is_featured: !!checked })}
            />
            <Label htmlFor="featured">Featured Plan</Label>
          </div>
          <Button className="mt-4" onClick={addPlan}>
            <Plus className="w-4 h-4 mr-2" />
            Add Plan
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Plans ({plans.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {plans.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No pricing plans yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <Card key={plan.id} className={plan.is_featured ? 'border-primary' : ''}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{plan.plan_name}</CardTitle>
                      {plan.is_featured && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <div className="text-2xl font-bold">₹{plan.price}<span className="text-sm font-normal text-muted-foreground">/{plan.duration}</span></div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 mb-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="text-sm text-muted-foreground">• {feature}</li>
                      ))}
                    </ul>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingId(plan.id)}>
                        <Edit2 className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deletePlan(plan.id)}>
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
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

export default PricingManager;