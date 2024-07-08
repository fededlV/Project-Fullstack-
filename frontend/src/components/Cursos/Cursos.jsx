import { useEffect, useState } from "react"
import cursosServices from "../../services/cursos.service.js"
import CursosTable from "./CursosTable"
import CursosForm from "./CursosForm"
import CursosBuscar from "./CursosBuscar"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function Cursos() {
    const tituloAccionABMC = {
        A: "Agregar Curso",
        B: "Eliminar Curso",
        C: "Consulta de Cursos",
        M: "Modificar Curso",
        L: "Listado de Cursos",
    }
    const [cursos, setCursos] = useState([]); // Almacena la lista de cursos
    const [action, setAction] = useState("L"); // Identifica la acción que estamos llevando a cabo, en sentido de esa acción es lo que se muestra en pantalla
    const [curso, setCurso] = useState(null); // Utilizado para almacenar la información de un curso
    const [curEdit, setCurEdit] = useState(false); // Controla si estamos en modo de edición o no
    const [currentCurso, setCurrentCurso] = useState(null); // Almacena los datos del curso que se está editando
    const [curId, setCurId] = useState("")
    const [noEncontrado, setNoEncontrado] = useState(false); // Controla si se encontró o no el curso buscado
    const navigate = useNavigate();

    useEffect(() => {
        const getCursos = async () => {
            try {
                const data = await cursosServices.getCursos();
                setCursos(data);
            } catch (error) {
                console.error("Error al obtener los cursos: ", error);
            }
        };
        getCursos();

        // Sondeamos en el front para que consulte periódicamente el servidor a través de intervalos regulares para verificar si hay nuevos datos disponibles.
    
        // Establecer intervalo para actualizar cada 30 segundos
        const intervalId = setInterval(getCursos, 30000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId)

    }, []);

    const handleEditClick = async (cursoId) => {
        const isUpdate = window.confirm(
            `¿Estás seguro de editar el curso con ID ${cursoId}?`
        );
        if (!isUpdate) {
            return;
        }
        try {
            const curso = await buscarPorId(cursoId, "M");
            setCurrentCurso(curso);
            setCurEdit(true);
        } catch (error) {
            console.error("Error al editar el curso: ", error);
        }
    }

    const handleCancel = () => {
        setAction("L");
        setCurrentCurso(null);
    }

    const handleFormSubmit = async (data) => {
        try {
            if (curEdit) {
                const actCurso = await cursosServices.updateCurso(
                    data.Id_Curso,
                    data
                );
                setCursos((prevCursos) =>
                    prevCursos.map((cur) =>
                    cur.Id_Curso === data.Id_Curso ? actCurso : cur)
               )
               setAction("L")
            } else {
                const newCurso = await cursosServices.createCurso(data);
                setCursos((prevCursos)=> [
                    ...prevCursos,
                    newCurso
                ] )
                setAction("L");
            }
            setCurEdit(false);
            setCurrentCurso(null);
        } catch (error) {
            console.error("Error al registrar el curso: ", error);
        }
    }

    const handleAddClick = () => {
        setAction("A");
        setCurEdit(false);
        setCurrentCurso(null);
    }

    const handleBuscar = async (nomCur) => {
        try {
            const curso = await buscarPorNombre(nomCur)
            if (curso) {
                setCurso(curso);
                setNoEncontrado(false);
                setAction("C")
            } else {
                setCurso(null);
                setNoEncontrado(true);
            }
        } catch (error) {
            console.error("Error al buscar el curso: ", error);
        }
    }

    const buscarPorId = async (id, accionesABMC) => {
        try {
            const curso = await cursosServices.getCurso(id);
            console.log(id)
            setCurso(curso);
            setAction(accionesABMC);
            return curso;
        }
        catch (error) {
            console.error("Error al buscar el curso: ", error);
        }
    }

    const buscarPorNombre = async (nombre) => {
        try {
          //Busca el estudiante en el backend
          const data = await cursosServices.getCurNom(nombre);
          return data; //Devuelve el estudiante encontrado
        } catch (error) {
          console.error("Error al buscar el estudiante: ", error)
        }
      }

    const onBuscar = () => {
        setAction("C");
    }

    const onDelete = async (id) => {
        try {
            const isDelete = window.confirm(
                `¿Estás seguro de eliminar el curso con ID ${id}?`
            );
            if (isDelete) {
                await cursosServices.deleteCurso(id);
                setCursos(prevCursos => prevCursos.filter((c) => c.Id_Curso !== id
                )
                );
                setAction("L");
            } else {
                return
            }
        } catch (error) {
            console.error("Error al eliminar el curso: ", error);
            const isError = window.confirm(
                `No se puede eliminar el curso, ya que primero tiene que eliminar el material del curso, matricula del curso con ID ${id}`
              )
              if (isError) {
                return
              } else {
                return
              }
        }
    }

    const onVolver = () => {
        navigate('/gestionEscolar');
    }


    return (
        <div>
            <div>
                <h1>Gestion de Cursos</h1>
                <h3>{tituloAccionABMC[action]}</h3>
            </div>
            {action === "L" && (
                <>
                    <Button variant="success" onClick={handleAddClick}>Agregar Curso</Button>{" "}
                    <Button variant="success" onClick={onBuscar}>Consultar Curso</Button>
                    <CursosTable
                        curso={cursos}
                        handleEdit={handleEditClick}
                        deleteCurso={onDelete}
                    />
                </>
            )}
            {(action === "M" || action === "A") && (
                <CursosForm
                    curEdit={curEdit}
                    onSubmit={handleFormSubmit}
                    defaultValues={currentCurso}
                    onVolver={onVolver}
                    onCancelar={handleCancel}
                />
            )}
            {action === "C" && (
                <CursosBuscar
                    curso={curso}
                    nombre={curId}
                    setNombre={setCurId}
                    buscarCurso={handleBuscar}
                    onVolver={onVolver}
                    noEncontrado={noEncontrado}
                    handleEdit={handleEditClick}
                    deleteCurso={onDelete}
                />
            )}
        </div>
    )
}