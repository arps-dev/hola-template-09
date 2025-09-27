import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Camera, MapPin } from "lucide-react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: {
    name: string;
    username: string;
    bio: string;
    location: string;
    course: string;
    graduationYear: string;
  };
  onSave: (updatedProfile: any) => void;
}

const EditProfileModal = ({ isOpen, onClose, userProfile, onSave }: EditProfileModalProps) => {
  const [formData, setFormData] = useState({
    name: userProfile.name,
    username: userProfile.username,
    bio: userProfile.bio,
    location: userProfile.location,
    course: userProfile.course,
    graduationYear: userProfile.graduationYear,
  });

  const handleSave = () => {
    onSave(formData);
    toast.success("Profile updated successfully!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto retro-card border-2 border-primary/20 bg-card/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="retro-heading text-xl font-bold text-foreground text-center mb-4">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Profile Picture Section */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-sunset flex items-center justify-center">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-primary hover:bg-primary/80"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 bg-background/50 border-primary/20 focus:border-primary/40"
              />
            </div>

            <div>
              <Label htmlFor="username" className="text-sm font-medium text-foreground">
                Username
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="mt-1 bg-background/50 border-primary/20 focus:border-primary/40"
              />
            </div>

            <div>
              <Label htmlFor="bio" className="text-sm font-medium text-foreground">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="mt-1 bg-background/50 border-primary/20 focus:border-primary/40 resize-none"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-sm font-medium text-foreground">
                <MapPin className="h-4 w-4 inline mr-1" />
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 bg-background/50 border-primary/20 focus:border-primary/40"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="course" className="text-sm font-medium text-foreground">
                  Course
                </Label>
                <Input
                  id="course"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="mt-1 bg-background/50 border-primary/20 focus:border-primary/40"
                />
              </div>
              <div>
                <Label htmlFor="graduationYear" className="text-sm font-medium text-foreground">
                  Graduation
                </Label>
                <Input
                  id="graduationYear"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                  className="mt-1 bg-background/50 border-primary/20 focus:border-primary/40"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-2 border-primary/30 hover:border-primary/50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 text-white"
              style={{ background: 'var(--gradient-sunset)' }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;