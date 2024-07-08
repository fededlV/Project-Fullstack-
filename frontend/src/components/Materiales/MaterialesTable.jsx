import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

export default function MaterialTable({
  material,
  handleEdit,
  deleteMaterial,
  getNombreCurso // Recibe la función getNombreCurso como prop
}) {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Tipo Material</th>
            <th>URL</th>
            <th>Curso</th>
          </tr>
        </thead>
        <tbody>
          {material &&
            material.map(
              (
                mat, index //Se recorre el array de materiales y se muestra en la tabla
              ) => (
                <tr key={index}>
                  <td>{mat.Descripcion}</td>
                  <td>{mat.Tipo_Material}</td>
                  <td>{mat.URL}</td>
                  <td>{getNombreCurso(mat.Id_Curso)}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleEdit(mat.Id_Material)}
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => deleteMaterial(mat.Id_Material)}
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
