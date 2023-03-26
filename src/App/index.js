import React from 'react';
import { TodoCounter } from '../TodoCounter/index';
import { TodoSearch } from '../TodoSearch/index';
import { TodoList } from '../TodoList/index';
import { TodoItem } from '../TodoItem/index';
import { CreateTodoButton } from '../CreateTodoButton/index';
// import './App.css';


const defaultTodos = [
  { text: 'estudiar', completed: true },
  { text: 'Tomar el cursso de intro a React', completed: false },
  { text: 'pasear perritos', completed: false },
  { text: 'LALALALAA', completed: true },
];


function App() {
// el estado(use) tiene dos parametros
// estado inicial de los todos
  let [todos, setTodos]  = React.useState (defaultTodos);
  // estado actual de los todos 
  const [searchValue, setSearchValue]  = React.useState ('');
// contando los todos completado
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

// esta funcion encuentra el todo al que se le da completado y renderiza la lista de TODOS con el todo marcado 
const completeTodo = (text) => {
  //encontramos el index del todo 
  const todoIndex = todos.findIndex(todo => todo.text === text);
  const newTodos = [...todos];
  newTodos[todoIndex].completed = true;
  setTodos(newTodos);
};
const deleteTodo = (text) => {
  //encontramos el index del todo 
  const todoIndex = todos.findIndex(todo => todo.text === text);
  const newTodos = [...todos];
  newTodos.splice(todoIndex, 1);
  setTodos(newTodos);
};




  return (
    <React.Fragment>
      <TodoCounter
      total={totalTodos}
      completed={completedTodos}
      />

      <TodoSearch
      searchValue = {searchValue}
      setSearchValue = {setSearchValue}
      />

      <TodoList>
        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            // creamos estas dos propiedades para llmar las funciones con las llaves del todo 
            onComplete={() => completeTodo(todo.text)}
            onDelete= {() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;