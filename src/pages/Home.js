import React,{Fragment, useContext, useEffect} from "react";
import {Form} from "../components/Form";
import {FirebaseContext} from "../firebase/context";
import {Loader} from "../components/Loader";
import {Todos} from "../components/Todos";

export const Home = () => {
    const {loading, todos, fetchTodos, removeTodo, clearAll, toggleChecked} = useContext(FirebaseContext)

    useEffect(() => {
        fetchTodos()
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <div className="wrapper">
                <div className="container">
                    <div className="todo">
                        <div className="title">My To-do List:</div>
                        <div className="inner-container">
                            <Form />
                            {loading
                                ? <Loader/>
                                : <Todos todos={todos}
                                         onRemove={removeTodo}
                                         clearAll={clearAll}
                                         toggleChecked={toggleChecked}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}