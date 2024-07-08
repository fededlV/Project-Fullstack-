import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

export default function MatriculaTable({
  matricula,
  handleEdit,
  deleteMatricula,
  getNombreCurso, // Recibe la función getNombreCurso como prop
  getNombreAlumno
}) {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Curso</th>
            <th>Fecha matricula</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {matricula &&
            matricula.map(
              (
                matri, index //Se recorre el array de matriculas y se muestra en la tabla
              ) => (
                <tr key={index}>
                  <td>{getNombreAlumno(matri.Id_Estudiante)}</td>
                  <td>{getNombreCurso(matri.Id_Curso)}</td> 
                  <td>{matri.Fecha_Matricula}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleEdit(matri.Id_Matricula)}
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => deleteMatricula(matri.Id_Matricula)}
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
