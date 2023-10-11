import Link from 'next/link';
import BtnLogout from './btnLogout';

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href={'/dashboard'}>Dashboard</Link>
          <Link href={'/incidencias/1'}>Incidencia de Prueba</Link>
          <Link href={'/notificaciones'}>Notificaciones</Link>
          <Link href={'/tecnicos'}>Tecnicos</Link>
          <BtnLogout />
        </li>
      </ul>
    </nav>
  );
}
