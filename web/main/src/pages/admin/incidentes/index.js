import dynamic from 'next/dynamic';

export default dynamic(() => import('tables/incidencias'), {
  ssr: false,
});
