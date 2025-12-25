import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale" | "fade";
  delay?: number;
}

const AnimatedSection = ({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-700 ease-out";
    
    const animations = {
      "fade-up": {
        hidden: "opacity-0 translate-y-12",
        visible: "opacity-100 translate-y-0",
      },
      "fade-left": {
        hidden: "opacity-0 -translate-x-12",
        visible: "opacity-100 translate-x-0",
      },
      "fade-right": {
        hidden: "opacity-0 translate-x-12",
        visible: "opacity-100 translate-x-0",
      },
      scale: {
        hidden: "opacity-0 scale-95",
        visible: "opacity-100 scale-100",
      },
      fade: {
        hidden: "opacity-0",
        visible: "opacity-100",
      },
    };

    const { hidden, visible } = animations[animation];
    return `${baseClasses} ${isVisible ? visible : hidden}`;
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
