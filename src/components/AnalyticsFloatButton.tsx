import { useState, useEffect } from "react";
import { BarChart3 } from "lucide-react";

interface AnalyticsFloatButtonProps {
  onClick: () => void;
}

const AnalyticsFloatButton = ({ onClick }: AnalyticsFloatButtonProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-hide after 5 seconds of inactivity, show on mouse movement
  useEffect(() => {
    let hideTimer: NodeJS.Timeout;

    const resetTimer = () => {
      setIsVisible(true);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        if (!isHovered) {
          setIsVisible(false);
        }
      }, 5000);
    };

    const handleMouseMove = () => {
      resetTimer();
    };

    // Initial timer
    resetTimer();

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(hideTimer);
    };
  }, [isHovered]);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-24 left-6 z-40 transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0'
      }`}
      aria-label="Open Analytics Dashboard"
      title="Open Analytics Dashboard"
    >
      <div className="group relative">
        {/* Main Button */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <BarChart3 className="h-5 w-5" />
          <span className="font-medium text-sm">Analytics</span>
        </div>

        {/* Tooltip on hover */}
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-background border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          <p className="text-xs text-foreground font-medium mb-1">Open Analytics Dashboard</p>
          <div className="text-xs text-muted-foreground space-y-0.5">
            <p>• Track conversions in real-time</p>
            <p>• See which CTAs perform best</p>
            <p>• Export data as CSV</p>
          </div>
          <p className="text-xs text-primary mt-2 font-medium">
            Or use: <code className="bg-secondary px-1 py-0.5 rounded">window.rtechAnalytics.openDashboard()</code>
          </p>
        </div>

        {/* Pulsing indicator for new events */}
        <div className="absolute -top-1 -right-1 w-3 h-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
      </div>

      {/* Hint text (appears briefly on first load) */}
      {isVisible && (
        <div className="absolute -top-12 left-0 right-0 text-center animate-fade-in">
          <p className="text-xs text-muted-foreground bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full border border-border whitespace-nowrap">
            📊 Dev Tools
          </p>
        </div>
      )}
    </button>
  );
};

export default AnalyticsFloatButton;
