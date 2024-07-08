import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import materialesService from '../../services/materiales.service'
import cursosService from '../../services/cursos.service'
import MaterialForm from './MaterialesForm'
import MaterialTable from './MaterialesTable'
import MaterialBuscar from './MaterialesBuscar'
import { useNavigate } from "react-router-dom";

export default function Material() {
  const tituloAccionABMC = {
    A: "Agregar Material",
    B: "Eliminar Material",
    C: "Consulta de Material",
    M: "Modificar Material",
    L: "Listado de Materiales",
  };
  const [materiales, setMateriales] = useState([]); //Almacena la lista de asistencias
  const [cursos, setCursos] = useState([]);
  const [action, setAction] = useState("L"); //Identifica la accion que estamos llevando a cabo, en sentido de esa accion es lo que se muestra en pantalla
  const [material, setMaterial] = useState(null); //Utilizado para almacenar la informacion de una Material
  const [matEdit, setMatEdit] = useState(false); //Controla si estamos en modo de edicion o no
  const [currentMaterial, setCurrentMaterial] = useState(null); //Almacena los datos de la asistencia que se esta editando
  const [desc, setDesc] = useState(""); //Almacena el id que se va a utilizar para la busqueda de la asistencia del curso.
  const [noEncontrado, setNoEncontrado] = useState(false); //Controla si la asistencia del estudiante no fue encontrado
  const navigate = useNavigate();

  useEffect(() => {
    const getMateriales = async () => {
      try {
        const data = await materialesService.getMateriales();
        const cursoData = await cursosService.getCursos(); // Obtener la lista de cursos
        setMateriales(data);
        setCursos(cursoData)
      } catch (error) {
        console.error("Error al obtener los materiales: ", error);
      }
    };
    getMateriales();
    
    // Sondeamos en el front para que consulte periódicamente el servidor a través de intervalos regulares para verificar si hay nuevos datos disponibles.

    // Establecer intervalo para actualizar cada 30 segundos
    const intervalId = setInterval(getMateriales, 30000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId)

  }, []); //Se ejecuta al montar el componente, obteniendo la lista de todas las asistencias

  //Maneja la edicion de un material
  const handleEditClick = async (id) => {
    const isUpdate = window.confirm(
      `¿Estás seguro de editar los materiales del curso?`);
    if (!isUpdate) {
      return;
    }
    try {
      const material = await buscarPorId(id, "M");
      setCurrentMaterial(material);
      setMatEdit(true);
    } catch (error) {
      console.error("Error al editar el material del curso: ", error);
    }
  };

  //Maneja el cancelar la edicion de un material
  const handleCancel = () => {
    setAction("L");
    setCurrentMaterial(null);
  };

  //Maneja el registro o actualizacion de un material
  const handleFormSubmit = async (data) => {
    try {
      if (matEdit) {
        //Actualiza la informacion del material en el backend
        const actMat = await materialesService.updateMaterial(
          data.Id_Material,
          data
        );
        //Actualiza el estado local con la informacion del material actualizada, solo si la actualizacion en el backend fue exitosa
        setMateriales((prevMateriales) =>
          prevMateriales.map((mat) =>
            mat.Id_Material === data.Id_Material ? actMat : mat
          )
        );
        setAction("L");
      } else {
        //Registra el material en el backend
        const newMaterial = await materialesService.createMaterial(data);
        setMateriales((prevMaterial) => [
          ...prevMaterial,
          newMaterial,
        ]);
        setAction("L");
      }
      setMatEdit(false);
      setCurrentMaterial(null);
    } catch (error) {
      console.error("Error al registrar o actualizar el material: ", error);
    }
  };

  //Maneja el registrar un nuevo material, para el uso correcto de un formulario de registro
  const handleAddClick = () => {
    setAction("A");
    setCurrentMaterial(null);
    setMatEdit(false);
  };

  //Maneja la busqueda de un material por descripcion 
  const handleBuscar = async (desc) => {
    const data = await buscarPorDesc(desc);
    console.log(data);
    if (data) {
      setMaterial(data);
      setNoEncontrado(false);
      setAction("C");
    } else {
      setMaterial(null);
      setNoEncontrado(true);
    }
  };

  //Busca un material segun el id, actualizando la accion ABMC que se esta llevando a cabo, de acuerda a la accion es el componente que se renderiza.
  const buscarPorId = async (id, accionABMC) => {
    try {
      //Busca el material en el backend
      const data = await materialesService.getMaterial(id);
      //Actualiza el estado local con la informacion del material encontrado
      setMaterial(data);
      setAction(accionABMC);
      return data; //Devuelve el material encontrado
    } catch (error) {
      console.error("Error al buscar el material: ", error);
    }
  };

  const buscarPorDesc = async (desc) => {
    try {
      //Busca el material en el backend
      const data = await materialesService.getDescMaterial(desc);
      return data; //Devuelve el material encontrado
    } catch (error) {
      console.error("Error al buscar el material: ", error);
    }
  }

  //Actualiza la accion ABMC a "C" para mostrar el componente de busqueda de materiales
  const onBuscar = () => {
    setAction("C");
  };

  //Elimina un material del estudiante de acuerdo al id proporcionado, Y actualiza el listado de materiales
  const onDelete = async (id) => {
    try {
      const isDelete = window.confirm(
        `¿Estás seguro de eliminar el material del curso?`
      );
      if (isDelete) {
        //Elimina el material en el backend
        await materialesService.deleteMaterial(id);
        //Si la eliminacion en el back fue exitosa, actualiza el estado local.
        setMateriales((prevMateriales) =>
          prevMateriales.filter(
            (material) => material.Id_Material !== id
          )
        );
        setAction("L")
      } else {
        return;
      }
    } catch (error) {
      console.error("Error al eliminar el material del curso: ", error);
    }
  };

  //Actualiza la accion ABMC a "L" para mostrar el listado de materiales
  const onVolver = () => {
    navigate("/gestionEscolar");
  };

  // Función para obtener el nombre del curso a partir del ID
  const getNombreCurso = (idCurso) => {
    const curso = cursos.find(curso => curso.Id_Curso === idCurso);
    return curso ? curso.Nombre : "Curso no encontrado";
  };

  return (
    <div>
      <div>
        <h1>Gestion de Material de Cursos</h1>
        <h3>{tituloAccionABMC[action]}</h3>
      </div>
      {action === "L" && (
        <>
          <Button variant="success" onClick={handleAddClick}>Agregar Material</Button>{" "}
          <Button variant="success" onClick={onBuscar}>Consultar Material</Button>
          <MaterialTable
            material={materiales}
            handleEdit={handleEditClick}
            deleteMaterial={onDelete}
            getNombreCurso={getNombreCurso} // Pasamos la función getNombreCurso
          ></MaterialTable>
        </>
      )}
      {(action === "M" || action === "A") && (
        <MaterialForm
          onSubmit={handleFormSubmit}
          matEdit={matEdit}
          defaultValues={currentMaterial}
          onVolver={onVolver}
          onCancelar={handleCancel}
          curso={cursos}
        />
      )}
      {action === "C" && (
        <MaterialBuscar
          material={material}
          desc={desc}
          setDesc={setDesc}
          buscarMaterial={handleBuscar}
          onVolver={onVolver}
          noEncontrado={noEncontrado}
          handleEdit={handleEditClick}
          deleteMaterial={onDelete}
        />
      )}
    </div>
  );
}