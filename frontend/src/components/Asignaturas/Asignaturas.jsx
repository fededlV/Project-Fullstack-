import { useEffect, useState } from "react"
import asignaturasServices from "../../services/asignaturas.service"
import AsignaturasTable from "./AsignaturasTable"
import AsignaturasForm from "./AsignaturasForm"
import AsignaturasBuscar from "./AsignaturasBuscar"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function Asignaturas() {
    const tituloAccionABMC = {
        A: "Agregar Asignatura",
        B: "Eliminar Asignatura",
        C: "Consulta de Asignaturas",
        M: "Modificar Asignatura",
        L: "Listado de Asignaturas",
    }
    const [asignaturas, setAsignaturas] = useState([]); // Almacena la lista de asignaturas
    const [action, setAction] = useState("L"); // Identifica la acción que estamos llevando a cabo, en sentido de esa acción es lo que se muestra en pantalla
    const [asignatura, setAsignatura] = useState(null); // Utilizado para almacenar la información de una asignatura
    const [asigEdit, setAsigEdit] = useState(false); // Controla si estamos en modo de edición o no
    const [currentAsignatura, setCurrentAsignatura] = useState(null); // Almacena los datos de la asignatura que se está editando
    const [asig, setAsig] = useState(""); // Almacena el id de la asignatura a buscar
    const [noEncontrado, setNoEncontrado] = useState(false); // Controla si se encontró o no la asignatura buscada
    const navigate = useNavigate();

    useEffect(() => {
        const getAsignaturas = async () => {
            try {
                const data = await asignaturasServices.getAsignaturas();
                setAsignaturas(data);
            } catch (error) {
                console.error("Error al obtener las asignaturas: ", error);
            }
        };
        getAsignaturas();

        // Sondeamos en el front para que consulte periódicamente el servidor a través de intervalos regulares para verificar si hay nuevos datos disponibles.
        
        // Establecer intervalo para actualizar cada 30 segundos
        const intervalId = setInterval(getAsignaturas, 30000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId)

    }, []);

    const handleEditClick = async (asignaturaId) => {
        const isUpdate = window.confirm(
            `¿Estás seguro de editar la asignatura con ID ${asignaturaId}?`
        );
        if (!isUpdate) {
            return;
        }
        try {
            const asignatura = await buscarPorId(asignaturaId, "M");
            setCurrentAsignatura(asignatura);
            setAsigEdit(true);
        } catch (error) {
            console.error("Error al editar la asignatura: ", error);
        }
    }

    const handleCancel = () => {
        setAction("L");
        setCurrentAsignatura(null);
    }

    const handleFormSubmit = async (data) => {
        try {
            if (asigEdit) {
                const asignatura = await asignaturasServices.updateAsignatura(data);
                const index = asignaturas.findIndex((asig) => asig.Id_Asignatura === asignatura.Id_Asignatura);
                asignaturas[index] = asignatura;
                setAsignaturas([...asignaturas]);
                setAction("L");
            } else {
                const asignatura = await asignaturasServices.createAsignatura(data);
                setAsignaturas([...asignaturas, asignatura]);
                setAction("L");
            }
            setAsigEdit(false);
            setCurrentAsignatura(null);
        } catch (error) {
            console.error("Error al guardar la asignatura: ", error);
        }
    }

    const handleAddClick = () => {
        setAction("A");
        setAsigEdit(false);
        setCurrentAsignatura(null);
    }

    const handleBuscar = async (nombre) => {
        try {
            const asignatura = await asignaturasServices.getAsigNom(nombre);
            if (asignatura) {
                setAsignatura(asignatura);
                setNoEncontrado(false);
                setAction("C")
            } else {
                setAsignatura(null);
                setNoEncontrado(true);
            }
        } catch (error) {
            console.error("Error al buscar la asignatura: ", error);
        }
    }

    const buscarPorId = async (id, accionesABMC) => {
        try {
            const asignatura = await asignaturasServices.getAsignatura(id);
            setAsignatura(asignatura);
            setAction(accionesABMC);
            return asignatura;
        }
        catch (error) {
            console.error("Error al buscar la asignatura: ", error);
        }
    }

    const onBuscar = () => {
        setAction("C");
    }

    const onDelete = async (id) => {
        try {
            const isDelete = window.confirm(
                `¿Estás seguro de eliminar la asignatura con ID ${id}?`
            );
            if (isDelete) {
                await asignaturasServices.deleteAsignatura(id);
                setAsignaturas(prevAsignaturas => prevAsignaturas.filter(asig => asig.Id_Asignatura !== id
                )
                );
                setAction("L");
            } else {
                return
            }
        } catch (error) {
            console.error("Error al eliminar la asignatura: ", error);
            const isError = window.confirm(
                `No se puede eliminar la asignatura, ya que primero tiene que eliminar los horarios y calificaciones de de la asignatura con ID ${id}`
              )
              if (isError) {
                return
              } else {
                return
              }
        }
    }

    const onVolver = () => {
        navigate("/gestionEscolar");
    }

    return (
        <div>
            <div>
                <h1>Gestion de Asignaturas</h1>
                <h3>{tituloAccionABMC[action]}</h3>
            </div>
            {action === "L" && (
                <>
                    <Button variant="success" onClick={handleAddClick}>Agregar Asignatura</Button>{" "}
                    <Button variant="success" onClick={onBuscar}>Consultar Asignatura</Button>
                    <AsignaturasTable
                        asignatura={asignaturas}
                        handleEdit={handleEditClick}
                        deleteAsignatura={onDelete}
                    />
                </>
            )}
            {(action === "M" || action === "A") && (
                <AsignaturasForm
                    asigEdit={asigEdit}
                    onSubmit={handleFormSubmit}
                    defaultValues={currentAsignatura}
                    onVolver={onVolver}
                    onCancelar={handleCancel}
                />
            )}
            {action === "C" && (
                <AsignaturasBuscar
                    asignatura={asignatura}
                    nombre={asig}
                    setNombre={setAsig}
                    buscarAsignatura={handleBuscar}
                    onVolver={onVolver}
                    noEncontrado={noEncontrado}
                    handleEdit={handleEditClick}
                    deleteAsignatura={onDelete}
                />
            )}
        </div>
    )
}