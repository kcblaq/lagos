import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface IndicatorCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
}

export const IndicatorCard = ({ title, value, icon, trend }: IndicatorCardProps) => {
  const isPositive = trend && trend > 0;
  
  return (
    <Card className="p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground mb-1 truncate">{title}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">{value}%</span>
          {trend !== undefined && (
            <span className={`text-sm font-medium flex items-center gap-1 ${
              isPositive ? 'text-success' : 'text-destructive'
            }`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {isPositive ? '+' : ''}{trend.toFixed(0)}%
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
