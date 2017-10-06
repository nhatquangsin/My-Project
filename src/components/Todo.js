import React, {Component} from 'react';
import './styles/Todo.css';

class Todo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="todo">
                <Text text="This is a work"/>
            </div>
        )
    }
}

let Text = (text) => {
    return (
        <div className="text">
            <p>text</p>
        </div>
    )
}

export default Todo;