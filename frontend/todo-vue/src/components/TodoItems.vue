<template>
    <div class="wrapper-todo">
        <div class="todo-message">
            {{ todo }}
        </div>
        <button @click="$event => doneTodo()" v-if="type === 'done'" class="todo-submit-button">
            <img :src="image" />
        </button>
        <button @click="$event => removeDone()" v-else="type === 'delete'" class="todo-delete-button">
            <img :src="image" />
        </button>
    </div>
</template>

<script>
import checkImage from '../assets/img/check.png'
import deleteImage from '../assets/img/deleteicon.png'
import axios from 'axios'

export default {
    props: ['todo', 'todoId', 'type', 'refreshFunction'],
    data() {
        return {
            // todo, todoId, type, handlerFunction,
            image: this.type === "done" ? checkImage : deleteImage
        }
    },
    methods: {
        async doneTodo() {
            try {
                const todoId = this.todoId
                const res = await axios.post('http://127.0.0.1:3000/done', {todoId})
                this.refreshFunction()
            } catch (err) {
                console.log(err)
                alert('error when calling done todo')
            }
        },
        async removeDone() {
            try {
                const todoId = this.todoId
                const res = await axios.post('http://127.0.0.1:3000/remove-done', {todoId})
                this.refreshFunction()
            } catch (err) {
                console.log(err)
                alert('error when calling remove todo')
            }
        }
    }
}
</script>

<style scoped>

.wrapper-todo {
    display: flex;
    width: 100%;
    padding: 0 30px;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}

.todo-message {
    background-color: white;
    font-family: "Inter";
    font-size: 1.25rem;
    color: #000;
    display: flex;
    height: 60px;
    width: 85%;
    align-items: center;
    border-radius: 10px;
    padding: 0 20px;
}

button {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border-color: transparent;
}

button:hover {
    cursor: pointer;
    background-image: linear-gradient(rgb(0 0 0/20%) 0 0);
}

button:active {
    background-image: linear-gradient(rgb(0 0 0/40%) 0 0);
}

img {
    height: 30px;
    width: 30px;
}

.todo-submit-button {
    background-color: #B8F966;
}

.todo-delete-button {
    background-color: #E50404;
}
</style>