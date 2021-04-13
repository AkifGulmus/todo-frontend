<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.todoID">
        <item
          :todo="todo"
          @todoStatusUpdated="updateTodo"
          @todoDeleted="deleteTodo"
        ></item>
      </li>
    </ul>
  </div>
</template>

<script>
import Item from "./Item.vue";
import * as client from "../../client";
export default {
  data() {
    return {
      todos: [],
    };
  },

  components: { Item },
  async created() {
    var vm = this;
    var response = await client.getTodos();
    response.data.forEach((item) => {
      vm.todos.push(item);
    });
  },

  methods: {
    async updateTodo(todo) {
      client.updateTodo(todo);
    },
    async deleteTodo(todo) {
      var deleteResponse = await client.deleteTodo(todo);
      if (deleteResponse.status == 202) {
        this.todos.splice(
          this.todos.findIndex((i) => i.todoID === todo.todoID),
          1
        );
      }
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
