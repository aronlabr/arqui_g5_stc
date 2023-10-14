import { Button, Form, InputGroup, Stack } from 'react-bootstrap';

export function Input({ name, type, phold, label, value }) {
  return (
    <InputGroup>
      <InputGroup.Text id={name}>{label}</InputGroup.Text>
      <Form.Control
        type={type}
        placeholder={phold}
        name={name}
        defaultValue={value}
        required
      />
    </InputGroup>
  );
}

export default function FormContent({ handleSubmit, inputs, btnText }) {
  return (
    <Form onSubmit={handleSubmit} className="w-75 mx-auto">
      <Stack gap={3}>
        <Button variant="primary" type="submit">
          {btnText}
        </Button>
      </Stack>
    </Form>
  );
}
