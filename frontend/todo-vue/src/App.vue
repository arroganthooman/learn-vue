<script>
import BaseInput from './components/BaseInput.vue';
import TodoItems from './components/TodoItems.vue';
import axios from 'axios'

export default {
  data() {
    return {
      todoMessage: "",
      // todos: [],
      // dones: []
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos
    },
    dones() {
      return this.$store.state.dones
    }
  },
  components: {
    BaseInput,
    TodoItems
  },
  methods: {
    printTodo() {
      console.log(this.todoMessage)
    },
    async fetchAllTodo() { 
      try {
        const res = await axios.get('http://127.0.0.1:3000/todo')
        console.log(res.data.data)
        this.todos = res.data.data
      } catch (err) {
        console.log(err)
        alert('error when fetching all todo')
      }
    },
    async addTodo() {
      try {
        const todoMessage = this.todoMessage
        const res = await axios.post('http://127.0.0.1:3000/todo', {todoMessage})
        this.todoMessage = ''
        this.fetchAllTodo()
      } catch (err) {
        console.log(err)
        alert('error when submit todo')
      }
    },
    async fetchAllDone() {
      try {
        const res = await axios.get('http://127.0.0.1:3000/done')
        this.dones = res.data.data
      } catch (err) {
        console.log(err)
        alert('error when get all done')
      }
    },
    async refreshFunction() {
      this.fetchAllTodo()
      this.fetchAllDone()
    }
  },
  mounted() {
    this.refreshFunction()
  }
}
</script>

<template>
  <h1 style="margin-top:70px">Simple To-Do App</h1>
  <div class="input-wrapper">
    <BaseInput style="margin-top:15px" v-model="todoMessage" />
    <button class="submit-button" @click="$event => addTodo()">Submit</button>
  </div>
  <div class="wrapper">
    <div class="on-going">
      <h2>To-Do</h2>
      <TodoItems v-for="item in todos" :todo="item.todoMessage" type="done" :todoId="item.id" :refreshFunction="refreshFunction" />
    </div>
    <div class="done">
      <h2>Done</h2>
      <TodoItems v-for="item in dones" :todo="item.todoMessage" type="delete" :todoId="item.id" :refreshFunction="refreshFunction"/>
    </div>
  </div>
</template>

<style scoped>

h1 {
  font-size: 2rem;
  color: black;
  font-weight: 600;
  text-align: center;
}
.wrapper {
  display: flex;
  justify-content: space-around;
  width: 100%; 
  margin: 30px 0 0 0;
}

.wrapper .on-going, .wrapper .done {
  width: 40%;
  border-radius: 10px;
  padding: 20px 0;
}

.wrapper .on-going {
  background-color: #6096B4;
}
.wrapper .done {
  background-color: #93BFCF;
}

.wrapper h2 {
  font-family: 'Inter';
  font-size: 2rem;
  color: white;
  text-align: center;
  padding-bottom: 30px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.submit-button {
  margin: 25px 0;
  width: 130px;
  height: 50px;
  font-family: 'Inter';
  font-size: 1rem;
  border-color: transparent;
  background-color: #BDCDD6;
}

.submit-button:hover {
  cursor: pointer;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
