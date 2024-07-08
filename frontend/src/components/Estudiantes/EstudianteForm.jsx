import { useEffect } from 'react';
import {useForm} from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';


export default function EstudianteForm({ estEdit, onSubmit, defaultValues, onVolver, onCancelar }) {
  const {register, handleSubmit, reset, formState: {errors}} = useForm();

  
  useEffect(() => {
    reset(defaultValues)
  }, [reset, defaultValues]) //Este hook funciona cuando se realiza la edicion de un estudiante, para cargar los datos del estuidante en el formulario de actualizacion 

  
  return (
    <Container>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h5>{estEdit ? "Editar Estudiante" : "Registro de Estudiante"}</h5>
        
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
        
        <Form.Group as={Row} controlId="Apellido">
          <Form.Label column sm="2">Apellido:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              {...register("Apellido", { required: "Este campo es requerido" })}
              isInvalid={!!errors.Apellido}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Apellido?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} controlId="Fecha_nacimiento">
          <Form.Label column sm="2">Fecha de nacimiento:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="date"
              {...register("Fecha_nacimiento", { required: "Este campo es requerido" })}
              isInvalid={!!errors.Fecha_nacimiento}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Fecha_nacimiento?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} controlId="Telefono">
          <Form.Label column sm="2">Telefono:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="tel"
              {...register("Telefono", { required: "Este campo es requerido" })}
              isInvalid={!!errors.Telefono}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Telefono?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} controlId="Email">
          <Form.Label column sm="2">Email:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="email"
              {...register("Email", { required: "Este campo es requerido" })}
              isInvalid={!!errors.Email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Email?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} controlId="Direccion">
          <Form.Label column sm="2">Direccion:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              {...register("Direccion", { required: "Este campo es requerido" })}
              isInvalid={!!errors.Direccion}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Direccion?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          {estEdit ? "Actualizar" : "Registrar"}
        </Button>{" "}
        {estEdit && (
          <Button variant="secondary" type="button" onClick={onCancelar} className="ml-2">
            Cancelar
          </Button>
        )}{" "}
        <Button variant="secondary" type="button" onClick={onVolver} className="ml-2">
          Volver
        </Button>
      </Form>
    </Container>
  )
}
