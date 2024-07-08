import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import actExtracurricularesService from "../../services/actExtracurricular.service.js";
import profesoresService from '../../services/profesores.service.js';
import ActExtracurricularesBuscar from "./ActExtracurricularesBuscar";
import ActExtracurricularesForm from "./ActExtracurricularesForm";
import ActExtracurricularesTable from "./ActExtracurricularesTable";
import { useNavigate } from "react-router-dom"


export default function ActExtracurriculares() {
    const tituloAccionABMC = {
        A: "Agregar Actividad Extracurricular",
        B: "Eliminar Actividad Extracurricular",
        C: "Consulta de Actividad Extracurricular",
        M: "Modificar Actividad Extracurricular",
        L: "Listado de Actividades Extracurriculares",
    };
    
    const [actExtracurriculares, setActExtracurriculares] = useState([]);
    const [actExtracurricular, setActExtracurricular] = useState(null);
    const [action, setAction] = useState("L");
    const [currentActExtracurricular, setCurrentActExtracurricular] = useState(null);
    const [actExtracurricularEdit, setActExtracurricularEdit] = useState(false);
    const [profesores, setProfesores] = useState([]);
    const [nombre, setNombre] = useState("");
    const [noEncontrado, setNoEncontrado] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getActExt = async () => {
            try {
                const data = await actExtracurricularesService.getActExtracurriculares()
                const prof = await profesoresService.getProfesores()
                
                setActExtracurriculares(data);
                setProfesores(prof);
            } catch (error) {
                console.error("Error al obtener los datos: ", error);
            }
        };
        getActExt();

        // Sondeamos en el front para que consulte periódicamente el servidor a través de intervalos regulares para verificar si hay nuevos datos disponibles.

        // Establecer intervalo para actualizar cada 30 segundos
        const intervalId = setInterval(getActExt, 30000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId)
        
    }, []);

    const handleEditClick = async (idActExtracurricular) => {
        const isUpdate = window.confirm(
            `¿Estás seguro de editar la actividad con ID ${idActExtracurricular}?`
          );
          if (!isUpdate) {
            return;
          }
          try {
            const actividad = await buscarPorId(idActExtracurricular, "M");
            setCurrentActExtracurricular(actividad);
            setActExtracurricularEdit(true);
          } catch (error) {
            console.error("Error al editar la actividad: ", error);
          }
        };

    const handleCancel = () => {
        setAction("L");
        setCurrentActExtracurricular(null);
    };

    const handleFormSubmit = async (data) => {
        try {
            if (actExtracurricularEdit) {
                const updatedActExtracurricular = await actExtracurricularesService.updateActExtracurricular(data.Id_Actividad, data);
                setActExtracurriculares(prev => prev.map(act => act.Id_Actividad === data.Id_Actividad ? updatedActExtracurricular : act));
            } else {
                const newActExtracurricular = await actExtracurricularesService.createActExtracurricular(data);
                setActExtracurriculares(prev => [...prev, newActExtracurricular]);
            }
            setAction("L");
            setActExtracurricularEdit(false);
            setCurrentActExtracurricular(null);
        } catch (error) {
            console.error("Error al registrar o actualizar la actividad extracurricular: ", error);
        }
    };

    const handleAddClick = () => {
        setAction("A");
        setActExtracurricularEdit(false);
        setCurrentActExtracurricular(null);
    };

    const handleBuscar = async (nombre) => {
        try {
            console.log("Buscando actividad con nombre:", nombre); // Verificar el nombre de búsqueda
            const actividadEncontrada = await actExtracurricularesService.getActExtraNombre(nombre);
            if (actividadEncontrada) {
                setNoEncontrado(false);
                setActExtracurricular(actividadEncontrada);
                setAction("C");
            } else {
                setActExtracurricular(null);
                setNoEncontrado(true);
            }
        } catch (error) {
            console.error("Error al buscar la actividad extracurricular:", error);
        }
    };
    

    const buscarPorId = async (id, accion) => {
        try {
            const data = await actExtracurricularesService.getActExtracurricular(id);
            setCurrentActExtracurricular(data);
            setAction(accion);
            return data;
        } catch (error) {
            console.error("Error al buscar la actividad extracurricular: ", error);
        }
    };

    const onDelete = async (id) => {
        try {
            const isDelete = window.confirm(
              `¿Estás seguro de eliminar la actividad con ID ${id}?`
            );
            if (isDelete) {
                await actExtracurricularesService.deleteActExtracurricular(id);
                setActExtracurriculares((prevActividad) =>
                prevActividad.filter((actividad) => actividad.Id_Actividad !== id));
                setAction("L")
            } else {
              return;
            }
          } catch (error) {
            console.error("Error al eliminar la actividad extracurricular: ", error)
          }
        };

    const onVolver = () => {
        navigate("/gestionEscolar");
    }

    const getNombreProfesor = (idProf) => {
        const profe = profesores.find(profe => profe.Id_Profesor === idProf);
        return profe ? `${profe.Nombre} ${profe.Apellido}` : "Profesor no encontrado";
    };

    return (
        <div>
            <div>
                <h1>Administración de Actividades Extracurriculares</h1>
                <h3>{tituloAccionABMC[action]}</h3>
            </div>
            {action === "L" && (
                <>
                    <Button variant="success" onClick={handleAddClick}>Agregar Actividad Extracurricular</Button>{" "}
                    <Button variant="success" onClick={() => setAction("C")}>Consultar Actividad Extracurricular</Button>
                    <ActExtracurricularesTable 
                        actExtracurricular={actExtracurriculares} 
                        handleEdit={handleEditClick} 
                        deleteActExtracurricular={onDelete} 
                        getNombreProfesor={getNombreProfesor}
                    />
                </>
            )}
            {(action === "M" || action === "A") && (
                <ActExtracurricularesForm 
                    actExtracurricularEdit={actExtracurricularEdit}
                    onSubmit={handleFormSubmit}
                    defaultValues={currentActExtracurricular}
                    onVolver={onVolver}
                    onCancelar={handleCancel}
                    profesor={profesores}
                />
            )}
            {action === "C" && (
                <ActExtracurricularesBuscar 
                    actExtracurricular={actExtracurricular}
                    noEncontrado={noEncontrado}
                    nombre={nombre}
                    setNombre={setNombre}
                    buscarActExtracurricular={handleBuscar}
                    onVolver={onVolver}
                    handleEdit={handleEditClick}
                    deleteActExtracurricular={onDelete}
                    profesor={profesores}
                />
            )}
        </div>
    );
}


