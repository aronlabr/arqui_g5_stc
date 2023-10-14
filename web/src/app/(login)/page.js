'use client';

import { Input } from '@components/ui/formContent';
import { checkAuth } from '@libs/userAuth';
import { useRouter } from 'next/navigation';
import { Button, Card, Form, InputGroup, Stack } from 'react-bootstrap';

export default function Page() {
  const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
    const [user, pass] = event.target;
    const [id, point] = checkAuth(user.value, pass.value);
    console.log([user.value, pass.value]);
    console.log('User Id', id);
    router.push(point);
  }

  return (
    <Card className="w-50 py-5 position-absolute top-50 start-50 translate-middle">
      <Form onSubmit={handleSubmit} className="w-75 mx-auto">
        <Stack gap={3}>
          <h1>Inicio de Sesion</h1>
          <Input
            label={'🙂'}
            name={'user'}
            phold={'Ingrese usuario'}
            type={'text'}
          />
          <Input
            label={'🔐'}
            name={'pass'}
            phold={'Ingrese contraseña'}
            type={'password'}
          />
          <Button variant="primary" type="submit">
            Ingresar
          </Button>
        </Stack>
      </Form>
    </Card>
  );
}
