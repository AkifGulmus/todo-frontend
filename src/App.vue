<template>
  <div id="app">
    <div class="layout">
      <todo-form />
      <list />
    </div>
  </div>
</template>

<script>
import TodoForm from "./components/Form";
import List from "./components/List";

export default {
  name: "App",
  components: {
    List,
    TodoForm,
  },
  metaInfo: {
    title: "Default Title",
  },
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
}

.layout {
  padding-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 1rem 0 1rem;
}

#app {
  min-height: 100%;
  min-width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  background: #b79891;
  background: -webkit-linear-gradient(to right, #94716b, #b79891);
  background: linear-gradient(to right, #94716b, #b79891);
}
</style>
