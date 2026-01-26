import c from 'classnames';
import Link from '~/components/link';
import { FiGithub, FiMail, FiLinkedin } from 'react-icons/fi';

const SocialLinks = () => {
    return (
        <>
            <div className={c('my-8', 'h-1', 'rounded', 'bg-cyan-500')} />

            <section className={c('flex', 'justify-center', 'gap-3', 'text-2xl', 'font-light')}>
                <Link variant="discreet" href="https://github.com/ezeluduena">
                    <div className={c('px-2')}>
                        <FiGithub strokeWidth={1} />
                    </div>
                </Link>
                <Link variant="discreet" href="mailto:ezeluduena123@gmail.com">
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

export default SocialLinks;
