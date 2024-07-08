import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function AsistenciaForm({
  asisEdit,
  onSubmit,
  defaultValues,
  onVolver,
  onCancelar,
  estudiante,
  horario,
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
    if (asisEdit) {
      // Si estamos editando, llenamos los campos con los datos correspondientes
      const est = estudiante.find(
        (est) => est.Id_Estudiante === defaultValues.Id_Estudiante
      );
      const hor = horario.find(
        (hor) => hor.Id_Horario === defaultValues.Id_Horario
      );
      if (est) {
        setValue("Estudiante", est.Nombre + " " + est.Apellido);
      }
      if (hor) {
        setValue("Dia de Horario", hor.Dia);
        setValue("Horas", hor.Hora_Inicio + "-" + hor.Hora_Fin);
        setValue("Aula", hor.Aula);
      }
    }
  }, [reset, defaultValues, asisEdit, estudiante, horario, setValue]); //Este hook funciona cuando se realiza la edicion de una asistencia, para cargar los datos de la asistencia en el formulario de actualizacion

  return (
    <Container>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h5>{asisEdit ? "Editar Asistencia" : "Registro de Asistencia"}</h5>
        {/* Campos para mostrar a la hora de la creacion de la Asistencia */}
        {!asisEdit && (
          <>
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
                Estudiante:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="select"
                  {...register("Id_Estudiante", { required: "El Estudiante Es requerido" })}
                >
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
                Horario:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="select"
                  {...register("Id_Horario", { required: "El Horario es requerido" })}
                  onChange={(e) => {
                    const selectedHorario = horario.find(
                      (hor) => hor.Id_Horario === parseInt(e.target.value)
                    );
                    if (selectedHorario) {
                      setValue("Dia de Horario", selectedHorario.Dia);
                      setValue(
                        "Horas",
                        selectedHorario.Hora_Inicio +
                          "-" +
                          selectedHorario.Hora_Fin
                      );
                      setValue("Aula", selectedHorario.Aula);
                    }
                  }}
                >
                  {horario.map((hor) => (
                    <option key={hor.Id_Horario} value={hor.Id_Horario}>
                      {hor.Dia} {hor.Hora_Inicio}-{hor.Hora_Fin} {hor.Aula}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="Asistio">
          <Form.Label column sm="2">
            Asistencia:
          </Form.Label>
          <Col sm="10">
            <Form.Check
              type="checkbox"
              label="El estudiante asistió"
              {...register("Asistio")}
            />
          </Col>
        </Form.Group>
          </>
        )}
        {/* Campos para mostrar a la hora de la edicion de una asistencia */}
        {asisEdit && (
          <>
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
              <Form.Label column sm="2">Estudiante:</Form.Label>
              <Col sm="10">
                <Form.Control type="text" {...register("Estudiante")} disabled />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">Día:</Form.Label>
              <Col sm="10">
                <Form.Control type="text" {...register("Dia de Horario")} disabled />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">Hora:</Form.Label>
              <Col sm="10">
                <Form.Control type="text" {...register("Horas")} disabled />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">Aula:</Form.Label>
              <Col sm="10">
                <Form.Control type="text" {...register("Aula")} disabled />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="Asistio">
          <Form.Label column sm="2">
            Asistencia:
          </Form.Label>
          <Col sm="10">
            <Form.Check
              type="checkbox"
              label="El estudiante asistió"
              {...register("Asistio")}
            />
          </Col>
        </Form.Group>
          </>
        )}
        <Button variant="primary" type="submit">
          {asisEdit ? "Actualizar" : "Registrar"}
        </Button>
        {asisEdit && (
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
