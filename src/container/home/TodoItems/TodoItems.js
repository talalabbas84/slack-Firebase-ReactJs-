import React from 'react';

const TodoItems = ({ enteries, deleteHandler }) => {
  const listItems = enteries.map(entry => {
    return (
      <li onClick={() => deleteHandler(entry.id)} key={entry.id}>
        {entry.title}
      </li>
    );
  });

  return <ul className='theList'>{listItems}</ul>;
};

export default TodoItems;
