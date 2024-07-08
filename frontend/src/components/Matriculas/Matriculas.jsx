import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import matriculasService from "../../services/matriculas.service";
import cursosService from "../../services/cursos.service";
import estudianteService from "../../services/estudiantes.service";
import MatriculaForm from "./MatriculasForm";
import MatriculaTable from "./MatriculasTable";
import MatriculaBuscar from "./MatriculasBuscar";
import { useNavigate } from "react-router-dom";

export default function Matricula() {
  const tituloAccionABMC = {
    A: "Agregar Matricula",
    B: "Eliminar Matricula",
    C: "Consulta de Matricula",
    M: "Modificar Matricula",
    L: "Listado de Matriculas",
  };
  const [matriculas, setMatriculas] = useState([]); // Almacena la lista de matriculados
  const [alumnos, setAlumnos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [action, setAction] = useState("L"); // Identifica la accion que estamos llevando a cabo
  const [matricula, setMatricula] = useState(null); // Utilizado para almacenar la informacion de una Matricula
  const [matriEdit, setMatriEdit] = useState(false); // Controla si estamos en modo de edicion o no
  const [currentMatricula, setCurrentMatricula] = useState(null); // Almacena los datos de la matricula que se esta editando
  const [nombre, setNombre] = useState(""); // Almacena el nombre que se va a utilizar para la busqueda de la matricula del curso.
  const [noEncontrado, setNoEncontrado] = useState(false); // Controla si la matricula del estudiante no fue encontrada
  const navigate = useNavigate();

  useEffect(() => {
    const getMatriculas = async () => {
      try {
        const data = await matriculasService.getMatriculas();
        const cursoData = await cursosService.getCursos(); // Obtener la lista de cursos
        const alumnosData = await estudianteService.getEstudiantes(); // Obtener la lista de alumnos
        setMatriculas(data);
        setCursos(cursoData);
        setAlumnos(alumnosData);
      } catch (error) {
        console.error("Error al obtener las matriculas: ", error);
      }
    };
    getMatriculas();
        
    // Sondeamos en el front para que consulte periódicamente el servidor a través de intervalos regulares para verificar si hay nuevos datos disponibles.

    // Establecer intervalo para actualizar cada 30 segundos
    const intervalId = setInterval(getMatriculas, 30000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId)

  }, []); // Se ejecuta al montar el componente, obteniendo la lista de todas las matriculas

  // Maneja la edicion de una matricula
  const handleEditClick = async (id) => {
    const isUpdate = window.confirm(
      `¿Estás seguro de editar las matriculas del alumno?`
    );
    if (!isUpdate) {
      return;
    }
    try {
      const matricula = await buscarPorId(id, "M");
      setCurrentMatricula(matricula);
      setMatriEdit(true);
    } catch (error) {
      console.error("Error al editar la matricula del estudiante: ", error);
    }
  };

  // Maneja el cancelar la edicion de una matricula
  const handleCancel = () => {
    setAction("L");
    setCurrentMatricula(null);
  };

  // Maneja el registro o actualizacion de una matricula
  const handleFormSubmit = async (data) => {
    try {
      if (matriEdit) {
        // Actualiza la informacion de la matricula en el backend
        const actMatricula = await matriculasService.updateMatricula(
          data.Id_Matricula,
          data
        );
        // Actualiza el estado local con la informacion de la matricula actualizada
        setMatriculas((prevMatriculas) =>
          prevMatriculas.map((matri) =>
            matri.Id_Matricula === data.Id_Matricula ? actMatricula : matri
          )
        );
        setAction("L");
      } else {
        // Registra la matricula en el backend
        const newMatricula = await matriculasService.createMatricula(data);
        setMatriculas((prevMatricula) => [...prevMatricula, newMatricula]);
        setAction("L");
      }
      setMatriEdit(false);
      setCurrentMatricula(null);
    } catch (error) {
      console.error("Error al registrar o actualizar la matricula: ", error);
    }
  };

  // Maneja el registrar una nueva matricula
  const handleAddClick = () => {
    setAction("A");
    setCurrentMatricula(null);
    setMatriEdit(false);
  };

  // Maneja la busqueda de una matricula segun el id del estudiante
  const handleBuscar = async () => {
    try {
      const estudianteEcontrado = await matriculasService.getMatriculaEst(nombre)
        if (estudianteEcontrado) {
          setMatricula(estudianteEcontrado);
          setNoEncontrado(false);
          setAction("C");
        } else {
          setMatricula(null);
          setNoEncontrado(true);
        }
    } catch (error) {
      console.error("Error al buscar la matricula del estudiante: ", error);
    }
  };

  // Busca una matricula segun el id 
  const buscarPorId = async (matricula, accionABMC) => {
    try {
      // Busca la matricula en el backend
      const data = await matriculasService.getMatricula(matricula);
      console.log(matricula);
      // Actualiza el estado local con la informacion de la matricula encontrada
      setMatricula(data);
      setAction(accionABMC);
      return data; // Devuelve la matricula encontrada
    } catch (error) {
      console.error("Error al buscar la matricula: ", error);
    }
  };

  // Actualiza la accion ABMC a "C" para mostrar el componente de busqueda de matriculas
  const onBuscar = () => {
    setAction("C");
  };

  // Elimina una matricula del estudiante segun el id de la matricula proporcionado
  const onDelete = async (id) => {
    try {
      const isDelete = window.confirm(
        `¿Estás seguro de eliminar la matricula?`
      );
      if (isDelete) {
        // Elimina la matricula en el backend
        await matriculasService.deleteMatricula(id);
        // Actualiza el estado local
        setMatriculas((prevMatriculas) =>
          prevMatriculas.filter((matricula) => matricula.Id_Matricula !== id)
        );
        setAction("L")
      } else {
        return;
      }
    } catch (error) {
      console.error("Error al eliminar la matricula del alumno: ", error);
    }
  };

  // Actualiza la accion ABMC a "L" para mostrar el listado de matriculas
  const onVolver = () => {
    navigate("/gestionEscolar");
  };

  // Función para obtener el nombre del curso a partir del ID
  const getNombreCurso = (idCurso) => {
    const curso = cursos.find((curso) => curso.Id_Curso === idCurso);
    return curso ? curso.Nombre : "Curso no encontrado";
  };

  // Función para obtener el nombre del alumno a partir del ID
  const getNombreAlumno = (idEstudiante) => {
    const alumno = alumnos.find(
      (alumno) => alumno.Id_Estudiante === idEstudiante
    );
    return alumno
      ? alumno.Nombre + " " + alumno.Apellido
      : "Alumno no encontrado";
  };

  return (
    <div>
      <div>
        <h1>Gestion de Cursos</h1>
        <h3>{tituloAccionABMC[action]}</h3>
      </div>
      {action === "L" && (
        <>
          <Button variant="success" onClick={handleAddClick}>
            Agregar Matricula
          </Button>{" "}
          <Button variant="success" onClick={onBuscar}>
            Consultar Matricula
          </Button>
          <MatriculaTable
            matricula={matriculas}
            handleEdit={handleEditClick}
            deleteMatricula={onDelete}
            getNombreAlumno={getNombreAlumno}
            getNombreCurso={getNombreCurso} // Pasamos la función getNombreCurso
          ></MatriculaTable>
        </>
      )}
      {(action === "M" || action === "A") && (
        <MatriculaForm
          onSubmit={handleFormSubmit}
          matriEdit={matriEdit}
          defaultValues={currentMatricula}
          onVolver={onVolver}
          onCancelar={handleCancel}
          curso={cursos}
          estudiante={alumnos}
        />
      )}
      {action === "C" && (
        <MatriculaBuscar
          matricula={matricula}
          nombre={nombre}
          setNombre={setNombre}
          curso={cursos}
          estudiante={alumnos}
          buscarMatricula={handleBuscar}
          onVolver={onVolver}
          noEncontrado={noEncontrado}
          handleEdit={handleEditClick}
          deleteMatricula={onDelete}
        />
      )}
    </div>
  );
}
