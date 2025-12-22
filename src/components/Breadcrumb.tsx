import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Breadcrumb item configuration
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Breadcrumb component props
 */
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb navigation component
 * 
 * Provides hierarchical navigation showing the current page's location
 * within the site structure. Improves UX and SEO.
 * 
 * @example
 * ```tsx
 * <Breadcrumb 
 *   items={[
 *     { label: 'Products', href: '/#products' },
 *     { label: 'Asus TUF Gaming A15' }
 *   ]} 
 * />
 * ```
 */
export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav 
      className={`flex items-center space-x-2 text-sm text-muted-foreground ${className}`}
      aria-label="Breadcrumb"
    >
      {/* Home Icon - Always links to homepage */}
      <Link 
        to="/" 
        className="hover:text-foreground transition-colors"
        aria-label="Home"
      >
        <Home className="h-4 w-4" />
      </Link>

      {/* Breadcrumb Items */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4" />
            {item.href && !isLast ? (
              <Link 
                to={item.href} 
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className={isLast ? "text-foreground font-medium" : ""}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
