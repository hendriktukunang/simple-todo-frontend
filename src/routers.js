import Todo from './views/Todo/TodoList'
import Login from './views/Login'
import Logout from './views/Logout'

const routes = [
  {
    path: '/',
    name: 'todo',
    component: Todo,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    props: true,
    meta: {
      requiresVisitor: true,
    }
  },
    {
    path: '/logout',
    name: 'logout',
    component: Logout
  }
]

export default routes
