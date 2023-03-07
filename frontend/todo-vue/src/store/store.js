import { createStore } from 'vuex'
import axios from 'axios'

export const store = createStore({
    state: {
        todos:[],
        dones:[]
    },
    getters: {
        getTodos: state => {
            return state.todos
        },
        getDones: state => {
            return state.dones
        }
    },
    mutations: {
        addTodos: (state, todoMessage) => {
            const URL = "http://localhost:3000/todo"
            try {
                axios.post(URL, {todoMessage})
                .then((res) => {})
            } catch (err) {
                console.log(err)
                alert('error when submit todo')
            }
            
        }, fetchAllTodo: (state) => {
            try {
                axios.get('http://127.0.0.1:3000/todo')
                .then(res => {
                    state.todos = res.data.data
                })
              } catch (err) {
                console.log(err)
                alert('error when fetching all todo')
              }
        }, fetchAllDone: (state) => {
            try {
                axios.get('http://127.0.0.1:3000/done')
                .then(res => {
                    state.dones = res.data.data
                })
              } catch (err) {
                console.log(err)
                alert('error when get all done')
              }
        }, doneTodo: (_, todoId) => {
            try {
                axios.post('http://127.0.0.1:3000/done', {todoId})
                .then(() => {})
            } catch (err) {
                console.log(err)
                alert('error when calling done todo')
            }
        }, removeDone: (_, todoId) => {
            try {
                axios.post('http://127.0.0.1:3000/remove-done', {todoId})
                .then(() => {})
            } catch (err) {
                console.log(err)
                alert('error when calling remove todo')
            }
        }
    },
    actions: {
        addTodos: (context, payload) => {
            context.commit('addTodos', payload)
        },
        fetchAllTodo: (context) => {
            context.commit('fetchAllTodo')
        },
        fetchAllDone: context => {
            context.commit('fetchAllDone')
        },
        doneTodo: context => {
            context.commit('doneTodo')
        },
        removeDone: context => {
            context.commit('removeDone')
        },
        fetchAll: context => {
            context.commit('fetchAllTodo')
            context.commit('fetchAllDone')
        }
    }
})