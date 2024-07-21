import c from 'classnames';
import { FC, PropsWithChildren } from 'react';

type PreProps = PropsWithChildren;

const Pre: FC<PreProps> = ({ children }) => {
  return (
    <pre
      className={c(
        'p-4',
        'border',
        'border-cyan-500',
        'rounded',
        'bg-cyan-100',
        'dark:bg-cyan-900',
        'overflow-auto',
        '[&>code]:p-0',
        '[&>code]:border-none'
      )}
    >
      {children}
    </pre>
  );
};

export default Pre;
