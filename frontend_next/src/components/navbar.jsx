import Link from 'next/link';
import BtnLogout from './ui/btnLogout';
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary position-sticky">
      <Container fluid>
        <Navbar.Brand>Sistema Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar" className="justify-content-lg-between">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Item className="pe-lg-2">
              <Link href={'/admin/'}>Dashboard</Link>
            </Nav.Item>
            <Nav.Item className="pe-lg-2">
              <Link href={'/admin/incidentes'}>Incidencias</Link>
            </Nav.Item>
            <Nav.Item className="pe-lg-2">
              <Link href={'/admin/visitas'}>Visitas</Link>
            </Nav.Item>
            <Nav.Item className="pe-lg-2">
              <Link href={'/admin/notific'}>Notificaciones</Link>
            </Nav.Item>
            <Nav.Item className="pe-lg-2">
              <Link href={'/admin/tecnicos'}>Tecnicos</Link>
            </Nav.Item>
          </Nav>
          <BtnLogout />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
