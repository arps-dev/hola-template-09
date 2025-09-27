import { useState } from 'react';
import { AlertTriangle, Flag, MessageSquareX, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ReportCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReport: (reason: string) => void;
  commentUser: string;
  commentText: string;
}

const ReportCommentModal = ({
  isOpen,
  onClose,
  onReport,
  commentUser,
  commentText
}: ReportCommentModalProps) => {
  const { toast } = useToast();
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const reportReasons = [
    { id: 'spam', label: 'Spam or unwanted content', icon: MessageSquareX },
    { id: 'harassment', label: 'Harassment or bullying', icon: Shield },
    { id: 'inappropriate', label: 'Inappropriate content', icon: AlertTriangle },
    { id: 'false-info', label: 'False information', icon: Flag },
    { id: 'other', label: 'Other', icon: AlertTriangle }
  ];

  const handleSubmitReport = () => {
    if (!selectedReason) {
      toast({
        title: "Please select a reason",
        description: "You must select a reason for reporting this comment.",
        variant: "destructive"
      });
      return;
    }

    const reportDetails = selectedReason === 'other' && additionalDetails 
      ? `${selectedReason}: ${additionalDetails}`
      : selectedReason;

    onReport(reportDetails);
    
    toast({
      title: "Report submitted",
      description: "Thank you for helping keep our community safe. We'll review this report.",
    });

    // Reset form
    setSelectedReason('');
    setAdditionalDetails('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-destructive">
            <Flag className="h-5 w-5" />
            <span>Report Comment</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Comment Preview */}
          <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-destructive">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold text-sm">{commentUser}</span>
            </div>
            <p className="text-sm text-muted-foreground italic">
              "{commentText.length > 100 ? commentText.substring(0, 100) + '...' : commentText}"
            </p>
          </div>

          {/* Report Reasons */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Why are you reporting this comment?
            </Label>
            <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
              {reportReasons.map((reason) => {
                const IconComponent = reason.icon;
                return (
                  <div key={reason.id} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded-lg">
                    <RadioGroupItem value={reason.id} id={reason.id} />
                    <Label 
                      htmlFor={reason.id} 
                      className="flex items-center space-x-2 cursor-pointer flex-1"
                    >
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                      <span>{reason.label}</span>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Additional Details for "Other" */}
          {selectedReason === 'other' && (
            <div>
              <Label htmlFor="details" className="text-sm font-medium mb-2 block">
                Please provide additional details
              </Label>
              <Textarea
                id="details"
                placeholder="Describe the issue with this comment..."
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitReport}
              variant="destructive"
              className="flex-1"
              disabled={!selectedReason}
            >
              Submit Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportCommentModal;