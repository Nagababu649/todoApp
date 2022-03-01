import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { MdDeleteForever } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import Modal from 'react-modal';






const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });
  const [input, setInput] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [editVal, setEditVal] = useState();




  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }

  const handleChange = e => {
    setInput(e.target.value);
  };




  const handleSubmit = e => {
    e.preventDefault();

    console.log('todo text', input);
    console.log('setEdit ', edit);

    var foundIndex = todos.findIndex(x => x.id == edit);
    todos[foundIndex] = { id: edit, text: input, date: dateFormate() }

    setModalIsOpen(false)

  }

  const setModalIsOpenToTrue = (data) => {
    setInput(data.text);
    setEdit(data.id);
    setModalIsOpen(true)
    console.log('Todo', data);

    setEditVal(data)

    console.log('todos', todos);


  }

  const dateFormate = e => {

    var currentdate = new Date();
    var datetime = "Date: " + currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();
    return datetime
  }

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });

  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id}>
        {todo.text}
      </div>
      <div >
        {todo.date}
      </div>
      <div className='icons'>

        <button onClick={() => removeTodo(todo.id)}
          className='delete-icon'>Delete</button> &nbsp;

        <button
          onClick={setModalIsOpenToTrue.bind(this, todo)}

          className='edit-icon' >Edit</button>

        <Modal isOpen={modalIsOpen} className="popup">
          <button onClick={setModalIsOpenToFalse} className="close">X</button>
          <form onSubmit={handleSubmit} className='todo-form'>
            <input
              placeholder='Update your item'
              value={input}
              onChange={handleChange}
              name='text'

              className=' todo-input update'
              autocomplete="off"
            />&nbsp;&nbsp;
            <button

              className='todo-button edit' >
              Update
            </button>
          </form>
        </Modal>
      </div>
    </div>
  ));
};

export default Todo;
