
import React from 'react'
import NotFound from './NotFound';
import './TodoDetail.scss'
import { connect } from 'react-redux';
import { updateTodo } from '../store/actions';

class TodoDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ...this.props.todo }
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps);
        if (prevProps.todo !== this.props.todo) {
            this.setState({...this.props.todo})
        }
    }

    handleChange = ({ target }) => {
        const value = target.name === 'completed' ? target.checked : target.value
        this.setState({ [target.name]: value })
    }

    submit = () => {
        this.props.onSubmited(this.state);
        this.props.navigate('/');
    }

    render() {

        if (!this.state.id) return <NotFound />
        return (
            <div className="TodoDetail">
                <h2>Editar la tarea {this.props.id}</h2>
                <input
                    type="text"
                    name="text"
                    value={this.state.text}
                    onChange={this.handleChange}
                />
                <label htmlFor="completed">
                    Completada:
                    <input
                        type="checkbox"
                        name="completed"
                        value={this.state.completed}
                        checked={this.state.completed}
                        onChange={this.handleChange}
                    />
                </label>

                <button onClick={this.submit}>Guardar</button>
                <button onClick={() => this.props.navigate('/')}>Cancelar</button>
            </div>
        )
    }
}

export default connect(
    (state, props) => {
        return ({ todo: state.todos.find(todo => todo.id === props.id) })
    },
    dispatch => ({ onSubmited: updateTodo(dispatch)})
)(TodoDetail);

