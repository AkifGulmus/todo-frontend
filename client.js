require("dotenv").config();
const axios = require("axios");

export async function addItem(todo) {
  return await axios.post(
    `${process.env.VUE_APP_BACKEND_BASE_URL}/todos`,
    {
      text: `${todo}`,
      done: false,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function getTodos() {
  return await axios.get(`${process.env.VUE_APP_BACKEND_BASE_URL}/todos`);
}

export async function updateTodo(todo) {
  return await axios.patch(
    `${process.env.VUE_APP_BACKEND_BASE_URL}/todos/${todo.todoID}`
  );
}

export async function deleteTodo(todo) {
  return await axios.delete(
    `${process.env.VUE_APP_BACKEND_BASE_URL}/todos/${todo.todoID}`
  );
}
