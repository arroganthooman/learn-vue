import { createStore } from 'vuex'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export const store = createStore({
    state: {
        todos:[],
        dones:[],
        archives:[]
    },
    getters: {
        getTodos: state => {
            return state.todos
        },
        getDones: state => {
            return state.dones
        },
        getArchives: state => {
            return state.archives
        }
    },
    mutations: {
        refreshTodo: (state, todos) => {
            state.todos = todos
        }, 
        refreshDone: (state, dones) => {
            state.dones = dones
        },
        refreshArchive: (state, archives) => {
            state.archives = archives
        }
    },
    actions: {
        addTodos: ({dispatch}, todoMessage) => {
            const URL = `${BACKEND_URL}/todo`
            try {
                axios.post(URL, {todoMessage})
                .then((res) => {
                    console.log("addtodo", res)
                    dispatch('refresh')
                })
            } catch (err) {
                console.log(err)
                alert('error when submit todo')
            }
        },
        doneTodo: ({dispatch}, todoId) => {
            try {
                axios.post(`${BACKEND_URL}/done`, {todoId})
                .then((_) => {
                    dispatch('refresh')
                })
            } catch (err) {
                console.log(err)
                alert('error when calling done todo')
            }
        },
        removeDone: ({dispatch}, todoId) => {
            try {
                axios.post(`${BACKEND_URL}/remove-done`, {todoId})
                .then((_) => {
                    dispatch('refresh')
                })
            } catch (err) {
                console.log(err)
                alert('error when calling remove todo')
            }
        },
        fetchAllTodo: (context) => {
            try {
                axios.get(`${BACKEND_URL}/todo`)
                .then(res => {
                    console.log("fetching all todo", res.data.data)
                    context.commit('refreshTodo', res.data.data)
                })
            } catch (err) {
                console.log(err)
                alert('error when fetching all todo')
            }
        },
        fetchAllDone: (context) => {
            try {
                axios.get(`${BACKEND_URL}/done`)
                .then(res => {
                    console.log("fetch all done", res)
                    context.commit('refreshDone', res.data.data)
                })
            } catch (err) {
                console.log(err)
                alert('error when get all done')
            }
        },
        fetchArchived: (context) => {
            try {
                axios.get(`${BACKEND_URL}/archive`)
                .then(res => {
                    context.commit('refreshArchive', res.data.data)
                })
            } catch (err) {
                console.log(err)
                alert('error when get archived')
            }
        },
        refresh: ({dispatch}) => {
            dispatch("fetchAllTodo")
            dispatch("fetchAllDone")
        }
    }
})