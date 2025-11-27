import { useState, useMemo } from "react";
import { IndicatorCard } from "@/components/IndicatorCard";
import { WeightSlider } from "@/components/WeightSlider";
import { RankingTable } from "@/components/RankingTable";
import { lgaData } from "@/data/lgaData";
import { DollarSign, Target, Building2 } from "lucide-react";

const Index = () => {
  const [weights, setWeights] = useState({
    economic: 40,
    impact: 0,
    infrastructure: 65,
  });

  // Calculate average indicator percentages
  const indicatorAverages = useMemo(() => {
    const total = lgaData.length;
    const sums = lgaData.reduce(
      (acc, lga) => ({
        economic: acc.economic + lga.economic,
        impact: acc.impact + lga.impact,
        infrastructure: acc.infrastructure + lga.infrastructure,
      }),
      { economic: 0, impact: 0, infrastructure: 0 }
    );

    return {
      economic: Math.round(sums.economic / total),
      impact: Math.round(sums.impact / total),
      infrastructure: Math.round(sums.infrastructure / total),
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Lagos State LGA Dashboard
          </h1>
          <p className="text-muted-foreground">
            Interactive weighted scoring system for Local Government Areas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Indicator Weight
              </h2>
              
              <div className="space-y-6">
                <WeightSlider
                  title="Economic Indicator"
                  value={weights.economic}
                  onChange={(value) => setWeights({ ...weights, economic: value })}
                  icon={<DollarSign className="w-5 h-5" />}
                />

                <WeightSlider
                  title="Impact Indicator"
                  value={weights.impact}
                  onChange={(value) => setWeights({ ...weights, impact: value })}
                  icon={<Target className="w-5 h-5" />}
                />

                <WeightSlider
                  title="Infrastructure Indicator"
                  value={weights.infrastructure}
                  onChange={(value) => setWeights({ ...weights, infrastructure: value })}
                  icon={<Building2 className="w-5 h-5" />}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Indicator Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <IndicatorCard
                title="Economic and Financial Indicator (E&F)"
                value={weights.economic}
                icon={<DollarSign className="w-6 h-6" />}
                trend={8.8}
              />
              <IndicatorCard
                title="Impact Indicator"
                value={weights.impact}
                icon={<Target className="w-6 h-6" />}
                trend={-6.7}
              />
              <IndicatorCard
                title="Infrastructure and Cost Indicator"
                value={weights.infrastructure}
                icon={<Building2 className="w-6 h-6" />}
                trend={10.8}
              />
            </div>

            {/* Ranking Table */}
            <RankingTable data={lgaData} weights={weights} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
