import dynamic from 'next/dynamic';

const Agregar = await dynamic(() => import('callc/agregarInc'), { ssr: false });

export default Agregar;
