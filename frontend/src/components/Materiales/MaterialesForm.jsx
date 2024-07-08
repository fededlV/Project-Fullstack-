import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function MaterialForm({
  matEdit,
  onSubmit,
  defaultValues,
  onVolver,
  onCancelar,
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
    if (matEdit) {
      // Si estamos editando, llenamos los campos con los datos correspondientes
      const cur = curso.find((cur) => cur.Id_Curso === defaultValues.Id_Curso);
      if (cur) {
        setValue("Curso", cur.Nombre);
      }
    }
  }, [reset, defaultValues, matEdit, curso, setValue]); 

  return (
    <Container>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h5>{matEdit ? "Editar Material" : "Registro de Materiales"}</h5>

        {!matEdit && (
          <>
            <Form.Group as={Row} controlId="Descripcion">
              <Form.Label column sm="2">
                Descripcion:
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

            <Form.Group as={Row} controlId="Tipo_Material">
              <Form.Label column sm="2">
                Tipo de Material:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  {...register("Tipo_Material", {
                    required: "Este campo es requerido",
                  })}
                  isInvalid={!!errors.Tipo_Material}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Tipo_Material?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="URL">
              <Form.Label column sm="2">
                URL:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  {...register("URL", { required: "Este campo es requerido" })}
                  isInvalid={!!errors.URL}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.URL?.message}
                </Form.Control.Feedback>
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
                    required: "El Curso es requerido",
                  })}
                >
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

        {matEdit && (
          <>
            <Form.Group as={Row} controlId="Descripcion">
          <Form.Label column sm="2">Descripción:</Form.Label>
          <Col sm="10">
            <Form.Control type="text" {...register("Descripcion", { required: "Este campo es requerido" })}
             defaultValue={defaultValues ? defaultValues.Descripcion : ""} // Asigna el valor por defecto
              isInvalid={!!errors.Descripcion}
            />
            <Form.Control.Feedback type="invalid">{errors.Descripcion?.message}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="Tipo_Material">
          <Form.Label column sm="2">Tipo de Material:</Form.Label>
          <Col sm="10">
            <Form.Control type="text" {...register("Tipo_Material", { required: "Este campo es requerido" })}
              defaultValue={defaultValues ? defaultValues.Tipo_Material : ""}
              isInvalid={!!errors.Tipo_Material}
            />
            <Form.Control.Feedback type="invalid">{errors.Tipo_Material?.message}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="URL">
          <Form.Label column sm="2">URL:</Form.Label>
          <Col sm="10">
            <Form.Control type="text" {...register("URL", { required: "Este campo es requerido" })}
              defaultValue={defaultValues ? defaultValues.URL : ""}
              isInvalid={!!errors.URL}
            />
            <Form.Control.Feedback type="invalid">{errors.URL?.message}</Form.Control.Feedback>
          </Col>
        </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">Curso:</Form.Label>
            <Col sm="10">
              <Form.Control type="text" {...register("Curso")} disabled />
            </Col>
          </Form.Group>
          </>
        )}
        <Button variant="primary" type="submit">
          {matEdit ? "Actualizar" : "Registrar"}
        </Button>
        {matEdit && (
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
