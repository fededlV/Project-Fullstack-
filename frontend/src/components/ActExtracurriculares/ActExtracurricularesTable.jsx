import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

export default function ActExtracurricularesTable({
    actExtracurricular,
    handleEdit,
    deleteActExtracurricular,
    getNombreProfesor
}) {
    return (
        <div>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Fecha</th>
                        <th>Profesor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {actExtracurricular &&
                        actExtracurricular.map(
                            (
                                act, index //Se recorre el array de act extracurriculares y se muestra en la tabla
                            ) => (
                                <tr key={index}>
                                    <td>{act.Nombre}</td>
                                    <td>{act.Descripcion}</td>
                                    <td>{act.Fecha}</td>
                                    <td>{getNombreProfesor(act.Id_Profesor)}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleEdit(act.Id_Actividad)}
                                        >
                                            Editar
                                        </Button>{" "}
                                        <Button
                                            variant="danger"
                                            onClick={() => deleteActExtracurricular(act.Id_Actividad)}
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