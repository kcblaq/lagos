import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { LGAData } from "@/data/lgaData";

interface RankingTableProps {
  data: LGAData[];
  weights: {
    economic: number;
    impact: number;
    infrastructure: number;
  };
}

interface RankedLGA extends LGAData {
  score: number;
  rank: number;
}

export const RankingTable = ({ data, weights }: RankingTableProps) => {
  const rankedData = useMemo(() => {
    const totalWeight = weights.economic + weights.impact + weights.infrastructure;
    
    // Calculate weighted scores
    const scored = data.map((lga) => ({
      ...lga,
      score: totalWeight > 0
        ? (lga.economic * weights.economic + 
           lga.impact * weights.impact + 
           lga.infrastructure * weights.infrastructure) / totalWeight
        : 0,
    }));
    
    // Sort by score descending
    const sorted = scored.sort((a, b) => b.score - a.score);
    
    // Add rank
    return sorted.map((lga, index) => ({
      ...lga,
      rank: index + 1,
    })) as RankedLGA[];
  }, [data, weights]);

  console.log("Data", rankedData);

  const getScoreColor = (score: number) => {
    if (score >= 70) return "bg-success";
    if (score >= 40) return "bg-warning";
    return "bg-destructive";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 70) return "bg-success/10";
    if (score >= 40) return "bg-warning/10";
    return "bg-destructive/10";
  };

  return (
    <>
    
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        Local Government Ranking
      </h2>
      
      <div className="space-y-1">
        {/* Header */}
        <div className="grid grid-cols-[60px_1fr_120px] gap-4 px-4 py-3 text-sm font-medium text-muted-foreground">
          <div>#</div>
          <div>LGAs</div>
          <div className="text-right">Ratings</div>
        </div>
        
        {/* Rows */}
        {rankedData.map((lga) => (
          <div
            key={lga.name}
            className="grid grid-cols-[60px_1fr_120px] gap-4 px-4 py-4 items-center hover:bg-muted/50 rounded-lg transition-colors"
          >
            <div className="text-sm font-medium text-muted-foreground">
              {String(lga.rank).padStart(2, "0")}
            </div>
            
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-sm font-medium text-foreground truncate">
                {lga.name}
              </span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${getScoreColor(lga.score)} transition-all duration-500 ease-out`}
                  style={{ width: `${lga.score}%` }}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <span
                className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium ${getScoreBgColor(
                  lga.score
                )}`}
              >
                {lga.score.toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>

    <Card className="p-3 sm:p-6 border-border bg-card">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">Summary</h3>
                <button className="p-2 rounded-full hover:bg-secondary transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground mb-1">Top Performer</p>
                  <p className="text-lg font-semibold text-foreground">
                    {rankedData[0]?.name}
                  </p>
                  <p className="text-sm text-success">
                    Score: {rankedData[0]?.score.toFixed(1)}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground mb-1">Total Weight</p>
                  <p className="text-lg font-semibold text-foreground">
                    {rankedData[0]?.economic + rankedData[0]?.impact + rankedData[0]?.infrastructure}
                  </p>
                  <p className="text-sm text-muted-foreground">Combined indicators</p>
                </div>
              </div>
            </Card>
    </>
  );
};
