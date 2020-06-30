import React, {useReducer} from "react";
import axios from 'axios';
import {FirebaseContext} from "./context";
import {firebaseReducer} from "./reducer";
import {ADD_TODO, CLEAR_ALL, FETCH_TODOS, REMOVE_TODO, SHOW_LOADER, TOGGLE_CHECKED} from "./types";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({children}) => {
    const initialState = {
        todos: [],
        loading: false
    }
    const [state, dispatch] = useReducer(firebaseReducer, initialState)

    const showLoader = () => dispatch({type: SHOW_LOADER})

    const fetchTodos = async () => {
        showLoader()
        const res = await axios.get(`${url}/todos.json`)
        const payload = Object.keys(res.data || []).map(key => {
            return {
                ...res.data[key],
                id: key
            }
        })

        dispatch({
            type: FETCH_TODOS,
            payload
        })
    }

    const addTodo = async title => {
        const todo = {
            title,
            isChecked: false
        }

        try {
            const res = await axios.post(`${url}/todos.json`, todo)
            const payload = {
                ...todo,
                id: res.data.name
            }

            dispatch({
                type: ADD_TODO,
                payload
            })
        } catch (e) {
            throw new Error(e.message)
        }
    }

    const removeTodo = async id => {
        await axios.delete(`${url}/todos/${id}.json`)

        dispatch({
            type: REMOVE_TODO,
            payload: id
        })
    }

    const clearAll = async () => {
        await axios.delete(`${url}/todos.json`)

        dispatch({
            type: CLEAR_ALL,
            payload: []
        })
    }

    const toggleChecked = async id => {
        const res = await axios.get(`${url}/todos/${id}.json`)
        const data = {
            ...res.data,
            isChecked: !res.data.isChecked
        }

        await axios.put(`${url}/todos/${id}.json`, data)

        dispatch({
            type: TOGGLE_CHECKED,
            payload: id
        })
    }

    return (
        <FirebaseContext.Provider value={{
            showLoader, addTodo, removeTodo, fetchTodos, clearAll, toggleChecked,
            loading: state.loading,
            todos: state.todos
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}