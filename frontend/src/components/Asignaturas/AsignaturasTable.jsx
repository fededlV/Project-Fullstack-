import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

export default function AsignaturasTable({
    asignatura,
    handleEdit,
    deleteAsignatura,
}){
    return (
        <div>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {asignatura && asignatura.map((asig, index) => ( //Se recorre el array de asignaturas y se muestra en la tabla
                        <tr key={index}>
                            <td>{asig.Nombre}</td>
                            <td>{asig.Descripcion}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => handleEdit(asig.Id_Asignatura)}
                                >
                                    Editar
                                </Button>{" "}
                                <Button
                                    variant="danger"
                                    onClick={() => deleteAsignatura(asig.Id_Asignatura)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}