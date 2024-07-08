import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function ActExtracurricularesForm({
  actExtracurricularEdit,
  onSubmit,
  defaultValues,
  onVolver,
  onCancelar,
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
    if (actExtracurricularEdit) {
      const profe = profesor.find(
        (profe) => profe.Id_Profesor === defaultValues.Id_Profesor
      );
      if (profe) {
        setValue("Profesor", profe.Nombre + " " + profe.Apellido);
      }
    }
  }, [reset, defaultValues, actExtracurricularEdit, profesor, setValue]); //Este hook funciona cuando se realiza la edicion de una act extracurricular, para cargar los datos de la act extracurricular en el formulario de actualizacion

  return (
    <Container>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h5>
          {actExtracurricularEdit
            ? "Editar Actividad Extracurricular"
            : "Registro de Actividades Extracurriculares"}
        </h5>
        {!actExtracurricularEdit && (
          <>
            <Form.Group as={Row} controlId="Nombre">
              <Form.Label column sm="2">
                Nombre:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  {...register("Nombre", {
                    required: "Este campo es requerido",
                  })}
                  isInvalid={!!errors.Nombre}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Nombre?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="Descripcion">
              <Form.Label column sm="2">
                Descripción:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  {...register("Descripcion", {
                    required: "Este campo es requerido",
                  })}
                  isInvalid={!!errors.Descripcion}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Descripcion?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="Fecha">
              <Form.Label column sm="2">
                Fecha:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="date"
                  {...register("Fecha", {
                    required: "Este campo es requerido",
                  })}
                  isInvalid={!!errors.Fecha}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Fecha?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Profesor:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="select"
                  {...register("Id_Profesor", {
                    required: "Este campo es requerido",
                  })}
                >
                  {profesor.map((profe) => (
                    <option key={profe.Id_Profesor} value={profe.Id_Profesor}>
                      {profe.Nombre} {profe.Apellido}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
          </>
        )}

        {actExtracurricularEdit && (
            <>
                <Form.Group as={Row} controlId="Nombre">
              <Form.Label column sm="2">
                Nombre:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  {...register("Nombre", {
                    required: "Este campo es requerido",
                  })}
                  isInvalid={!!errors.Nombre}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Nombre?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="Descripcion">
              <Form.Label column sm="2">
                Descripción:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  {...register("Descripcion", {
                    required: "Este campo es requerido",
                  })}
                  isInvalid={!!errors.Descripcion}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Descripcion?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="Fecha">
              <Form.Label column sm="2">
                Fecha:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="date"
                  {...register("Fecha", {
                    required: "Este campo es requerido",
                  })}
                  isInvalid={!!errors.Fecha}
                  // readOnly
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Fecha?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">Profesor:</Form.Label>
                <Col sm="10">
                <Form.Control
                  as="select"
                  {...register("Id_Profesor", {
                    required: "Este campo es requerido",
                  })}
                >
                  {profesor.map((profe) => (
                    <option key={profe.Id_Profesor} value={profe.Id_Profesor}>
                      {profe.Nombre} {profe.Apellido}
                    </option>
                  ))}
                </Form.Control>
                </Col>
            </Form.Group>
            </>
        )}
        <Button variant="primary" type="submit">
          {actExtracurricularEdit ? "Actualizar" : "Registrar"}
        </Button>
        {actExtracurricularEdit && (
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
