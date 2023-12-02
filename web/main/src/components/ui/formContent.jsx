import { Card, Form, InputGroup, Stack } from 'react-bootstrap';

export function Input({ children, name, type, phold, label, value, onChange }) {
  return (
    <InputGroup>
      <InputGroup.Text title={phold} id={name}>
        {label}
      </InputGroup.Text>
      <Form.Control
        type={type}
        placeholder={phold}
        name={name}
        defaultValue={value}
        onChange={onChange}
        required
      />
      {children}
    </InputGroup>
  );
}

export default function FormBase({ handleSubmit, children, editable }) {
  return (
    <Card className="py-5">
      <Form onSubmit={handleSubmit} className="w-75 mx-auto">
        <fieldset disabled={!editable}>
          <Stack gap={3}>{children}</Stack>
        </fieldset>
      </Form>
    </Card>
  );
}
