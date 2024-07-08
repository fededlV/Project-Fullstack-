import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

export default function EstudianteTable({
  estudiante,
  handleEdit,
  deleteEstudiante,
}) {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Direccion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiante && estudiante.map((est) => ( //Se recorre el array de estudiantes y se muestra en la tabla
            <tr key={est.Id_Estudiante}>
              <td>{est.Nombre}</td>
              <td>{est.Apellido}</td>
              <td>{est.Fecha_nacimiento}</td>
              <td>{est.Telefono}</td>
              <td>{est.Email}</td>
              <td>{est.Direccion}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEdit(est.Id_Estudiante)}
                >
                  Editar
                </Button>{" "}
                <Button
                variant="danger"
                  onClick={() => deleteEstudiante(est.Id_Estudiante)}
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