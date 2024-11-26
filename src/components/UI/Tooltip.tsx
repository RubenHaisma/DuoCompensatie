import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
}

export default function Tooltip({ content }: TooltipProps) {
  return (
    <div className="relative group">
      {/* Help Icon */}
      <HelpCircle className="w-4 h-4 text-duo-gray/60 cursor-help" />

      {/* Tooltip Content */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-duo-blue text-white text-xs md:text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-normal z-10 max-w-[100vw] text-center">
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-duo-blue"></div>
      </div>
    </div>
  );
}
