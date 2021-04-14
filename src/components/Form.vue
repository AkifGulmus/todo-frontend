<template>
  <div class="addItemClass">
    <form>
      <input
        id="todoInput"
        ref="todoInput"
        v-model="todo"
        @keydown.enter.prevent="addItem(todo)"
        placeholder="What to do?"
        type="text"
      />
      <button @click.prevent="addItem(todo)" type="submit" id="addButton">
        Add Item
      </button>
    </form>
  </div>
</template>

<script>
import { addItem } from "../../client.js";
export default {
  async mounted() {
    this.$refs["todoInput"].focus();
  },
  data() {
    return {
      todo: "",
    };
  },
  methods: {
    async addItem(todo) {
      await addItem(todo);
      location.reload();
    },
  },
};
</script>

<style>
.addItemClass {
  right: 0;
}
form {
  display: flex;
  margin-bottom: 2rem;
}
#todoInput {
  background-color: #d5d2d2;
  border-width: thin;
  height: 2rem;
  font-size: 20px;
  margin-right: 0.5rem;
  width: 80%;
}
input:focus {
  outline-width: 0;
}
</style>
