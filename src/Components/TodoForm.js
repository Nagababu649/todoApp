import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [count, setCount] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newCount = count + 1
    setCount(newCount)

    props.onSubmit({
      id: newCount,
      text: input,
      date: dateFormate()
    });

    setInput('');
  };

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



  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input update'
            autocomplete="off"
          />&nbsp;&nbsp;
          <button onClick={handleSubmit} className='todo-input update'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add Your Task Here'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
            autocomplete="off"
          />&nbsp;&nbsp;
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
