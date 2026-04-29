import c from 'classnames';
import NextLink from 'next/link';
import { FC, PropsWithChildren } from 'react';
import { isAbsoluteUrl } from '~/utils/url';

type LinkProps = PropsWithChildren<{
  variant?: 'normal' | 'discreet' | 'hidden';
  href: string;
  external?: boolean;
  className?: string;
}>;

const Link: FC<LinkProps> = ({
  variant = 'normal',
  href,
  external = isAbsoluteUrl(href),
  className,
  children
}) => {
  const linkClassName = c(
    {
      'text-blue-500': variant === 'normal',
      'dark:text-blue-300': variant === 'normal',
      'hover:underline': variant === 'normal',
      'hover:text-blue-500': variant === 'discreet',
      'dark:hover:text-blue-300': variant === 'discreet',
      'text-inherit': variant === 'hidden',
      'hover:no-underline': variant === 'hidden'
    },
    className
  );

  if (external) {
    return (
      <a className={linkClassName} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} legacyBehavior>
      <a className={linkClassName}>{children}</a>
    </NextLink>
  );
};

export default Link;
