import c from 'classnames';
import { FC, PropsWithChildren } from 'react';

type QuoteProps = PropsWithChildren;

const Quote: FC<QuoteProps> = ({ children }) => {
  return (
    <blockquote
      className={c(
        'px-4',
        'py-1',
        'border-l-4',
        'border-cyan-500',
        'rounded',
        'bg-cyan-100',
        'dark:bg-cyan-900'
      )}
    >
      {children}
    </blockquote>
  );
};

export default Quote;
