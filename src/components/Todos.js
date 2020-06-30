import React from "react";

export const Todos = ({todos, onRemove, clearAll, toggleChecked}) => {

    const todoList = todos.length
        ? todos.map(todo => {
            let className = 'li-item'
            if (todo.isChecked) {
                className += ' checked';
            }
            return (
                <li className={className} key={todo.id}>
                    <span onClick={() => toggleChecked(todo.id)}>{todo.title}</span>
                    <button className='remove-btn' onClick={() => onRemove(todo.id)}>&times;</button>
                </li>
            )
        })
        : null

    return (
        <div>
            <ul className="ul-item">{todoList}</ul>
            {todos.length > 0 && <button className="btn" onClick={clearAll}>Clear all</button>}
        </div>
    )
}

