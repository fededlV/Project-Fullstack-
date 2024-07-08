import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function CursosForm({ curEdit, onSubmit, defaultValues, onVolver, onCancelar }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        reset(defaultValues)
    }, [reset, defaultValues]) //Este hook funciona cuando se realiza la edicion de un curso, para cargar los datos del curso en el formulario de actualizacion

    return (
        <Container>
            <br />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h5>{curEdit ? "Editar Curso" : "Registro de Curso"}</h5>

                <Form.Group as={Row} controlId="Nombre">
                    <Form.Label column sm="2">Nombre:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            {...register("Nombre", { required: "Este campo es requerido" })}
                            isInvalid={!!errors.Nombre}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.Nombre?.message}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="Descripcion">
                    <Form.Label column sm="2">Descripcion:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            {...register("Descripcion", { required: "Este campo es requerido" })}
                            isInvalid={!!errors.Descripcion}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.Descripcion?.message}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="Fecha_Inicio">
                    <Form.Label column sm="2">Fecha de inicio:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="date"
                            {...register("Fecha_Inicio", { required: "Este campo es requerido" })}
                            isInvalid={!!errors.Fecha_Inicio}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.Fecha_Inicio?.message}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="Fecha_Fin">
                    <Form.Label column sm="2">Fecha de fin:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="date"
                            {...register("Fecha_Fin", { required: "Este campo es requerido" })}
                            isInvalid={!!errors.Fecha_Fin}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.Fecha_Fin?.message}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit">
                    {curEdit ? "Actualizar" : "Registrar"}
                </Button>{" "}
                {curEdit && (
                    <Button variant="secondary" type="button" onClick={onCancelar} className="ml-2">
                        Cancelar
                    </Button>
                )}{" "}
                <Button variant="secondary" type="button" onClick={onVolver} className="ml-2">
                    Volver
                </Button>
            </Form>
        </Container>
    );
}