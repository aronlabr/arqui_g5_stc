import '@styles/_reset.css';
import '@styles/globals.css';
import dynamic from 'next/dynamic';
import Head from 'next/head';

export const metadata = {
  title: 'SCI - App',
  description: 'Sistema de Control de Incidencias',
};

const AuthCheck = dynamic(() => import('@components/authCheck'), {
  ssr: false,
});

const icon =
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍓</text></svg>";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <Head>
        <link rel="icon" href={icon} type="image/svg+xml" />
      </Head>
      <body>
        {children}
        <AuthCheck />
      </body>
    </html>
  );
}
