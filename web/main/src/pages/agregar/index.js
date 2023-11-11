import dynamic from 'next/dynamic';

const Agregar = dynamic(() => import('callc/agregarForm'), { ssr: false });

export default Agregar;
