import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function MatriculaForm({
  matriEdit,
  onSubmit,
  defaultValues,
  onVolver,
  onCancelar,
  estudiante,
  curso,
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
    if (matriEdit) {
      const est = estudiante.find(
        (est) => est.Id_Estudiante === defaultValues.Id_Estudiante
      );
      if (est) {
        setValue("Estudiante", est.Nombre + " " + est.Apellido);
      }
      const cur = curso.find((cur) => cur.Id_Curso === defaultValues.Id_Curso);
      if (cur) {
        setValue("Curso", cur.Nombre);
      }
    }
  }, [reset, defaultValues, matriEdit, estudiante, curso, setValue]); 

  return (
    <Container>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h5>{matriEdit ? "Editar Matricula" : "Registro de Matricula"}</h5>

        {!matriEdit && (
          <>
            <Form.Group as={Row} controlId="Fecha_Matricula">
              <Form.Label column sm="2">
                Fecha de matricula:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="date"
                  {...register("Fecha_Matricula", {
                    required: "Este campo es requerido",
                  })}
                  isInvalid={!!errors.Fecha_Matricula}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Fecha_Matricula?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Estudiante:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="select"
                  {...register("Id_Estudiante", {
                    required: "Este campo es requerido",
                  })}
                >
                  <option value="">Seleccione un estudiante</option>
                  {estudiante.map((est) => (
                    <option key={est.Id_Estudiante} value={est.Id_Estudiante}>
                      {est.Nombre} {est.Apellido}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Curso:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="select"
                  {...register("Id_Curso", {
                    required: "Este campo es requerido",
                  })}
                >
                  <option value="">Seleccione un Curso</option>
                  {curso.map((cur) => (
                    <option key={cur.Id_Curso} value={cur.Id_Curso}>
                      {cur.Nombre}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
          </>
        )}
        {matriEdit && (
          <>
            <Form.Group as={Row} controlId="Fecha_Matricula">
              <Form.Label column sm="2">
                Fecha de matricula:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="date"
                  {...register("Fecha_Matricula", {
                    required: "Este campo es requerido",
                  })}
                  isInvalid={!!errors.Fecha_Matricula}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Fecha_Matricula?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Estudiante:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  {...register("Estudiante")}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Curso:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="select"
                  {...register("Id_Curso", {
                    required: "Este campo es requerido",
                  })}
                >
                  <option value="">Seleccione un Curso</option>
                  {curso.map((cur) => (
                    <option key={cur.Id_Curso} value={cur.Id_Curso}>
                      {cur.Nombre}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
          </>
        )}
        <Button variant="primary" type="submit">
          {matriEdit ? "Actualizar" : "Registrar"}
        </Button>
        {matriEdit && (
          <Button
            variant="secondary"
            type="button"
            onClick={onCancelar}
            className="ml-2"
          >
            Cancelar
          </Button>
        )}
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
