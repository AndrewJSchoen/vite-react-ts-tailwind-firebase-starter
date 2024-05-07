import { Helmet } from 'react-helmet-async';
import { useStore, useSystemThemePreference } from '../contexts/store';

type Props = {
  title: string;
  description?: string;
};

const SERVICE_NAME = import.meta.env.VITE_SERVICE_NAME;

export const Head = ({ title, description }: Props) => {
  const theme = useStore((state) => state.theme);
  const systemPreference = useSystemThemePreference();

  return (
    <Helmet>
      <html className={theme === 'system' ? systemPreference : theme} />
      <title>{`${title} | ${SERVICE_NAME}`}</title>
      <meta name="description" content={description ?? `This is ${SERVICE_NAME}`} />
      <meta property="og:title" content={`${title} | ${SERVICE_NAME}`} />
      <meta property="og:description" content={description ?? `This is ${SERVICE_NAME}`} />
      <meta name="robots" content="noindex" />
    </Helmet>
  );
};
