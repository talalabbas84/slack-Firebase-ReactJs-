import React, { useState, useEffect } from 'react';
import { service } from '../../services/services';
import TodoItems from '../TodoItems/TodoItems';
import socketClient from 'socket.io-client';

import './TodoList.css';

const TodoList = () => {
  // const socket = socketClient('http://localhost:5000');
  var options = {
    rememberUpgrade: true,
    transports: ['websocket'],
    secure: true,
    rejectUnauthorized: false
  };
  const socket = socketClient('http://localhost:5000');
  // const socket = socketClient.connect('http://localhost:5000', options);
  socket.on('connection', () => {
    console.log(`I'm connected with the back-end`);
  });
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');

  useEffect(() => {
    // socket.emit('initial_data');
    // // var state_current = this;
    // socket.on('get_data', test => {
    //   console.log(test);
    // });
    loadPost();
    socket.on('post', data => {
      if (data.action === 'create') {
        addPost(data.post);
      }
    });
  }, []);

  const loadPost = () => {
    service.getItems().then(res => {
      setItems(res.data);
    });
  };

  const deleteHandler = id => {
    service.deleteItem(id).then(res => {
      const filteredItems = items.filter(item => item.id !== id);
      setItems(filteredItems);
    });
  };
  const addItem = e => {
    e.preventDefault();
    if (item !== '') {
      const data = {
        title: item,
        done: false
      };
      service.addItem(data).then(res => {
        setItem('');
        // addPost(res.data);
      });
    }
  };
  const deleteItem = id => {
    // const filteredItems = items.filter(item => item.id !== id);

    setItems(items.filter(item => item.id !== id));
  };

  const addPost = data => {
    // let item = [...items];
    // item.push(data);

    // setItems(item);
    setItems(items => [...items, data]);
  };
  return (
    <div className='todoListMain'>
      <div className='header'>
        <form onSubmit={addItem}>
          <input
            onChange={e => setItem(e.target.value)}
            value={item}
            // ref={a => (_inputElement = a)}
            placeholder='enter task'
          ></input>
          <button type='submit'>add</button>
        </form>
      </div>
      <TodoItems enteries={items} deleteHandler={deleteHandler} />
    </div>
  );
};

export default TodoList;
