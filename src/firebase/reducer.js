import {ADD_TODO, CLEAR_ALL, FETCH_TODOS, REMOVE_TODO, SHOW_LOADER, TOGGLE_CHECKED} from "./types";

const handlers = {
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [ADD_TODO]: (state, {payload}) => ({...state, todos: [...state.todos, payload]}),
    [FETCH_TODOS]: (state, {payload}) => ({...state, todos: payload, loading: false}),
    [REMOVE_TODO]: (state, {payload}) => ({...state, todos: state.todos.filter(todo => todo.id !== payload)}),
    [CLEAR_ALL]: (state, {payload}) => ({...state, todos: payload}),
    [TOGGLE_CHECKED]: (state, {payload}) => ({...state, todos: state.todos.map(todo =>
        todo.id === payload ? { ...todo, isChecked: !todo.isChecked } : todo)}),
    DEFAULT: state => state
}

export const firebaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}