import { useState, useEffect } from 'react';
import { Edit, Save, X, Calendar, MapPin, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface EditMomentModalProps {
  isOpen: boolean;
  onClose: () => void;
  moment: any;
  onSave: (updatedMoment: any) => void;
}

const categories = [
  { value: 'legendary', label: 'Legendary' },
  { value: 'achievements', label: 'Achievements' },
  { value: 'milestones', label: 'Milestones' }
];

const seasons = [
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'autumn', label: 'Autumn' },
  { value: 'winter', label: 'Winter' }
];

const EditMomentModal = ({ isOpen, onClose, moment, onSave }: EditMomentModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    location: '',
    date: '',
    category: '',
    season: '',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (moment) {
      setFormData({
        title: moment.title || '',
        subtitle: moment.subtitle || '',
        description: moment.description || '',
        location: moment.location || '',
        date: moment.date || '',
        category: moment.category || '',
        season: moment.season || '',
        tags: moment.tags ? moment.tags.join(', ') : ''
      });
    }
  }, [moment]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Title is required",
        description: "Please enter a title for your moment.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.category) {
      toast({
        title: "Category is required",
        description: "Please select a category for your moment.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const updatedMoment = {
      ...moment,
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      description: formData.description.trim(),
      location: formData.location.trim(),
      date: formData.date,
      category: formData.category,
      season: formData.season,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      year: formData.date ? new Date(formData.date).getFullYear() : moment.year,
      month: formData.date ? new Date(formData.date).toLocaleDateString('en-US', { month: 'long' }) : moment.month
    };
    
    onSave(updatedMoment);
    
    toast({
      title: "Moment updated successfully",
      description: "Your changes have been saved.",
    });
    
    setIsSubmitting(false);
    onClose();
  };

  const handleClose = () => {
    setIsSubmitting(false);
    onClose();
  };

  if (!moment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <Edit className="h-5 w-5 text-blue-500" />
            <span>Edit Moment</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">
                Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter moment title"
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle" className="text-base font-semibold">
                Subtitle
              </Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                placeholder="Enter moment subtitle"
                maxLength={150}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your moment in detail..."
                className="min-h-[100px]"
                maxLength={500}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-base font-semibold flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Where did this happen?"
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-base font-semibold flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-base font-semibold">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold">Season</Label>
                <Select value={formData.season} onValueChange={(value) => handleInputChange('season', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((season) => (
                      <SelectItem key={season.value} value={season.value}>
                        {season.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-base font-semibold flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                Tags
              </Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="Enter tags separated by commas (e.g., graduation, achievement, milestone)"
                maxLength={200}
              />
              <p className="text-sm text-gray-500">
                Separate multiple tags with commas
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMomentModal;