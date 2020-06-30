import React, {useState, useContext} from "react";
import {FirebaseContext} from "../firebase/context";

export const Form = () => {

    const [value, setValue] = useState('');
    const firebase = useContext(FirebaseContext)

    const submitHandler = event => {
        event.preventDefault()

        if(value.trim()) {
            firebase.addTodo(value.trim()).then(() => {
                console.log('Заметка создана')
            }).catch(() => {
                console.log('Что-то не так')
            })
            setValue('')
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <input
                className="input"
                type="text"
                onChange={e => setValue(e.target.value)}
                value={value}
                placeholder="Type your task here..."
            />
        </form>
    )
}
