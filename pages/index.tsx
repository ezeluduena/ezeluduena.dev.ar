import c from 'classnames';
import { NextPage } from 'next';
import Heading from '~/components/heading';
import Image from '~/components/image';
import Link from '~/components/link';
import Paragraph from '~/components/paragraph';
import SocialLinks from '~/components/sociallinks';
import homeTranslations from '~/data/locale/home';
import useLocale from '~/hooks/useLocale';

const HomePage: NextPage = () => {
  const { locale } = useLocale();

  const famafLccUrl =
    'https://www.famaf.unc.edu.ar/academica/grado/licenciatura-en-ciencias-de-la-computaci%C3%B3n/';
  const diplomaUrl = 'https://diplodatos.famaf.unc.edu.ar/';

  const t = homeTranslations[locale];

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
          <Image src="/logo-trans.png" alt="Ezequiel Ludueña" width={600} height={600} priority />
        </div>

        <div>
          <div className={c('text-center', 'md:text-left')}>
            <Heading>{t.greeting}</Heading>
            <Paragraph>{t.introduction}</Paragraph>
            <Paragraph>
              {t.study1}
              <Link href={famafLccUrl}>{t.study2}</Link>
              {t.study3}
              <Link href={diplomaUrl}>{t.study4}</Link>
              {t.study5}
            </Paragraph>
            <Paragraph>
              {t.interest1} {t.interest2}
            </Paragraph>
            <Paragraph>
              {t.projects1}
              <Link href={'/projects'}>{t.projects2}</Link> {t.projects3}
              <Link href={'/blog'}>{t.blog}</Link>
              {t.projects4}
            </Paragraph>
          </div>
        </div>
      </section>

      <SocialLinks />
    </>
  );
};

export default HomePage;
