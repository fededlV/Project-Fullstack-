import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function AsignaturasForm({ asigEdit, onSubmit, defaultValues, onVolver, onCancelar }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        reset(defaultValues)
    }, [reset, defaultValues])

    return (
        <Container>
            <br />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h5>{asigEdit ? "Editar Asignatura" : "Registro de Asignatura"}</h5>

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

                <Button variant="primary" type="submit">
                    {asigEdit ? "Actualizar" : "Registrar"}
                </Button>{" "}
                {asigEdit && (
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