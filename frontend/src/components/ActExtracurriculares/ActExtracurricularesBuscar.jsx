import { Form, Button, Container, Card } from "react-bootstrap";
import {useForm} from 'react-hook-form'

export default function ActExtracurricularesBuscar({
    actExtracurricular,
    noEncontrado,
    nombre,
    setNombre,
    profesor,
    buscarActExtracurricular,
    onVolver,
    handleEdit,
    deleteActExtracurricular,
}) {
    const {reset} = useForm();
    
    const getNombreProfesor = (id) => {
        const prof = profesor.find((prof) => prof.Id_Profesor === id);
        return prof ? prof.Nombre  + " " + prof.Apellido: "Profesor Desconocido";
      }
   
      const handleSearch = () => {
        buscarActExtracurricular(nombre);
      }

    
      const handleVolver = () => {
        reset();
        setNombre("");
        onVolver();
      }
    
      const handleEditClick = (id) => {
        reset();
        setNombre("");
        handleEdit(id);
      }
    
      const handleDelete = (id) => {
        reset();
        setNombre("");
        deleteActExtracurricular(id);
      }

    return (
        <Container>
            <Form>
                <Form.Group controlId="formID">
                    <Form.Label>Nombre de la Actividad Extracurricular</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese nombre de la Actividad "
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleSearch}>Buscar</Button>
            </Form>
            {actExtracurricular ? (
                <Card style={{ width: "18rem" }}>
                    <Card.Body>
                        <Card.Title>Actividad Extracurricular</Card.Title>
                        <Card.Text>Nombre de la Actividad: {actExtracurricular.Nombre}</Card.Text>
                        <Card.Text>Descripcion de la Actividad: {actExtracurricular.Descripcion}</Card.Text>
                        <Card.Text>Fecha: {actExtracurricular.Fecha}</Card.Text>
                        <Card.Text>Profesor: {getNombreProfesor(actExtracurricular.Id_Profesor)}</Card.Text>
                        <Card.Text>Acciones:{" "}
                            <Button variant="outline-primary" onClick={() => handleEditClick(actExtracurricular.Id_Actividad)}>Editar</Button>{" "}
                            <Button variant="outline-danger" onClick={() => handleDelete(actExtracurricular.Id_Actividad)}>Eliminar</Button>
                        </Card.Text>
                    </Card.Body>
                    <Button variant="secondary" onClick={handleVolver}>
                        Volver
                    </Button>
                </Card>
            ) : (
                noEncontrado && (
                    <>
                        <h3>Actividad Extracurricular no encontrada</h3>
                        <Button variant="secondary" onClick={handleVolver}>Volver</Button>
                    </>
                )
            )}
        </Container>
    );
}