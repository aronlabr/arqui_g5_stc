import { clearLS } from '@/libs/userAuth';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';

export default function BtnLogout() {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        clearLS();
        router.push('/');
      }}
    >
      Cerrar sesion
    </Button>
  );
}
