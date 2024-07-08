import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import estudiantesService from "../../services/estudiantes.service";
import EstudianteTable from "./EstudianteTable";
import EstudianteForm from "./EstudianteForm";
import EstudianteBuscar from "./EstudianteBuscar";
import { useNavigate } from "react-router-dom";

export default function Estudiante() {
  const tituloAccionABMC = {
    A: "Agregar Estudiante",
    B: "Eliminar Estudiante",
    C: "Consulta de Estudiantes",
    M: "Modificar Estudiante",
    L: "Listado de Estudiantes",
  };
  const [estudiantes, setEstudiantes] = useState([]); //Almacena la lista de estudiantes
  const [action, setAction] = useState("L"); //Identifica la accion que estamos llevando a cabo, en sentido de esa accion es lo que se muestra en pantalla
  const [estudiante, setEstudiante] = useState(null); //Utilizado para almacenar la informacion de un estudiante
  const [estEdit, setEstEdit] = useState(false); //Controla si estamos en modo de edicion o no
  const [currentEstudiante, setCurrentEstudiante] = useState(null); //Almacena los datos del estudiante que se esta editando
  const [nombre, setNombre] = useState(""); //Almacena el id que se va a utilizar para la busqueda del estudiante.
  const [noEncontrado, setNoEncontrado] = useState(false); //Controla si el estudiante no fue encontrado
  const navigate = useNavigate();

  useEffect(() => {
    const getEstudiantes = async () => {
      try {
        const data = await estudiantesService.getEstudiantes();
        setEstudiantes(data);
      } catch (error) {
        console.error("Error al obtener los estudiantes: ", error);
      }
    };
    getEstudiantes();

    // Sondeamos en el front para que consulte periódicamente el servidor a través de intervalos regulares para verificar si hay nuevos datos disponibles.

    // Establecer intervalo para actualizar cada 30 segundos
    const intervalId = setInterval(getEstudiantes, 30000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId)

  }, []); //Se ejecuta al montar el componente, obteniendo la lista de todos los estudiantes

  //Maneja la edicion de un estudiante
  const handleEditClick = async (estudianteId) => {
    const isUpdate = window.confirm(
      `¿Estás seguro de editar el estudiante con ID ${estudianteId}?`
    );
    if (!isUpdate) {
      return;
    }
    try {
      const estudiante = await buscarPorId(estudianteId, "M");
      setCurrentEstudiante(estudiante);
      setEstEdit(true);
    } catch (error) {
      console.error("Error al editar el estudiante: ", error);
    }
  };

  //Maneja el cancelar la edicion de un estudiante
  const handleCancel = () => {
    setAction("L");
    setCurrentEstudiante(null);
  };

  //Maneja el registro o actualizacion de un estudiante
  const handleFormSubmit = async (data) => {
    try {
      if (estEdit) {
        //Actualiza la informacion del estudiante en el backend
        const actEstudiante = await estudiantesService.updateEstudiante(
          data.Id_Estudiante,
          data
        );
        //Actualiza el estado local con la informacion del estudiante actualizada, solo si la actualizacion en el backend fue exitosa
        setEstudiantes((prevEstudiantes) =>
          prevEstudiantes.map((est) =>
            est.Id_Estudiante === data.Id_Estudiante ? actEstudiante : est
          )
        );
        setAction("L");
      } else {
        //Registra el estudiante en el backend
        const newEstudiante = await estudiantesService.createEstudiante(data);
        setEstudiantes((prevEstudiantes) => [
          ...prevEstudiantes,
          newEstudiante,
        ]);
        setAction("L");
      }
      setEstEdit(false);
      setCurrentEstudiante(null);
    } catch (error) {
      console.error("Error al registrar o actualizar el estudiante: ", error);
    }
  };

  //Maneja el registrar un nuevo estudiante, para el uso correcto de un formulario de registro
  const handleAddClick = () => {
    setAction("A");
    setCurrentEstudiante(null);
    setEstEdit(false);
  };

  //Maneja la busqueda de un estudiante
  const handleBuscar = async (nomEst) => {
    const data = await buscarPorNombre(nomEst);
    if (data) {
      setEstudiante(data);
      setNoEncontrado(false);
      setAction("C");
    } else {
      setEstudiante(null);
      setNoEncontrado(true);
    }
  };

  //Busca un estudiante por su id, actualizando la accion ABMC que se esta llevando a cabo, de acuerda a la accion es el componente que se renderiza.
  const buscarPorId = async (estudiante, accionABMC) => {
    try {
      //Busca el estudiante en el backend
      const data = await estudiantesService.getEstudiante(estudiante);
      console.log(estudiante);
      //Actualiza el estado local con la informacion del estudiante encontrado
      setEstudiante(data);
      setAction(accionABMC);
      return data; //Devuelve el estudiante encontrado
    } catch (error) {
      console.error("Error al buscar el estudiante: ", error);
    }
  };

  //Busca un estudiante por su nombre pasado como parametro de query. 
  const buscarPorNombre = async (nombre) => {
    try {
      //Busca el estudiante en el backend
      const data = await estudiantesService.getNomEstudiante(nombre);
      return data; //Devuelve el estudiante encontrado
    } catch (error) {
      console.error("Error al buscar el estudiante: ", error)
    }
  }

  //Actualiza la accion ABMC a "C" para mostrar el componente de busqueda de estudiantes
  const onBuscar = () => {
    setAction("C");
  };

  //Elimina un estudiante de acuerdo al id proporcionado, Y actualiza el listado de estudiantes
  const onDelete = async (id) => {
    try {
      const isDelete = window.confirm(
        `¿Estás seguro de eliminar el estudiante con ID ${id}?`
      );
      if (isDelete) {
        //Elimina el estudiante en el backend
        await estudiantesService.deleteEstudiante(id);
        //Si la eliminacion en el back fue exitosa, actualiza el estado local.
        setEstudiantes((prevEstudiantes) =>
          prevEstudiantes.filter(
            (estudiante) => estudiante.Id_Estudiante !== id
          )
        );
      } else {
        return;
      }
    } catch (error) {
      const isError = window.confirm(
        `No se puede eliminar el estudiante, ya que primero tiene que eliminar la asistencia, horario, calificacion y matricula del estudiante con ID ${id}`
      )
      if (isError) {
        return
      } else {
        return
      }
    }
  };

  //Actualiza la accion ABMC a "L" para mostrar el listado de estudiantes
  const onVolver = () => {
    navigate("/gestionEscolar");
  };

  return (
    <div>
      <div>
        <h1>Gestion de Estudiantes</h1>
        <h3>{tituloAccionABMC[action]}</h3>
      </div>
      {action === "L" && (
        <>
          <Button variant="success" onClick={handleAddClick}>Agregar Estudiante</Button>{" "}
          <Button variant="success" onClick={onBuscar}>Consultar Estudiante</Button>
          <EstudianteTable
            estudiante={estudiantes}
            handleEdit={handleEditClick}
            deleteEstudiante={onDelete}
          ></EstudianteTable>
        </>
      )}
      {(action === "M" || action === "A") && (
        <EstudianteForm
          onSubmit={handleFormSubmit}
          estEdit={estEdit}
          defaultValues={currentEstudiante}
          onVolver={onVolver}
          onCancelar={handleCancel}
        />
      )}
      {action === "C" && (
        <EstudianteBuscar
          estudiante={estudiante}
          nombre={nombre}
          setNombre={setNombre}
          buscarEstudiante={handleBuscar}
          onVolver={onVolver}
          noEncontrado={noEncontrado}
          handleEdit={handleEditClick}
          deleteEstudiante={onDelete}
        />
      )}
    </div>
  );
}
