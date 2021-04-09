<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.text">
        <single-item
          :todo="todo"
          @todo-updated="updateTodo"
          @todo-deleted="deleteTodo"
        ></single-item>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import SingleItem from "./SingleItem.vue";
export default {
  data() {
    return {
      todos: [],
    };
  },

  components: { SingleItem },
  async created() {
    this.getTodos();
  },

  methods: {
    async getTodos() {
      var vm = this;
      await axios
        .get(`${process.env.VUE_APP_BACKEND_BASE_URL}/todo-items`)
        .then(function(response) {
          response.data.forEach((item) => {
            vm.todos.push(item);
          });
        });
    },
    async updateTodo(todoToUpdate) {
      await axios.patch(
        `${process.env.VUE_APP_BACKEND_BASE_URL}/todo-items/${todoToUpdate.todoID}`
      );
    },
    async deleteTodo(todoToDelete) {
      for (var i = 0; i < this.todos.length; i++) {
        if (
          JSON.parse(JSON.stringify(this.todos[i].text)) === todoToDelete.text
        ) {
          this.todos.splice(i, 1);
        }
      }
      await axios.delete(
        `${process.env.VUE_APP_BACKEND_BASE_URL}/todo-items/${todoToDelete.todoID}`
      );
    },
  },
};
</script>

<style>
ul {
  display: flex;
  flex-direction: column;

  padding: 0;
}
li {
  list-style-type: none;
  margin: 0 0 2rem 0;
}
</style>
