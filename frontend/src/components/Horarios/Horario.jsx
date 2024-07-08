import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import horarioService from "../../services/horarios.service";
import asignaturaService from "../../services/asignaturas.service";
import cursoService from "../../services/cursos.service";
import profesoresService from "../../services/profesores.service";
import HorarioForm from "./HorarioForm";
import HorarioTable from "./HorarioTable";
import HorarioBuscar from "./HorarioBuscar";
import { useNavigate } from "react-router-dom";

export default function Horario() {
  const tituloAccionABMC = {
    A: "Agregar horario",
    B: "Eliminar horario",
    C: "Listado de horario",
    M: "Modificar horario",
    L: "Listado de horario",
  };

  const [horarios, setHorarios] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [profes, setProfes] = useState([]);
  const [action, setAction] = useState("L");
  const [horario, setHorario] = useState(null);
  const [horEdit, setHorEdit] = useState(false);
  const [currentHorario, setCurrentHorario] = useState(null);
  const [nombre, setNombre] = useState("");
  const [noEncontrado, setNoEncontrado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getHorarios = async () => {
      try {
        const data = await horarioService.getHorarios();
        const asig = await asignaturaService.getAsignaturas();
        const cur = await cursoService.getCursos();
        const prof = await profesoresService.getProfesores();
        setHorarios(data);
        setCursos(cur);
        setAsignaturas(asig);
        setProfes(prof);
      } catch (error) {
        console.error("Error al obtener los horarios: ", error);
      }
    };
    getHorarios();

    // Sondeamos en el front para que consulte periódicamente el servidor a través de intervalos regulares para verificar si hay nuevos datos disponibles.

    // Establecer intervalo para actualizar cada 30 segundos
    const intervalId = setInterval(getHorarios, 30000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId)

  }, []);

  const handleEditClick = async (asignaturaID) => {
    const isUpdate = window.confirm(
      `¿Estás seguro de editar el horario de la asignatura con ID ${asignaturaID}?`
    );
    if (!isUpdate) {
      return;
    }
    try {
      const horario = await buscarPorId(asignaturaID, "M");
      setCurrentHorario(horario);
      setHorEdit(true);
    } catch (error) {
      console.error("Error al editar el horario: ", error);
    }
  };

  const handleCancel = () => {
    setAction("L");
    setCurrentHorario(null);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (horEdit) {
        const actHorario = await horarioService.updateHorario(
          data.Id_Asignatura,
          data
        );
        setHorarios((prevHorarios) =>
          prevHorarios.map((hor) =>
            hor.Id_Asignatura === data.Id_Asignatura ? actHorario : hor
          )
        );
        setAction("L");
      } else {
        const newHorario = await horarioService.createHorario(data);
        setHorarios((prevHorario) => [...prevHorario, newHorario]);
        setAction("L");
      }
      setHorEdit(false);
      setCurrentHorario(null);
    } catch (error) {
      console.error("Error al registrar o actualizar Horario: ", error);
    }
  };

  const handleAddClick = () => {
    setAction("A");
    setCurrentHorario(null);
    setHorEdit(false);
  };

  const handleBuscar = async (dia) => {
    try {
      const horario = await horarioService.getHorarioDia(dia);
      if (horario) {
        setHorario(horario);
        setNoEncontrado(false);
        setAction("C");
      } else {
        setHorario(null);
        setNoEncontrado(true);
      }
    } catch (error) {
      console.error("Error al buscar el horario de la asignatura ", error);
    }
  };

  const buscarPorId = async (horario, accionABMC) => {
    try {
      const data = await horarioService.getHorario(horario);
      console.log(horario);
      setHorario(data);
      setAction(accionABMC);
      return data;
    } catch (error) {
      console.error("Error al buscar el horario: ", error);
    }
  };

  const onBuscar = () => {
    setAction("C");
  };

  const onDelete = async (id) => {
    try {
      const isDelete = window.confirm(
        `¿Estás seguro de eliminar el horario con ID ${id}?`
      );
      if (isDelete) {
        await horarioService.deleteHorario(id);
        setHorarios((prevHorarios) =>
          prevHorarios.filter((horario) => horario.Id_Asignatura !== id)
        );
        setAction("L")
      } else {
        return;
      }
    } catch (error) {
      console.error("Error al eliminar el horario de la asignatura: ", error);
      const isError = window.confirm(
        `No se puede eliminar el horario, ya que primero tiene que eliminar la asistencia que esta asociada al horario con ID ${id}`
      )
      if (isError) {
        return
      } else {
        return
      }
    }
  };

  const onVolver = () => {
    navigate("/gestionEscolar");
  };

  const getNombreCurso = (idCurso) => {
    const curso = cursos.find((curso) => curso.Id_Curso === idCurso);
    return curso ? curso.Nombre : "Curso no encontrado";
  };

  const getNombreAsignatura = (idAsig) => {
    const asignatura = asignaturas.find(
      (asignatura) => asignatura.Id_Asignatura === idAsig
    );
    return asignatura ? asignatura.Nombre : "Asignatura no encontrada";
  };

  const getNombreProfesor = (idProf) => {
    const profe = profes.find((profe) => profe.Id_Profesor === idProf);
    return profe
      ? `${profe.Nombre} ${profe.Apellido}`
      : "Profesor no encontrado";
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
            Agregar Horario
          </Button>{" "}
          <Button variant="success" onClick={onBuscar}>
            Consultar Horario
          </Button>
          <HorarioTable
            horario={horarios}
            handleEdit={handleEditClick}
            deleteHorario={onDelete}
            getNombreAsignatura={getNombreAsignatura}
            getNombreCurso={getNombreCurso}
            getNombreProfesor={getNombreProfesor}
          />
        </>
      )}
      {(action === "M" || action === "A") && (
        <HorarioForm
          onSubmit={handleFormSubmit}
          horEdit={horEdit}
          defaultValues={currentHorario}
          onVolver={onVolver}
          onCancelar={handleCancel}
          asignatura={asignaturas}
          curso={cursos}
          profesor={profes}
        />
      )}
      {action === "C" && (
        <HorarioBuscar
          horario={horario}
          nombre={nombre}
          setNombre={setNombre}
          curso={cursos}
          asignatura={asignaturas}
          profesor={profes}
          buscarHorario={handleBuscar}
          onVolver={onVolver}
          noEncontrado={noEncontrado}
          handleEdit={handleEditClick}
          deleteHorario={onDelete}
        />
      )}
    </div>
  );
}
