import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAnalyticsSummary, clearStoredEvents, downloadAnalyticsCSV } from "@/lib/analytics";
import { X, Download, Trash2, TrendingUp, MousePointer, Scroll, ShoppingCart } from "lucide-react";

interface AnalyticsDashboardProps {
  onClose: () => void;
}

const AnalyticsDashboard = ({ onClose }: AnalyticsDashboardProps) => {
  const [summary, setSummary] = useState(getAnalyticsSummary());

  const refreshData = () => {
    setSummary(getAnalyticsSummary());
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all analytics data?')) {
      clearStoredEvents();
      refreshData();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Real-time conversion tracking for R-Tech Computer</p>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
            Close
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 glass-card">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">{summary.totalEvents}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Total Events</h3>
          </Card>

          <Card className="p-6 glass-card">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold text-green-500">{summary.whatsappClicks}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">WhatsApp Conversions</h3>
          </Card>

          <Card className="p-6 glass-card">
            <div className="flex items-center justify-between mb-2">
              <MousePointer className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-blue-500">{summary.navigationClicks}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Navigation Clicks</h3>
          </Card>

          <Card className="p-6 glass-card">
            <div className="flex items-center justify-between mb-2">
              <Scroll className="h-8 w-8 text-purple-500" />
              <span className="text-2xl font-bold text-purple-500">{summary.topScrollDepth}%</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Max Scroll Depth</h3>
          </Card>
        </div>

        {/* WhatsApp Clicks by Type */}
        <Card className="p-6 glass-card mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">WhatsApp Clicks by Type</h3>
          <div className="space-y-3">
            {Object.entries(summary.whatsappClicksByType).length === 0 ? (
              <p className="text-sm text-muted-foreground">No WhatsApp clicks yet</p>
            ) : (
              Object.entries(summary.whatsappClicksByType).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm text-foreground capitalize">{type}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{
                          width: `${(count / summary.whatsappClicks) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-primary w-8">{count}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* WhatsApp Clicks by Location */}
        <Card className="p-6 glass-card mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">WhatsApp Clicks by Location</h3>
          <div className="space-y-3">
            {Object.entries(summary.whatsappClicksByLocation).length === 0 ? (
              <p className="text-sm text-muted-foreground">No location data yet</p>
            ) : (
              Object.entries(summary.whatsappClicksByLocation)
                .sort(([, a], [, b]) => b - a)
                .map(([location, count]) => (
                  <div key={location} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{location}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all"
                          style={{
                            width: `${(count / summary.whatsappClicks) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-green-500 w-8">{count}</span>
                    </div>
                  </div>
                ))
            )}
          </div>
        </Card>

        {/* Most Viewed Products */}
        {summary.mostViewedProducts.length > 0 && (
          <Card className="p-6 glass-card mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Top 5 Viewed Products</h3>
            <div className="space-y-2">
              {summary.mostViewedProducts.map((product, index) => (
                <div key={product} className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-primary">#{index + 1}</span>
                  <span className="text-sm text-foreground">{product}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={downloadAnalyticsCSV} variant="default">
            <Download className="h-4 w-4 mr-2" />
            Download CSV
          </Button>
          <Button onClick={handleClear} variant="outline">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Data
          </Button>
          <Button onClick={refreshData} variant="outline">
            Refresh
          </Button>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="text-sm font-semibold text-foreground mb-2">About This Dashboard</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Data is stored locally in your browser (last 100 events)</li>
            <li>• WhatsApp clicks are PRIMARY conversion events</li>
            <li>• Use this data to optimize button placement and messaging</li>
            <li>• Scroll depth shows how engaged visitors are</li>
            <li>• Export to CSV for detailed analysis in Excel/Google Sheets</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
