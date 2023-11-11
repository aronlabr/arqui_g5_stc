import dynamic from 'next/dynamic';

const IncidList = dynamic(() => import('tables/incidencias'), { ssr: false });

export default IncidList;
