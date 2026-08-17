import { Children, FC, PropsWithChildren, useEffect, useState } from 'react';

type FadeInProps = PropsWithChildren<{
  delay?: number;
  transitionDuration?: number;
  className?: string;
  visible?: boolean;
  onComplete?: () => void;
}>;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const FadeIn: FC<FadeInProps> = ({
  children,
  delay = 50,
  transitionDuration = 400,
  className,
  visible = true,
  onComplete
}) => {
  const reduced = prefersReducedMotion();
  const childCount = Children.count(children);
  const [maxIsVisible, setMaxIsVisible] = useState(reduced ? childCount : 0);

  useEffect(() => {
    if (reduced) return;

    const count = visible ? childCount : 0;

    if (count === maxIsVisible) {
      const timeout = setTimeout(() => onComplete?.(), transitionDuration);
      return () => clearTimeout(timeout);
    }

    const increment = count > maxIsVisible ? 1 : -1;
    const timeout = setTimeout(() => setMaxIsVisible((value) => value + increment), delay);
    return () => clearTimeout(timeout);
  }, [childCount, delay, maxIsVisible, visible, transitionDuration, onComplete, reduced]);

  const visibleCount = reduced ? childCount : maxIsVisible;

  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <div
          style={
            reduced
              ? undefined
              : {
                  transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
                  transform: visibleCount > i ? 'none' : 'translateY(20px)',
                  opacity: visibleCount > i ? 1 : 0
                }
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default FadeIn;
