import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function CalificacionForm({
  calEdit,
  defaultValues,
  onSubmit,
  onVolver,
  onCancelar,
  estudiantes,
  asignaturas,
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
    if (calEdit) {
      const est = estudiantes.find(
        (est) => est.Id_Estudiante === defaultValues.Estudiante_Id
      );
      if (est) {
        setValue("Estudiante", est.Nombre + " " + est.Apellido);
      }
      const asig = asignaturas.find(
        (asig) => asig.Id_Asignatura === defaultValues.Asignatura_Id
      );
      if (asig) {
        setValue("Asignatura", asig.Nombre);
      }
    }
  }, [reset, defaultValues, calEdit, estudiantes, asignaturas, setValue]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <br />
          <h5>
            {calEdit ? "Editar Calificación" : "Registro de Calificación"}
          </h5>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {!calEdit && (
              <>
                <Form.Group controlId="Estudiante_Id">
                  <Form.Label>Estudiante</Form.Label>
                  <Form.Control
                    as="select"
                    {...register("Estudiante_Id", {
                      required: "Este campo es requerido",
                    })}
                  >
                    <option value="">Seleccion un estudiante</option>
                    {estudiantes.map((estudiante) => (
                      <option
                        key={estudiante.Id_Estudiante}
                        value={estudiante.Id_Estudiante}
                      >
                        {estudiante.Nombre} {estudiante.Apellido}
                      </option>
                    ))}
                  </Form.Control>
                  {errors.Estudiante_Id && (
                    <span className="error">
                      {errors.Estudiante_Id.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group controlId="Asignatura_Id">
                  <Form.Label>Asignatura</Form.Label>
                  <Form.Control
                    as="select"
                    {...register("Asignatura_Id", {
                      required: "Este campo es requerido",
                    })}
                  >
                    <option value="">Seleccione una asignatura</option>
                    {asignaturas.map((asignatura) => (
                      <option
                        key={asignatura.Id_Asignatura}
                        value={asignatura.Id_Asignatura}
                      >
                        {asignatura.Nombre}
                      </option>
                    ))}
                  </Form.Control>
                  {errors.Asignatura_Id && (
                    <span className="error">
                      {errors.Asignatura_Id.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group controlId="Nota">
                  <Form.Label>Nota</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.1"
                    {...register("Nota", {
                      required: "Este campo es requerido",
                      min: 1,
                      max: 10,
                    })}
                  />
                  {errors.Nota && (
                    <span className="error">{errors.Nota.message}</span>
                  )}
                </Form.Group>

                <Form.Group controlId="Fecha">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    {...register("Fecha", {
                      required: "Este campo es requerido",
                      validate: (value) =>
                        !isNaN(Date.parse(value)) ||
                        "Por favor ingrese una fecha válida",
                    })}
                  />
                  {errors.Fecha && (
                    <span className="error">{errors.Fecha.message}</span>
                  )}
                </Form.Group>
              </>
            )}
            {calEdit && (
              <>
                <Form.Group as={Row}>
                  <Form.Label>
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
                  <Form.Label>
                    Asignatura:
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      {...register("Asignatura")}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group controlId="Nota">
                  <Form.Label>Nota</Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="number"
                      step="0.1"
                      {...register("Nota", {
                        required: "Este campo es requerido",
                        min: 1,
                        max: 10,
                      })}
                    />
                    {errors.Nota && (
                      <span className="error">{errors.Nota.message}</span>
                    )}
                  </Col>
                </Form.Group>

                <Form.Group controlId="Fecha">
                  <Form.Label>Fecha</Form.Label>
                  <Col sm="10">
                    <Form.Control type="date" {...register("Fecha")} disabled />
                  </Col>
                </Form.Group>
              </>
            )}
            <Button variant="primary" type="submit">
              {calEdit ? "Actualizar" : "Registrar"}
            </Button>{" "}
            {calEdit && (
              <Button variant="danger" onClick={onCancelar}>
                Cancelar Edición
              </Button>
            )}{" "}
            <Button variant="secondary" onClick={onVolver}>
              Volver
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
