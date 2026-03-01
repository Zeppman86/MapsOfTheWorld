import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: 'white' | 'blue' | 'yellow';
}

export function Card({ className, children, variant = 'white', ...props }: CardProps) {
  const variants = {
    white: 'bg-white border-slate-200',
    blue: 'bg-blue-50 border-blue-200',
    yellow: 'bg-yellow-50 border-yellow-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-3xl border-2 p-6 shadow-xl',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
