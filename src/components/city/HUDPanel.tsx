import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface HUDPanelProps {
  children: ReactNode;
  side: 'left' | 'right';
  title: string;
  isVisible: boolean;
  className?: string;
}

export const HUDPanel = ({ children, side, title, isVisible, className }: HUDPanelProps) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ 
            opacity: 0, 
            x: side === 'left' ? -100 : 100 
          }}
          animate={{ 
            opacity: 1, 
            x: 0 
          }}
          exit={{ 
            opacity: 0, 
            x: side === 'left' ? -100 : 100 
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={cn(
            'fixed top-16 bottom-24 z-30 w-80 flex flex-col',
            side === 'left' ? 'left-4' : 'right-4',
            className
          )}
        >
          <div className="glass-dark rounded-xl overflow-hidden flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-3 border-b border-border/50 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase">
                {title}
              </h2>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {children}
            </div>

            {/* Decorative scan line */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <div className="absolute inset-0 data-stream" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
