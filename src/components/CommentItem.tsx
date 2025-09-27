import { useState } from 'react';
import { MoreHorizontal, Flag, AlertTriangle, Ban, Trash2, Heart, MessageCircle, Send } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ReportCommentModal from './ReportCommentModal';

interface CommentItemProps {
  comment: {
    id: number;
    user: string;
    comment: string;
    time: string;
    avatar: string;
    likes?: number;
    replies?: any[];
  };
  onDelete?: (commentId: number) => void;
  onReport?: (commentId: number, reason: string) => void;
  onLike?: (commentId: number) => void;
  onReply?: (commentId: number, replyText: string) => void;
  likedComments?: Set<number>;
  depth?: number;
}

const CommentItem = ({ 
  comment, 
  onDelete, 
  onReport, 
  onLike, 
  onReply, 
  likedComments = new Set(), 
  depth = 0 
}: CommentItemProps) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReport = (reason: string) => {
    onReport?.(comment.id, reason);
    setIsReportModalOpen(false);
  };

  const handleLike = () => {
    onLike?.(comment.id);
  };

  const handleReply = () => {
    if (replyText.trim()) {
      onReply?.(comment.id, replyText);
      setReplyText('');
      setIsReplying(false);
    }
  };

  const isLiked = likedComments.has(comment.id);
  const likes = comment.likes || 0;
  const displayLikes = likes + (isLiked ? 1 : 0);

  return (
    <>
      <div className={`flex space-x-3 p-3 bg-muted/30 rounded-lg group hover:bg-muted/40 transition-colors ${depth > 0 ? 'ml-8 border-l-2 border-muted' : ''}`}>
        <div className="text-2xl">{comment.avatar}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sm text-foreground">{comment.user}</span>
              <span className="text-xs text-muted-foreground">{comment.time}</span>
            </div>
            
            {/* Three-dot menu */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-muted z-50"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-48 bg-popover border shadow-md z-[100]"
                >
                  <DropdownMenuItem 
                    onClick={() => setIsReportModalOpen(true)}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <Flag className="h-4 w-4" />
                    <span>Report comment</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    onClick={() => onDelete?.(comment.id)}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete comment</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer hover:bg-muted focus:bg-muted">
                    <Ban className="h-4 w-4" />
                    <span>Block user</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <p className="text-sm text-foreground/80 mb-3">{comment.comment}</p>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`h-6 px-2 text-xs transition-colors ${
                isLiked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-muted-foreground hover:text-red-500'
              }`}
            >
              <Heart className={`h-3 w-3 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              {displayLikes > 0 && <span>{displayLikes}</span>}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsReplying(!isReplying)}
              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Reply
            </Button>
            
            {comment.replies && comment.replies.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              </span>
            )}
          </div>
          
          {/* Reply input */}
          {isReplying && (
            <div className="mt-3 flex space-x-2">
              <input
                type="text"
                placeholder={`Reply to ${comment.user}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleReply()}
                className="flex-1 px-3 py-1 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button 
                onClick={handleReply}
                size="sm"
                className="h-7 px-2 text-xs bg-gradient-sunset text-white hover:scale-105 transition-all duration-300"
                disabled={!replyText.trim()}
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Render replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-2">
          {comment.replies.map((reply: any) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onDelete={onDelete}
              onReport={onReport}
              onLike={onLike}
              onReply={onReply}
              likedComments={likedComments}
              depth={depth + 1}
            />
          ))}
        </div>
      )}

      <ReportCommentModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onReport={handleReport}
        commentUser={comment.user}
        commentText={comment.comment}
      />
    </>
  );
};

export default CommentItem;