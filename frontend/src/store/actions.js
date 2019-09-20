import Axios from 'axios';

const API_URL = 'http://localhost:3001';

export const loadTodos = dispatch => async () => {
  const { data } = await Axios.get(API_URL + '/todos');


  dispatch({
    type: 'LOAD_TODOS',
    payload: data.todos,
  });
};

export const addTodo = dispatch => async (text) => {
  const { data } = await Axios.post(API_URL + '/todos', {
      text: text,
      completed:false
  });

  dispatch({
    type: 'LOAD_TODOS',
    payload: data.todos,
  });
};

export const completeTodo = dispatch => async (todo) => {
  todo.completed = !todo.completed;
  const { data } = await Axios.put(API_URL + '/todos', todo);

  dispatch({
    type: 'LOAD_TODOS',
    payload: data.todos,
  });
};

export const updateTodo = dispatch => async (todo) => {
  const { data } = await Axios.put(API_URL + '/todos', todo);
  dispatch({
    type: 'LOAD_TODOS',
    payload: data.todos,
  });
};

export const deleteTodo = dispatch => async (id) => {
  const { data } = await Axios.delete(API_URL + '/todos/' + id);

  dispatch({
    type: 'DEL_TODOS',
    payload: data.todos
  });
};