import React from "react";
import { TodoContext } from '../TodoContext';
import './TodoForm.css';


function TodoForm () {
    // Creamos un estado para nuestro nuevo TODO
    const [newTodoValue, setNewTodoValue]= React.useState ('');
     // Desestructuramos las funciones que necesitamos para añadir un TODO y cerrar nuestro modal
    const {
        addTodo,
        setOpenModal,
    } = React.useContext(TodoContext);
// Creamos una función para actualizar el estado de nuestro nuevo TODO
    const onChange = (event) => {
        setNewTodoValue(event.target.value);
    };
// Funcion para cerar el modal
    const onCancel = () => {
        setOpenModal(false);
    };
    // Función para agregar nuestro nuevo TODO
    const onSubmit  = (event) => {
        event.prevent.default();
            // Utilizamos nuestra función para añadir nuestro TODO

        addTodo(newTodoValue);
        setOpenModal(false);
        //Reiniciamos el formulario 
        setNewTodoValue('')

    };

    return (
        <form onSubmit={onSubmit}>
            <label>Escribe tu TODO</label>
            <textarea
            value = {newTodoValue}
            onChange = {onChange}
            placeholder="ingresa tu todo "
            />
            
            <div>
            <button
                className="TodoForm-button TodoForm-button--cancel"
                type="button"
                onClick={onCancel}
                >
                cancelar
            </button>
            <button
                className="TodoForm-button TodoForm-button--add"
                type="submit"
            >
                añadir
            </button>
        </div>
        </form>
    );
}

export { TodoForm };