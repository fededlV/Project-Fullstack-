import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function HorarioForm({
  horEdit,
  onSubmit,
  defaultValues,
  onVolver,
  onCancelar,
  asignatura,
  curso,
  profesor,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(defaultValues);
    if (horEdit) {
      const asig = asignatura.find(
        (asig) => asig.Id_Asignatura === defaultValues.Id_Asignatura
      );
      if (asig) {
        setValue("Asignatura", asig.Nombre);
      }
      const cur = curso.find((cur) => cur.Id_Curso === defaultValues.Id_Curso);
      if (cur) {
        setValue("Curso", cur.Nombre);
      }
      const prof = profesor.find(
        (prof) => prof.Id_Profesor === defaultValues.Id_Profesor
      );
      if (prof) {
        setValue("Profesor", prof.Nombre + " " + prof.Apellido);
      }
    }
  }, [reset, defaultValues, horEdit, asignatura, profesor, curso, setValue]); //Este hook funciona cuando se realiza la edicion de una mattencia, para cargar los datos de la asistencia en el formulario de actualizacion

  return (
    <Container>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h5>{horEdit ? "Editar Horario" : "Registro de Horario"}</h5>

        {!horEdit && (
          <>
        <Form.Group as={Row} controlId="Dia">
          <Form.Label>
            Dia:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              {...register("Dia", { required: "Este campo es requerido" })}
              defaultValue={defaultValues ? defaultValues.Dia : ""} // Asigna el valor por defecto
              isInvalid={!!errors.Dia}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Dia?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="Hora_Inicio">
          <Form.Label>
            Hora de inicio:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="time"
              {...register("Hora_Inicio", {
                required: "Este campo es requerido",
              })}
              defaultValue={defaultValues ? defaultValues.Hora_Inicio : ""} // Asigna el valor por defecto
              isInvalid={!!errors.Hora_Inicio}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Hora_Inicio?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="Hora_Fin">
          <Form.Label>
            Hora de finalizacion:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="time"
              {...register("Hora_Fin", {
                required: "Este campo es requerido",
                validate: (value) => {
                  const horaInicio = setValue("Hora_Inicio");
                  if (horaInicio && value <= horaInicio) {
                    return "La hora de finalizacion debe ser mayor a la hora de inicio";
                  }
                  return true;
                },
              })}
              isInvalid={!!errors.Hora_Fin}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Hora_Fin?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="Aula">
          <Form.Label>
            Aula:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="Aula"
              {...register("Aula", { required: "Este campo es requerido" })}
              defaultValue={defaultValues ? defaultValues.Aula : ""} // Asigna el valor por defecto
              isInvalid={!!errors.Aula}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Aula?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="Id_Asignatura">
          <Form.Label>
            Asignatura:
          </Form.Label>
          <Col sm="10">
              <Form.Control 
              as="select"
              {...register("Id_Asignatura", { required: "Este campo es requerido" })}>
                <option value="">Seleccione una asignatura</option>
                {asignatura.map((asig) => (
                  <option key={asig.Id_Asignatura} value={asig.Id_Asignatura}>
                    {asig.Nombre}
                  </option>
                ))}
              </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="Id_Curso">
          <Form.Label>
            Curso:
          </Form.Label>
          <Col sm="10">
              <Form.Control 
              as="select"
              {...register("Id_Curso", { required: "Este campo es requerido" })}>
                <option value="">Seleccione un curso</option>
                {curso.map((cur) => (
                  <option key={cur.Id_Curso} value={cur.Id_Curso}>
                    {cur.Nombre}
                  </option>
                ))}
              </Form.Control>
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} controlId="Id_Profesor">
          <Form.Label>
            Profesor:
          </Form.Label>
          <Col sm="10">
              <Form.Control 
              as="select"
              {...register("Id_Profesor", { required: "Este campo es requerido" })}>
                <option value="">Seleccione un profesor</option>
                {profesor.map((prof) => (
                  <option key={prof.Id_Profesor} value={prof.Id_Profesor}>
                    {prof.Nombre} {prof.Apellido}
                  </option>
                ))}
              </Form.Control>
          </Col>
        </Form.Group>
          </>
        )}

        {horEdit && (
          <>
            <Form.Group as={Row} controlId="Dia">
          <Form.Label>
            Dia:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              {...register("Dia", { required: "Este campo es requerido" })}
              defaultValue={defaultValues ? defaultValues.Dia : ""} // Asigna el valor por defecto
              isInvalid={!!errors.Dia}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Dia?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="Hora_Inicio">
          <Form.Label>
            Hora de inicio:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="time"
              {...register("Hora_Inicio", {
                required: "Este campo es requerido",
              })}
              defaultValue={defaultValues ? defaultValues.Hora_Inicio : ""} // Asigna el valor por defecto
              isInvalid={!!errors.Hora_Inicio}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Hora_Inicio?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="Hora_Fin">
          <Form.Label>
            Hora de finalizacion:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="time"
              {...register("Hora_Fin", { required: "Este campo es requerido" })}
              defaultValue={defaultValues ? defaultValues.Hora_Fin : ""} // Asigna el valor por defecto
              isInvalid={!!errors.Hora_Fin}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Hora_Fin?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="Aula">
          <Form.Label>
            Aula:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="Aula"
              {...register("Aula", { required: "Este campo es requerido" })}
              defaultValue={defaultValues ? defaultValues.Aula : ""} // Asigna el valor por defecto
              isInvalid={!!errors.Aula}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Aula?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label>
            Asignatura:
          </Form.Label>
          <Col sm="10">
              <Form.Control
              type="text"
              {...register("Asignatura")}
              disabled />
          </Col>
        </Form.Group>
        
        <Form.Group as={Row}>
          <Form.Label>
            Curso:
          </Form.Label>
          <Col sm="10">
              <Form.Control
              type="text"
              {...register("Curso")}
              disabled />
          </Col>
        </Form.Group>
        
        <Form.Group as={Row}>
          <Form.Label>
            Profesor:
          </Form.Label>
          <Col sm="10">
              <Form.Control
              type="text"
              {...register("Profesor")}
              disabled />
          </Col>
        </Form.Group>
          </>
        )}
        <Button variant="primary" type="submit">
          {horEdit ? "Actualizar" : "Registrar"}
        </Button>{" "}
        {horEdit && (
          <Button
            variant="secondary"
            type="button"
            onClick={onCancelar}
            className="ml-2"
          >
            Cancelar
          </Button>
        )}{" "}
        <Button
          variant="secondary"
          type="button"
          onClick={onVolver}
          className="ml-2"
        >
          Volver
        </Button>
      </Form>
    </Container>
  );
}
