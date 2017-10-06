import React, { Component } from 'react';
import './styles/List.css';
import Todo from './Todo';

class List extends Component {


    render() {
        return (
            <div className="container">
                <div className="input">
                    <input className="inputbox" />
                    <button className="button" />
                </div>
                <Todo />
                <Todo />
            </div>
        )
    }
}

let Todos = [
    { text: 'Walk the dog' }
]

export default List;