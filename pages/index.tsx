import c from 'classnames';
import { NextPage } from 'next';
import { FiGithub, FiMail } from 'react-icons/fi';
import Heading from '~/components/heading';
import Image from '~/components/image';
import Link from '~/components/link';
import Paragraph from '~/components/paragraph';

const HomePage: NextPage = () => {
  const age = new Date(Date.now() - Date.parse('1995-04-28')).getUTCFullYear() - 1970;

  const githubStarUrl = 'https://stars.github.com/profiles/tyrrrz';
  const microsoftMvpUrl = 'https://credly.com/badges/04f634b6-189f-4bed-8acb-974541039ef9';

  return (
    <>
      <section
        className={c(
          'flex',
          'flex-col',
          'md:flex-row-reverse',
          'items-center',
          'md:items-start',
          'gap-6'
        )}
      >
        <div className={c('flex-none', 'w-48', 'md:w-56', 'md:mt-12')}>
          <Image src="/logo-trans.png" alt="picture" priority />
        </div>

        <div>
          <div className={c('text-center', 'md:text-left')}>
            <Heading>👋 Hello!</Heading>
          </div>
          <Paragraph>
            textou
          </Paragraph>
        </div>
      </section>

      <div className={c('my-8', 'h-1', 'rounded', 'bg-purple-500')} />

      <section className={c('flex', 'justify-center', 'gap-3', 'text-2xl', 'font-light')}>
        <Link variant="discreet" href="https://github.com/ezeluduena">
          <div className={c('px-2')}>
            <FiGithub strokeWidth={1} />
          </div>
        </Link>
        <Link variant="discreet" href="mailto:ezeluduena123@gmai.com">
          <div className={c('px-2')}>
            <FiMail strokeWidth={1} />
          </div>
        </Link>
      </section>
    </>
  );
};

export default HomePage;
