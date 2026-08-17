import { NextPage } from 'next';
import Heading from '~/components/heading';
import Meta from '~/components/meta';
import Paragraph from '~/components/paragraph';
import useLocale from '~/hooks/useLocale';

const notFoundTexts = {
  en: {
    title: 'Not Found',
    heading: 'Not Found',
    description: 'The page you requested does not exist'
  },
  es: {
    title: 'No encontrado',
    heading: 'No encontrado',
    description: 'La página que buscas no existe'
  }
};

const NotFoundPage: NextPage = () => {
  const { locale } = useLocale();
  const t = notFoundTexts[locale];

  return (
    <>
      <Meta title={t.title} />

      <section>
        <Heading>{t.heading}</Heading>
        <Paragraph>{t.description}</Paragraph>
      </section>
    </>
  );
};

export default NotFoundPage;
