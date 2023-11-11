import '@styles/globals.css';

export const metadata = {
  title: 'Incidencias',
  description: 'Formulario de Incidencias routes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
