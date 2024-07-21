import c from 'classnames';
import { FC, PropsWithChildren } from 'react';

type CodeProps = PropsWithChildren;

const Code: FC<CodeProps> = ({ children }) => {
  return (
    <code
      className={c(
        'px-1',
        'border',
        'border-cyan-500',
        'rounded',
        'bg-cyan-100',
        'dark:bg-cyan-900',
        'text-sm',
        'font-mono'
      )}
    >
      {children}
    </code>
  );
};

export default Code;
