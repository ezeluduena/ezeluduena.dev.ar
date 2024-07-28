import c from 'classnames';
import { NextPage } from 'next';
import { FiGithub, FiMail, FiLinkedin } from 'react-icons/fi';
import Heading from '~/components/heading';
import Image from '~/components/image';
import Link from '~/components/link';
import Paragraph from '~/components/paragraph';

const HomePage: NextPage = () => {
  const age = new Date(Date.now() - Date.parse('2000-12-06')).getUTCFullYear() - 1970;

  const famafLccUrl = 'https://www.famaf.unc.edu.ar/academica/grado/licenciatura-en-ciencias-de-la-computaci%C3%B3n/';

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
            <Heading>Buenas! 👋</Heading>
          </div>
          <Paragraph>
            Me llamo Ezequiel, tengo {age} años y soy de Córdoba, Argentina.
            <br />
            Soy un estudiante avanzado de <Link href={famafLccUrl}> Ciencias de la Computación </Link>
            en la Universidad Nacional de Córdoba. Me gusta el fútbol, el cine y andar en bicicleta.
          </Paragraph>
          <Paragraph>
            Desde chico que estoy interesado en cómo funcionan los celulares y las computadoras.
            Desde entonces que paso bastante tiempo investigando sobre tecnología en general.
            <br />
            Hoy mis principales intereses son la programación backend, el software libre y la administración de sistemas.
          </Paragraph>
          <Paragraph>
            En esta página vas a encontrar los distintos <Link href={'/projects'}> proyectos</Link> en los que estuve trabajando.
            También podés leer mi <Link href={'/blog'}> blog</Link>, donde escribo
            para registrar y compartir lo que voy aprendiendo.
          </Paragraph>
        </div>
      </section >

      <div className={c('my-8', 'h-1', 'rounded', 'bg-cyan-500')} />

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

        <Link variant="discreet" href="https://www.linkedin.com/in/ezeluduena/">
          <div className={c('px-2')}>
            <FiLinkedin strokeWidth={1} />
          </div>
        </Link>
      </section>
    </>
  );
};

export default HomePage;
