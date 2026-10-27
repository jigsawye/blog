'use client';

import { Check, Share } from 'lucide-react';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/button';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';

export function ShareButton({
  url,
  shareLabel,
  copiedLabel,
}: {
  url: string;
  shareLabel: string;
  copiedLabel: string;
}) {
  const [isChecked, onCopy] = useCopyButton(() => {
    void navigator.clipboard.writeText(`${window.location.origin}${url}`);
  });

  return (
    <button type="button" className={cn(buttonVariants({ className: 'gap-2' }))} onClick={onCopy}>
      {isChecked ? <Check className="size-4" /> : <Share className="size-4" />}
      {isChecked ? copiedLabel : shareLabel}
    </button>
  );
}
