import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import profesoresService from "../../services/profesores.service";
import ProfesoresTable from "./ProfesoresTable";
import ProfesoresForm from "./ProfesoresForm";
import ProfesoresBuscar from "./ProfesoresBuscar";
import { useNavigate } from "react-router-dom";

export default function Profesor() {
  const tituloAccionABMC = {
    A: "Agregar Profesor",
    B: "Eliminar Profesor",
    C: "Consulta de Profesores",
    M: "Modificar Profesor",
    L: "Listado de Profesores",
  };
  const [profesores, setProfesores] = useState([]); //Almacena la lista de profesores
  const [action, setAction] = useState("L"); //Identifica la accion que estamos llevando a cabo, en sentido de esa accion es lo que se muestra en pantalla
  const [profesor, setProfesor] = useState(null); //Utilizado para almacenar la informacion de un Profesor
  const [profEdit, setProfEdit] = useState(false); //Controla si estamos en modo de edicion o no
  const [currentProfesor, setCurrentProfesor] = useState(null); //Almacena los datos del profesor que se esta editando
  const [profId, setProfId] = useState(""); //Almacena el id que se va a utilizar para la busqueda del profesor.
  const [noEncontrado, setNoEncontrado] = useState(false); //Controla si el profesor no fue encontrado
  const navigate = useNavigate();

  useEffect(() => {
    const getProfesores = async () => {
      try {
        const data = await profesoresService.getProfesores();
        setProfesores(data);
      } catch (error) {
        console.error("Error al obtener los profesores: ", error);
      }
    };
    getProfesores();
            
    // Sondeamos en el front para que consulte periódicamente el servidor a través de intervalos regulares para verificar si hay nuevos datos disponibles.

    // Establecer intervalo para actualizar cada 30 segundos
    const intervalId = setInterval(getProfesores, 30000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId)

  }, []); //Se ejecuta al montar el componente, obteniendo la lista de todos los profesores

  //Maneja la edicion de un profesor
  const handleEditClick = async (profesorId) => {
    const isUpdate = window.confirm(
      `¿Estás seguro de editar el profesor con ID ${profesorId}?`
    );
    if (!isUpdate) {
      return;
    }
    try {
      const profesor = await buscarPorId(profesorId, "M");
      setCurrentProfesor(profesor);
      setProfEdit(true);
    } catch (error) {
      console.error("Error al editar el profesor: ", error);
    }
  };

  //Maneja el cancelar la edicion de un profesor
  const handleCancel = () => {
    setAction("L");
    setCurrentProfesor(null);
  };

  //Maneja el registro o actualizacion de un profesor
  const handleFormSubmit = async (data) => {
    try {
      if (profEdit) {
        //Actualiza la informacion del profesor en el backend
        const actProfesor = await profesoresService.updateProfesor(
          data.Id_Profesor,
          data
        );
        //Actualiza el estado local con la informacion del profesor actualizada, solo si la actualizacion en el backend fue exitosa
        setProfesores((prevProfesores) =>
          prevProfesores.map((prof) =>
            prof.Id_Profesor === data.Id_Profesor ? actProfesor : prof
          )
        );
        setAction("L");
      } else {
        //Registra el profesor en el backend
        const newProfesor = await profesoresService.createProfesor(data);
        setProfesores((prevProfesores) => [
          ...prevProfesores,
          newProfesor,
        ]);
        setAction("L");
      }
      setProfEdit(false);
      setCurrentProfesor(null);
    } catch (error) {
      console.error("Error al registrar o actualizar el profesor: ", error);
    }
  };

  //Maneja el registrar un nuevo profesor, para el uso correcto de un formulario de registro
  const handleAddClick = () => {
    setAction("A");
    setCurrentProfesor(null);
    setProfEdit(false);
  };

  //Maneja la busqueda de un profesor
  const handleBuscar = async (nomProf) => {
    const data = await buscarPorNombre(nomProf);
    if (data) {
      setProfesor(data);
      setNoEncontrado(false);
      setAction("C");
    } else {
      setProfesor(null);
      setNoEncontrado(true);
    }
  };

  //Busca un profesor por su id
  const buscarPorId = async (profesor, accionABMC) => {
    try {
      //Busca el profesor en el backend
      const data = await profesoresService.getProfesor(profesor);
      console.log(profesor);
      //Actualiza el estado local con la informacion del profesor encontrado
      setProfesor(data);
      setAction(accionABMC);
      return data; //Devuelve el profesor encontrado
    } catch (error) {
      console.error("Error al buscar el profesor: ", error);
    }
  };

  //Busca un profesor por su nombre pasado como parametro de query. 
  const buscarPorNombre = async (nombre) => {
    try {
      //Busca el profesor en el backend
      const data = await profesoresService.getNomProfesor(nombre);
      return data; //Devuelve el profesor encontrado
    } catch (error) {
      console.error("Error al buscar profesor: ", error)
    }
  }

  //Actualiza la accion ABMC a "C" para mostrar el componente de busqueda de profesores
  const onBuscar = () => {
    setAction("C");
  };

  //Elimina un profesor de acuerdo al id proporcionado, Y actualiza el listado de profesores
  const onDelete = async (id) => {
    try {
      const isDelete = window.confirm(
        `¿Estás seguro de eliminar el profesor con ID ${id}?`
      );
      if (isDelete) {
        //Elimina el profesor en el backend
        await profesoresService.deleteProfesor(id);
        //Si la eliminacion en el back fue exitosa, actualiza el estado local.
        setProfesores((prevProfesores) =>
          prevProfesores.filter(
            (profesor) => profesor.Id_Profesor !== id
          )
        );
        setAction("L")
      } else {
        return;
      }
    } catch (error) {
      console.error("Error al eliminar el profesor: ", error);
      const isError = window.confirm(
        `No se puede eliminar el profesor, ya que primero tiene que eliminar la actividad extracurricular, horario, del profesor con ID ${id}`
      )
      if (isError) {
        return
      } else {
        return
      }
    }
  };

  //Actualiza la accion ABMC a "L" para mostrar el listado de profesores
  const onVolver = () => {
    navigate("/gestionEscolar");
  };

  return (
    <div>
      <div>
        <h1>Gestion de Profesores</h1>
        <h3>{tituloAccionABMC[action]}</h3>
      </div>
      {action === "L" && (
        <>
          <Button variant="success" onClick={handleAddClick}>Agregar Profesor</Button>{" "}
          <Button variant="success" onClick={onBuscar}>Consultar Profesor</Button>
          <ProfesoresTable
            profesor={profesores}
            handleEdit={handleEditClick}
            deleteProfesor={onDelete}
          ></ProfesoresTable>
        </>
      )}
      {(action === "M" || action === "A") && (
        <ProfesoresForm
          onSubmit={handleFormSubmit}
          profEdit={profEdit}
          defaultValues={currentProfesor}
          onVolver={onVolver}
          onCancelar={handleCancel}
        />
      )}
      {action === "C" && (
        <ProfesoresBuscar
          profesor={profesor}
          nombre={profId}
          setNombre={setProfId}
          buscarProfesor={handleBuscar}
          onVolver={onVolver}
          noEncontrado={noEncontrado}
          handleEdit={handleEditClick}
          deleteProfesor={onDelete}
        />
      )}
    </div>
  );
}