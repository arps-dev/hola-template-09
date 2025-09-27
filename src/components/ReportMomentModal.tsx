import { useState } from 'react';
import { AlertTriangle, Flag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ReportMomentModalProps {
  isOpen: boolean;
  onClose: () => void;
  momentTitle: string;
}

const reportReasons = [
  {
    id: 'inappropriate-content',
    label: 'Inappropriate Content',
    description: 'Contains offensive, harmful, or inappropriate material'
  },
  {
    id: 'spam',
    label: 'Spam or Misleading',
    description: 'Repetitive, promotional, or misleading content'
  },
  {
    id: 'harassment',
    label: 'Harassment or Bullying',
    description: 'Targets someone for harassment or bullying'
  },
  {
    id: 'false-information',
    label: 'False Information',
    description: 'Contains false, misleading, or fabricated information'
  },
  {
    id: 'copyright',
    label: 'Copyright Violation',
    description: 'Uses copyrighted material without permission'
  },
  {
    id: 'privacy',
    label: 'Privacy Violation',
    description: 'Shares private information without consent'
  },
  {
    id: 'violence',
    label: 'Violence or Threats',
    description: 'Contains violent content or threats'
  },
  {
    id: 'other',
    label: 'Other',
    description: 'Other reason not listed above'
  }
];

const ReportMomentModal = ({ isOpen, onClose, momentTitle }: ReportMomentModalProps) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!selectedReason) {
      toast({
        title: "Please select a reason",
        description: "You must select a reason for reporting this moment.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Report submitted successfully",
      description: "Thank you for your report. We'll review it and take appropriate action.",
    });
    
    setIsSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    setSelectedReason('');
    setAdditionalComments('');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <Flag className="h-5 w-5 text-red-500" />
            <span>Report Moment</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800">Reporting: "{momentTitle}"</h4>
                <p className="text-sm text-red-600 mt-1">
                  Please help us understand why you're reporting this moment. Your report will be reviewed by our moderation team.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Reason for reporting *</Label>
            <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
              {reportReasons.map((reason) => (
                <div key={reason.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={reason.id} id={reason.id} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={reason.id} className="font-medium cursor-pointer">
                      {reason.label}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">{reason.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments" className="text-base font-semibold">
              Additional Comments (Optional)
            </Label>
            <Textarea
              id="comments"
              placeholder="Please provide any additional details that might help us understand your report..."
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              className="min-h-[100px]"
              maxLength={500}
            />
            <p className="text-sm text-gray-500 text-right">
              {additionalComments.length}/500 characters
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Please note:</p>
                <ul className="mt-1 space-y-1 list-disc list-inside">
                  <li>False reports may result in action against your account</li>
                  <li>Reports are reviewed by our moderation team within 24-48 hours</li>
                  <li>You'll receive a notification when action is taken</li>
                </ul>
              </div>
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
              disabled={isSubmitting || !selectedReason}
              className="bg-red-600 hover:bg-red-700"
            >
              <Flag className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportMomentModal;