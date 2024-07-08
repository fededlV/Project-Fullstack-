import {Form, Button, Container, Card} from "react-bootstrap";

export default function CursosBuscar({
    asignatura,
    noEncontrado,
    nombre,
    setNombre,
    buscarAsignatura,
    onVolver,
    handleEdit,
    deleteAsignatura,
}){
    return (
        <Container>
            <Form>
                <Form.Group controlId="formNombre">
                    <Form.Label>Nombre de la Asignatura</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese nombre de la asignatura"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={() => buscarAsignatura(nombre)}>
                    Buscar
                </Button>
            </Form>
            {asignatura ? (
                <Card style={{ width: "18rem" }}>
                    <Card.Body>
                        <Card.Title>Asignatura</Card.Title>
                        <Card.Text>Asignatura Nombre: {asignatura.Nombre}</Card.Text>
                        <Card.Text>Descripcion: {asignatura.Descripcion}</Card.Text>
                        <Card.Text>
                            Acciones:{" "}
                            <Button variant="outline-primary" onClick={() => handleEdit(asignatura.Id_Asignatura)}>
                                Editar
                            </Button>{" "}
                            <Button
                                variant="outline-danger"
                                onClick={() => deleteAsignatura(asignatura.Id_Asignatura)}
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
                <h3>Asignatura no encontrada</h3>
                <Button variant="secondary" onClick={onVolver}>
                    Volver
                </Button>
                </>
            )
        )}
        </Container>
    )
}