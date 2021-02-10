import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:8000/'

export const store = new Vuex.Store({
  state: {
    credentials: JSON.parse(localStorage.getItem('credentials')) || null,
    filter: 'all',
    todos: [],
  },
  getters: {
    loggedIn(state) {
      return state.credentials !== null
    }
  },
  mutations: {
    logout(state) {
      state.credentials = null
    },
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        task: todo.title,
        editing: false,
      })
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id)
      state.todos.splice(index, 1)
    },
    gettodos(state, todos) {
      todos.forEach(todo => todo.editing = false)
      state.todos = todos
    },
    auth(state, credentials) {
      state.credentials = JSON.parse(credentials)
    },
  },
  actions: {
    logout(context) {
      context.commit('logout')
    },
    auth(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('/account/auth/', {
          username: credentials.username,
          password: credentials.password,
        })
          .then(response => {
            const credentials = JSON.stringify(response.data)

            localStorage.setItem('credentials', credentials)
            context.commit('auth', credentials)
            resolve(response)
            // console.log(response);
            // context.commit('addTodo', response.data)
          })
          .catch(error => {
            console.log(error.response.data)
            reject(error)
          })
        })
    },
    gettodos(context) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + context.state.credentials.token

      axios.get('/todo/list/')
        .then(response => {
          context.commit('gettodos', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addTodo(context, todo) {
      axios.post('/todo/create/', {
        task: todo.task,
      })
        .then(response => {
          console.log(response)
          // context.commit('addTodo', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteTodo(context, id) {
      axios.delete('/todo/delete/' + id+'/')
        .then(response => {
          console.log(response);
          context.commit('deleteTodo', id)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
