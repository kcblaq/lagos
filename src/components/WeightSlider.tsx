import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface WeightSliderProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
  icon: React.ReactNode;
}

export const WeightSlider = ({ title, value, onChange, icon }: WeightSliderProps) => {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          {icon}
        </div>
      </div>
      
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        max={100}
        step={1}
        className="w-full"
      />
      
      <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group">
        <span>View {title} Sub-weights</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </Card>
  );
};
