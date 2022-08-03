import Emoji from '@/components/emoji';
import Inline from '@/components/inline';
import Link from '@/components/link';
import c from 'classnames';
import { FC } from 'react';

const UkraineAlert: FC = () => {
  return (
    <section className={c('p-4', 'border', 'border-red-500', 'rounded', 'bg-red-100', 'space-y-1')}>
      <div className={c('text-lg', 'font-semibold')}>
        <Inline>
          <Emoji code="❗" />
          <span>My Home is Under Attack</span>
        </Inline>
      </div>

      <div>
        While you&apos;re reading this page, Russia wages a genocidal war against Ukraine —
        destroying homes, ripping apart families, and taking away lives. Be on the right side of
        history, help us defend our freedom!
      </div>

      <div className={c('font-semibold')}>
        <Link href="/ukraine">Learn what you can do</Link>
      </div>
    </section>
  );
};

export default UkraineAlert;