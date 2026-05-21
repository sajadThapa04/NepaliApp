interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// components/ui/Card.tsx
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
}