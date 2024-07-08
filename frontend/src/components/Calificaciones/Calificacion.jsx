import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import calificacionService from "../../services/calificaciones.service";
import CalificacionForm from "./CalificacionForm";
import CalificacionTable from "./CalificacionTable";
import CalificacionBuscar from "./CalificacionBuscar";
import { useNavigate } from "react-router-dom";


export default function Calificacion() {
  const tituloAccionABMC = {
    A: "Agregar calificación",
    B: "Eliminar calificación",
    C: "Consulta de calificaciones",
    M: "Modificar calificación",
    L: "Listado de calificaciones",
  };

  const [calificaciones, setCalificaciones] = useState([]);
  const [action, setAction] = useState("L");
  const [calificacion, setCalificacion] = useState(null);
  const [calEdit, setCalEdit] = useState(false);
  const [currentCalificacion, setCurrentCalificacion] = useState(null);
  const [noEncontrado, setNoEncontrado] = useState(false);
  const [estudiantes, setEstudiantes] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const getCalificaciones = async () => {
      try {
        const calificacionesData = await calificacionService.getCalificaciones();
        setCalificaciones(calificacionesData);

        const estudiantesData = await calificacionService.getEstudiantes();
        setEstudiantes(estudiantesData);

        const asignaturasData = await calificacionService.getAsignaturas();
        setAsignaturas(asignaturasData);

      } catch (error) {
        console.error("Error al obtener datos: ", error);
      }
    };

    getCalificaciones();

    const interval = setInterval(getCalificaciones, 30000); // Sondeamos en el front para que consulte periódicamente el servidor a través de intervalos regulares para verificar si hay nuevos datos disponibles.

    return () => clearInterval(interval);
  }, []);

  const handleEditClick = async (calificacionId) => {
    const isUpdate = window.confirm(
      `¿Estás seguro de editar la calificación con ID ${calificacionId}?`
    );
    if (!isUpdate) {
      return;
    }
    try {
      const calificacion = await buscarPorId(calificacionId, "M");
      console.log(calificacion)
      setCurrentCalificacion(calificacion);
      setCalEdit(true);
    } catch (error) {
      console.error("Error al editar la calificación: ", error);
    }
  };

  const buscarPorId = async (calificacion, accionABMC) => {
    try {
      const data = await calificacionService.getCalificacion(calificacion);
      setCalificacion(data);
      setAction(accionABMC);
      return data;
    } catch (error) {
      console.error("Error al buscar la calificación: ", error);
    }
  };

  const handleCancel = () => {
    setAction("L");
    setCurrentCalificacion(null);
  };

  const handleAddClick = () => {
    setAction("A");
    setCurrentCalificacion(null);
    setCalEdit(false);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (calEdit) {
        const actEstudiante = await calificacionService.updateCalificacion(
          data.Id_Calificacion,
          data
        );
        setEstudiantes((prevCalificaciones) =>
          prevCalificaciones.map((cal) =>
            cal.Id_Calificacion === data.Id_Calificacion ? actEstudiante : cal
          )
        );
        setAction("L");
      } else {
        const newCalificacion = await calificacionService.createCalificacion(
          data
        );
        setCalificaciones((prevCalificaciones) => [
          ...prevCalificaciones,
          newCalificacion,
        ]);
        setAction("L");
      }
      setCalEdit(false);
      setCurrentCalificacion(null);
    } catch (error) {
      console.error("Error al registrar o actualizar la calificación: ", error);
    }
  };

  const handleBuscar = async () => {
    try {
      const calificacion = await calificacionService.getCalificacionEstudiante(
        nombre, apellido);
      if (calificacion) {
        setCalificacion(calificacion);
        setNoEncontrado(false);
        setAction("C");
      } else {
        setCalificacion(null);
        setNoEncontrado(true);
      }
    } catch (error) {
      console.error("Error al buscar la calificación: ", error);
    }
  };

  const onDelete = async (id) => {
    try {
      const isDelete = window.confirm(
        `¿Estás seguro de eliminar la calificación con ID ${id}?`
      );
      if (isDelete) {
        await calificacionService.deleteCalificacion(id);
        setCalificaciones((prevCalificaciones) =>
          prevCalificaciones.filter(
            (calificacion) => calificacion.Id_Calificacion !== id
          )
        );
        setAction("L");
      }
    } catch (error) {
      console.error("Error al eliminar la calificación: ", error);
    }
  };

  const onVolver = () => {
    navigate("/gestionEscolar");
  };

  const onBuscar = () => {
    setAction("C");
  };

  return (
    <div>
      <div>
        <h1>Gestion de Calificaciones</h1>
        <h3>{tituloAccionABMC[action]}</h3>
      </div>
      {action === "L" && (
        <>
          <Button variant="success" onClick={handleAddClick}>
            Registrar Calificación
          </Button>{" "}
          <Button variant="success" onClick={onBuscar}>
            Buscar Calificación
          </Button>
          <CalificacionTable
            calificacion={calificaciones}
            handleEdit={handleEditClick}
            deleteCalificacion={onDelete}
            asignatura={asignaturas}
            estudiante={estudiantes}
          />
        </>
      )}
      {(action === "M" || action === "A") && (
        <CalificacionForm
          onSubmit={handleFormSubmit}
          calEdit={calEdit}
          defaultValues={currentCalificacion}
          onCancelar={handleCancel}
          onVolver={onVolver}
          estudiantes={estudiantes}
          asignaturas={asignaturas}
        />
      )}
      {action === "C" && (
        <CalificacionBuscar
          calificacion={calificacion}
          noEncontrado={noEncontrado}
          nombre={nombre}
          setNombre={setNombre}
          apellido = {apellido}
          setApellido = {setApellido}
          estudiante={estudiantes}
          asignatura={asignaturas}
          buscarCalificacion={handleBuscar}
          onVolver={onVolver}
          handleEdit={handleEditClick}
          deleteCalificacion={onDelete}
        />
      )}
    </div>
  );
};


