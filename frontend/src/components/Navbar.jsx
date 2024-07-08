import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-dark">
      <Container>
        <Navbar.Brand href="/gestionEscolar">Gestion Escolar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <NavDropdown title="Entidades" id="basic-nav-dropdown">
              <NavDropdown.Item href="/estudiantes">Estudiantes</NavDropdown.Item>
              <NavDropdown.Item href="/profesores">Profesores</NavDropdown.Item>
              <NavDropdown.Item href="/cursos">Cursos</NavDropdown.Item>
              <NavDropdown.Item href="/horarios">Horarios</NavDropdown.Item>
              <NavDropdown.Item href="/asignaturas">Asignaturas</NavDropdown.Item>
              <NavDropdown.Item href="/asistencias">Asistencias</NavDropdown.Item>
              <NavDropdown.Item href="/materiales">Material del Curso</NavDropdown.Item>
              <NavDropdown.Item href="/matriculas">Matriculas</NavDropdown.Item>
              <NavDropdown.Item href="/actExtracurriculares">Actividades Extracurriculares</NavDropdown.Item>
              <NavDropdown.Item href="/calificaciones">Calificaciones</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
