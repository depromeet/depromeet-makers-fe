import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface LongTextProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

const checkOverflow = (textContainer: HTMLDivElement | null) => {
  if (textContainer) {
    return (
      textContainer.offsetHeight < textContainer.scrollHeight || textContainer.offsetWidth < textContainer.scrollWidth
    );
  }

  return false;
};

export default function LongText({ children, className = '', contentClassName = '' }: LongTextProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [isOverflown, setIsOverflown] = useState(false);

  useEffect(() => {
    if (checkOverflow(tooltipRef.current)) {
      setIsOverflown(true);
      return;
    }

    setIsOverflown(false);
  }, []);

  if (!isOverflown)
    return (
      <div ref={tooltipRef} className={cn('truncate', className)}>
        {children}
      </div>
    );

  return (
    <>
      <div className="hidden sm:block">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div ref={tooltipRef} className={cn('truncate', className)}>
                {children}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className={contentClassName}>{children}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="sm:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <div ref={tooltipRef} className={cn('truncate', className)}>
              {children}
            </div>
          </PopoverTrigger>
          <PopoverContent className={cn('w-fit', contentClassName)}>
            <p>{children}</p>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
