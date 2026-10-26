
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
  valueClassName?: string;
  subtitle?: string;
  status?: 'active' | 'upcoming' | 'completed';
}

const DashboardCard = ({ 
  title, 
  value, 
  icon, 
  className,
  valueClassName,
  subtitle,
  status
}: DashboardCardProps) => {
  let statusClass = '';
  let statusText = '';
  
  if (status === 'active') {
    statusClass = 'bg-green-100 text-green-800 border-green-300';
    statusText = 'Active';
  } else if (status === 'upcoming') {
    statusClass = 'bg-blue-100 text-blue-800 border-blue-300';
    statusText = 'Upcoming';
  } else if (status === 'completed') {
    statusClass = 'bg-gray-100 text-gray-800 border-gray-300';
    statusText = 'Completed';
  }
  
  return (
    <div className={cn(
      "bg-gradient-to-b from-amber-50 to-amber-100/30 rounded-xl p-6 border border-amber-200 shadow-sm relative overflow-hidden",
      className
    )}>
      {/* Traditional pattern border */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300"></div>
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-amber-800">{title}</h3>
        {icon && <div className="text-amber-600">{icon}</div>}
      </div>
      
      <div className={cn(
        "text-3xl font-bold tracking-tight text-amber-900",
        valueClassName
      )}>
        {value}
      </div>
      
      {subtitle && (
        <div className="mt-1 text-sm text-amber-700">{subtitle}</div>
      )}
      
      {status && (
        <div className={cn(
          "mt-3 inline-block px-2 py-1 text-xs font-medium rounded border",
          statusClass
        )}>
          {statusText}
        </div>
      )}
      
      {/* Traditional decorative element */}
      <div className="absolute bottom-1 right-1 w-16 h-16 opacity-10 peacock-feather"></div>
    </div>
  );
};

export default DashboardCard;
