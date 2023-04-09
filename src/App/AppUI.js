import React from "react";
import { TodoContext } from "../TodoContext";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { TodoForm } from "../TodoForm";
import { CreateTodoButton } from "../CreateTodoButton";
import { Modal } from "../Modal";

// import './App.css';
 

function AppUI () {
  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
  
  } = React.useContext(TodoContext);
    return (
        <React.Fragment>
        <TodoCounter/>
        <TodoSearch />

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
        </TodoList>
        
        {!!openModal && (
          <Modal>
              <TodoForm>
                
              </TodoForm>
          </Modal>
        )}
      

        <CreateTodoButton
        setOpenModal={setOpenModal}/>
      </React.Fragment>
    );
}

export {AppUI};

