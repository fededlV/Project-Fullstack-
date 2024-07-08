import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import asistenciasService from "../../services/asistencias.service";
import AsistenciaTable from "./AsistenciasTable";
import AsistenciaForm from "./AsistenciasForm";
import AsistenciaBuscar from "./AsistenciasBuscar";
import { useNavigate } from "react-router-dom";

export default function Asistencia() {
  const tituloAccionABMC = {
    A: "Agregar Asistencia",
    B: "Eliminar Asistencia",
    C: "Consulta de Asistencia",
    M: "Modificar Asistencia",
    L: "Listado de Asistencias",
  };
  const [asistencias, setAsistencias] = useState([]); //Almacena la lista de asistencias
  const [action, setAction] = useState("L"); //Identifica la accion que estamos llevando a cabo, en sentido de esa accion es lo que se muestra en pantalla
  const [asistencia, setAsistencia] = useState(null); //Utilizado para almacenar la informacion de una Asistencia
  const [asisEdit, setAsisEdit] = useState(false); //Controla si estamos en modo de edicion o no
  const [currentAsistencia, setCurrentAsistencia] = useState(null); //Almacena los datos de la asistencia que se esta editando
  const [horaInicio, setHoraInicio] = useState(""); //Almacena la fecha inicio que se va a utilizar para la busqueda de la asistencia del estudiante.
  const [horaFin, setHoraFin] = useState(""); //Almacena la fecha fin que se va a utilizar para la busqueda de la asistencia del estudiante.
  const [fecha, setFecha] = useState("") //Almacena la fecha que se va a utilizar para la busqueda de la asistencia del estudiante.
  const [noEncontrado, setNoEncontrado] = useState(false); //Controla si la asistencia del estudiante no fue encontrado
  const [estudiantes, setEstudiantes] = useState([]); //Almacena la lista de estudiantes
  const [horarios, setHorarios] = useState([]); //Almacena la lista de Horarios
  const navigate = useNavigate();

  useEffect(() => {
    const getAsistencias = async () => {
      try {
        const data = await asistenciasService.getAsistencias();
        const est = await asistenciasService.getEstudiantes()
        const hor = await asistenciasService.getHorarios()
        setAsistencias(data);
        setEstudiantes(est);
        setHorarios(hor);
      } catch (error) {
        console.error("Error al obtener las asistencias: ", error);
      }
    };
    getAsistencias();

    // Sondeamos en el front para que consulte periódicamente el servidor a través de intervalos regulares para verificar si hay nuevos datos disponibles.
    
    // Establecer intervalo para actualizar cada 30 segundos
    const intervalId = setInterval(getAsistencias, 30000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId)

  }, []); //Se ejecuta al montar el componente, obteniendo la lista de todas las asistencias

  //Maneja la edicion la asistencia
  const handleEditClick = async (asistenciaId) => {
    const isUpdate = window.confirm(
      `¿Estás seguro de editar la asistencia?`
    );
    if (!isUpdate) {
      return;
    }
    try {
      const asistencia = await buscarPorId(asistenciaId, "M");
      console.log(asistencia)
      setCurrentAsistencia(asistencia);
      setAsisEdit(true);
    } catch (error) {
      console.error("Error al editar la asistencia del estudiante: ", error);
    }
  };

  //Maneja el cancelar la edicion de una asistencia
  const handleCancel = () => {
    setAction("L");
    setCurrentAsistencia(null);
  };

  //Maneja el registro o actualizacion de una asistencia
  const handleFormSubmit = async (data) => {
    try {
      if (asisEdit) {
        //Actualiza la informacion de la asistencia en el backend
        const actEstudiante = await asistenciasService.updateAsistencia(
          data.Id_Estudiante,
          data
        );
        //Actualiza el estado local con la informacion de la asistencia actualizada, solo si la actualizacion en el backend fue exitosa
        setAsistencias((prevAsistencias) =>
          prevAsistencias.map((asis) =>
            asis.Id_Estudiante === data.Id_Estudiante ? actEstudiante : asis
          )
        );
        setAction("L");
      } else {
        //Registra la asistencia en el backend
        const newAsistencia = await asistenciasService.createAsistencia(data);
        setAsistencias((prevAsistencia) => [
          ...prevAsistencia,
          newAsistencia,
        ]);
        setAction("L");
      }
      setAsisEdit(false);
      setCurrentAsistencia(null);
    } catch (error) {
      console.error("Error al registrar o actualizar la asistencia: ", error);
    }
  };

  //Maneja el registrar una nueva asistencia, para el uso correcto de un formulario de registro
  const handleAddClick = () => {
    setAction("A");
    setCurrentAsistencia(null);
    setAsisEdit(false);
  };

  //Maneja la busqueda de una asistencia segun el fecha, horaInicio y horaFin  
  const handleBuscar = async () => {
    const data = await asistenciasService.getAsistencia(fecha, horaInicio, horaFin)
    if (data) {
      setAsistencia(data);
      setNoEncontrado(false);
      setAction("C");
    } else {
      setAsistencia(null);
      setNoEncontrado(true);
    }
  };

  //Busca una asistencia segun el id, actualizando la accion ABMC que se esta llevando a cabo, de acuerda a la accion es el componente que se renderiza.
  const buscarPorId = async (asistencia, accionABMC) => {
    try {
      //Busca la asistencia en el backend
      const data = await asistenciasService.getAsistenciaId(asistencia);
      //Actualiza el estado local con la informacion de la asistencia encontrado
      setAsistencia(data);
      setAction(accionABMC);
      return data; //Devuelve la asistencia encontrado
    } catch (error) {
      console.error("Error al buscar la asistencia: ", error);
    }
  };

  //Actualiza la accion ABMC a "C" para mostrar el componente de busqueda de asistencias
  const onBuscar = () => {
    setAction("C");
  };

  //Elimina una asistencia del estudiante de acuerdo al ID de la asistencia proporcionado, Y actualiza el listado de asistencias
  const onDelete = async (id) => {
    try {
      const isDelete = window.confirm(
        `¿Estás seguro de eliminar la asistencia?`
      );
      if (isDelete) {
        //Elimina la asistencia en el backend
        await asistenciasService.deleteAsistencia(id);
        //Si la eliminacion en el back fue exitosa, actualiza el estado local.
        setAsistencias((prevAsistencias) =>
          prevAsistencias.filter(
            (asistencia) => asistencia.Id_Asistencia !== id
          )
        );
        setAction("L")
      } else {
        return;
      }
    } catch (error) {
      console.error("Error al eliminar la asistencia del estudiante: ", error);
    }
  };

  //Actualiza la accion ABMC a "L" para mostrar el listado de asistencias
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
          <Button variant="success" onClick={handleAddClick}>Agregar Asistencia</Button>{" "}
          <Button variant="success" onClick={onBuscar}>Consultar Asistencia</Button>
          <AsistenciaTable
            asistencia={asistencias}
            estudiante={estudiantes}
            horario={horarios}
            handleEdit={handleEditClick}
            deleteAsistencia={onDelete}
          ></AsistenciaTable>
        </>
      )}
      {(action === "M" || action === "A") && (
        <AsistenciaForm
          onSubmit={handleFormSubmit}
          asisEdit={asisEdit}
          defaultValues={currentAsistencia}
          onVolver={onVolver}
          onCancelar={handleCancel}
          estudiante={estudiantes}
          horario={horarios}
        />
      )}
      {action === "C" && (
        <AsistenciaBuscar
          asistencia={asistencia}
          estudiante={estudiantes}
          horario={horarios}
          horaInicio={horaInicio}
          setHoraInicio={setHoraInicio}
          horaFin={horaFin}
          setHoraFin={setHoraFin}
          fecha={fecha}
          setFecha={setFecha}
          buscarAsistencia={handleBuscar}
          onVolver={onVolver}
          noEncontrado={noEncontrado}
          handleEdit={handleEditClick}
          deleteAsistencia={onDelete}
        />
      )}
    </div>
  );
}