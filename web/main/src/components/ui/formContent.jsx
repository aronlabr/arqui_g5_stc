import {
  Button,
  Card,
  Container,
  Form,
  InputGroup,
  Row,
  Stack,
} from 'react-bootstrap';

export function Input({ children, name, type, phold, label, value, onChange }) {
  return (
    <InputGroup>
      <InputGroup.Text id={name}>{label}</InputGroup.Text>
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

export default function FormBase({
  handleSubmit,
  children,
  btnText,
  editable,
}) {
  return (
    <Container fluid className="h-100">
      <Row className="d-flex h-100 justify-content-center align-content-center">
        <Card className="w-50 py-5">
          <Form onSubmit={handleSubmit} className="w-75 mx-auto">
            <fieldset disabled={!editable}>
              <Stack gap={3}>
                {children}
                <Button variant="primary" type="submit">
                  {btnText}
                </Button>
              </Stack>
            </fieldset>
          </Form>
        </Card>
      </Row>
    </Container>
  );
}
