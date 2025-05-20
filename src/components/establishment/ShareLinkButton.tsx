
import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from 'sonner';

interface ShareLinkButtonProps {
  establishmentId: string;
}

const ShareLinkButton: React.FC<ShareLinkButtonProps> = ({ establishmentId }) => {
  const [copied, setCopied] = useState(false);
  
  // Generate the shareable link
  const shareableLink = `${window.location.origin}/establishment/${establishmentId}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink).then(() => {
      setCopied(true);
      toast.success('Enlace copiado al portapapeles');
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 bg-white/80 hover:bg-white"
        >
          <Share2 className="h-4 w-4" />
          <span>Compartir</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Compartir este establecimiento</h4>
          <div className="flex items-center space-x-2">
            <input
              className="flex-1 p-2 text-sm border rounded bg-gray-50"
              value={shareableLink}
              readOnly
            />
            <Button
              size="sm"
              variant="outline"
              className={copied ? "bg-green-50 text-green-600" : ""}
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareLinkButton;
