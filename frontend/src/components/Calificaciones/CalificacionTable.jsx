import {Table, Button } from "react-bootstrap" 

export default function CalificacionTable({
    calificacion,
    handleEdit,
    deleteCalificacion,
    asignatura,
    estudiante
  }) {

    //Obtener el nombre y apellido del estudiante
    const getNombreApellidoEstudiante = (id) => {
      const est = estudiante.find((est) => est.Id_Estudiante === id);
      return est ? est.Nombre + " " + est.Apellido : "Desconocido";
    }

    //Obtener el nombre de la asignatura
    const getNombreAsignatura = (id) => {
      const asig = asignatura.find((asig) => asig.Id_Asignatura === id);
      return asig ? asig.Nombre : "Asignatura desconocida";
    }


    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Asignatura</th>
              <th>Nota</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {calificacion && calificacion.map((cal, index) => (
              <tr key={index}>
                <td>{getNombreApellidoEstudiante(cal.Estudiante_Id)}</td>
                <td>{getNombreAsignatura(cal.Asignatura_Id)}</td>
                <td>{cal.Nota}</td>
                <td>{cal.Fecha}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleEdit(cal.Id_Calificacion)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => deleteCalificacion(cal.Id_Calificacion)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }