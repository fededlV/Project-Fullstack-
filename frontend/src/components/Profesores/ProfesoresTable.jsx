import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

export default function ProfesoresTable({
  profesor,
  handleEdit,
  deleteProfesor,
}) {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Especialidad</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Fecha de Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {profesor && profesor.map((prof) => (
              <tr key={prof.Id_Profesor}>
                <td>{prof.Nombre}</td>
                <td>{prof.Apellido}</td>
                <td>{prof.Especialidad}</td>
                <td>{prof.Telefono}</td>
                <td>{prof.Email}</td>
                <td>{prof.Fecha_Nacimiento}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleEdit(prof.Id_Profesor)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => deleteProfesor(prof.Id_Profesor)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
}

