import {Form, Button, Container, Card} from "react-bootstrap";

export default function CursosBuscar({
    curso,
    noEncontrado,
    nombre,
    setNombre,
    buscarCurso,
    onVolver,
    handleEdit,
    deleteCurso,
}){
    return(
        <Container>
            <Form>
                <Form.Group controlId="formNombre">
                    <Form.Label>Nombre del Curso</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese nombre del curso"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={() => buscarCurso(nombre)}>
                    Buscar
                </Button>
            </Form>
            {curso ? (
                <Card style={{ width: "18rem" }}>
                    <Card.Body>
                        <Card.Title>Curso</Card.Title>
                        <Card.Text>Curso Nombre: {curso.Nombre}</Card.Text>
                        <Card.Text>Fecha de Inicio: {curso.Fecha_Inicio}</Card.Text>
                        <Card.Text>Fecha de Fin: {curso.Fecha_Fin}</Card.Text>
                        <Card.Text>
                            Acciones:{" "}
                            <Button variant="outline-primary" onClick={() => handleEdit(curso.Id_Curso)}>
                                Editar
                            </Button>{" "}
                            <Button
                                variant="outline-danger"
                                onClick={() => deleteCurso(curso.Id_Curso)}
                            >
                                Eliminar
                            </Button>
                        </Card.Text>
                    </Card.Body>
                    <Button variant="secondary" onClick={onVolver}>
                        Volver
                    </Button>
                </Card>
            ) : (noEncontrado && (
                <>
                <h3>Curso no encontrado</h3>
                <Button variant="secondary" onClick={onVolver}>
                    Volver
                </Button>
                </>
            )
        )}
        </Container>
    )
}