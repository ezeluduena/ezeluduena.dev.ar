import c from 'classnames';
import { NextPage } from 'next';
import Heading from '~/components/heading';
import Image from '~/components/image';
import Link from '~/components/link';
import Paragraph from '~/components/paragraph';
import SocialLinks from '~/components/sociallinks';
import useLocale from '~/hooks/useLocale';
import homeTranslations from '~/public/locale/home';

const HomePage: NextPage = () => {
  const { locale, setLocale } = useLocale();
  const age = new Date(Date.now() - Date.parse('2000-12-06')).getUTCFullYear() - 1970;

  const famafLccUrl = 'https://www.famaf.unc.edu.ar/academica/grado/licenciatura-en-ciencias-de-la-computaci%C3%B3n/';

  const t = homeTranslations[locale];

  const handleLocaleChange = () => {
    setLocale(locale === 'es' ? 'en' : 'es');
  }


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
            <Heading>{t.greeting}</Heading>
            <Paragraph>
              {t.introduction.replace('{age}', age.toString())}
              <br />
              {t.study1} <Link href={famafLccUrl}> {t.study2} </Link>
              {t.study3}
            </Paragraph>
            <Paragraph>
              {t.interest1}
              <br />
              {t.interest2}
            </Paragraph>
            <Paragraph>
              {t.projects1} <Link href={'/projects'}> {t.projects2}</Link> {t.projects3}
              <Link href={'/blog'}>blog</Link>{t.projects4}
            </Paragraph>
          </div>
        </div>
      </section >

      <SocialLinks />
    </>
  );
};

export default HomePage;
