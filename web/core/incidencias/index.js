import dynamic from 'next/dynamic';

const Inci = dynamic(() => import('tables/incidencias'), { ssr: false });

export default Inci;
