import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

export default function CursosTable({
    curso,
    handleEdit,
    deleteCurso,
}) {
    return (
        <div>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Fin</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {curso && curso.map((cur) => ( //Se recorre el array de cursos y se muestra en la tabla
                        <tr key={cur.Id_Curso}>
                            <td>{cur.Nombre}</td>
                            <td>{cur.Descripcion}</td>
                            <td>{cur.Fecha_Inicio}</td>
                            <td>{cur.Fecha_Fin}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => handleEdit(cur.Id_Curso)}
                                >
                                    Editar
                                </Button>{" "}
                                <Button
                                    variant="danger"
                                    onClick={() => deleteCurso(cur.Id_Curso)}
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