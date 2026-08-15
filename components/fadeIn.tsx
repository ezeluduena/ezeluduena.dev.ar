import { Children, FC, PropsWithChildren, useEffect, useState } from 'react';

type FadeInProps = PropsWithChildren<{
  delay?: number;
  transitionDuration?: number;
  className?: string;
  visible?: boolean;
  onComplete?: () => void;
}>;

const FadeIn: FC<FadeInProps> = ({
  children,
  delay = 50,
  transitionDuration = 400,
  className,
  visible = true,
  onComplete
}) => {
  const [maxIsVisible, setMaxIsVisible] = useState(0);
  const childCount = Children.count(children);

  useEffect(() => {
    const count = visible ? childCount : 0;

    if (count === maxIsVisible) {
      const timeout = setTimeout(() => onComplete?.(), transitionDuration);
      return () => clearTimeout(timeout);
    }

    const increment = count > maxIsVisible ? 1 : -1;
    const timeout = setTimeout(() => setMaxIsVisible((value) => value + increment), delay);
    return () => clearTimeout(timeout);
  }, [childCount, delay, maxIsVisible, visible, transitionDuration, onComplete]);

  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <div
          style={{
            transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
            transform: maxIsVisible > i ? 'none' : 'translateY(20px)',
            opacity: maxIsVisible > i ? 1 : 0
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default FadeIn;
