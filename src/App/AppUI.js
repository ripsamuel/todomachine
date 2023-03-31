import React from "react";
import { TodoContext } from "../todoContext";
import { TodoCounter } from '../TodoCounter/index';
import { TodoSearch } from '../TodoSearch/index';
import { TodoList } from '../TodoList/index';
import { TodoItem } from '../TodoItem/index';
import { CreateTodoButton } from '../CreateTodoButton/index';
// import './App.css';


function AppUI () {

    return (
        <React.Fragment>
        <TodoCounter/>
        <TodoSearch />

       <TodoContext.Consumer>
       {({
        error,
        loading,
        searchedTodos,
        completeTodo,
        deleteTodo,})=>(
        <TodoList>
          {error && <p>desesperate hubo un error..</p>}
          {loading && <p>estamos cargandoo no desesperes</p>}
          {(!loading && !searchedTodos.length) &&  <p>crea tu primer TOdo </p>}


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
        </TodoList>)}
       </TodoContext.Consumer>

        <CreateTodoButton />
      </React.Fragment>
    );
}

export {AppUI};

