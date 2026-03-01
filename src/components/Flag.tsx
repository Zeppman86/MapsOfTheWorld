import { cn } from '@/lib/utils';

interface FlagProps {
  code: string;
  customUrl?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  alt?: string;
}

export function Flag({ code, customUrl, className, size = 'md', alt }: FlagProps) {
  const sizes = {
    sm: 'w-8 h-6',
    md: 'w-16 h-12',
    lg: 'w-32 h-24',
    xl: 'w-64 h-48',
  };

  const src = customUrl || `https://flagcdn.com/${code.toLowerCase()}.svg`;

  return (
    <div className={cn('relative overflow-hidden rounded-md shadow-sm bg-slate-50 border border-slate-200 flex items-center justify-center', sizes[size], className)}>
      <img
        src={src}
        alt={alt || `Flag of ${code}`}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
  );
}
