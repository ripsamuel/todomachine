import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider (props) {
    const {
    item: todos,
    saveItem : saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', []);
  // estado actual de los Item
  const [searchValue, setSearchValue]  = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

// contando los Item completado
  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  // si no hay valor en el input muestra el listado completo
  if(!searchValue.length >= 1){
    searchedTodos = todos;
  }else {
    searchedTodos = todos.filter(todo => {
      // guardamos y volvemos minusculas las dos variables a comparar
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      //decirle al metodo filter cual va a ser el criterio de busqueda
      return todoText.includes(searchText);
    });
  }

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
    });
    saveTodos(newTodos);
  };

// esta funcion encuentra el todo al que se le da completado y renderiza la lista de Item con el todo marcado 
const completeTodo = (text) => {
  //encontramos el index del todo
  const todoIndex = todos.findIndex(todo => todo.text === text);
  const newTodos = [...todos];
  newTodos[todoIndex].completed = true;
  saveTodos(newTodos);
};
const deleteTodo = (text) => {
  //encontramos el index del todo
  const todoIndex = todos.findIndex(todo => todo.text === text);
  const newTodos = [...todos];
  newTodos.splice(todoIndex, 1);
  saveTodos(newTodos);
};

    return (
        <TodoContext.Provider value={{
          loading,
          error,
          totalTodos,
          completedTodos,
          searchValue,
          setSearchValue,
          searchedTodos,
          addTodo,
          completeTodo,
          deleteTodo,
          openModal,
          setOpenModal,
        }}>
            {props.children}
        </TodoContext.Provider>
    );
}

export {  TodoContext, TodoProvider };