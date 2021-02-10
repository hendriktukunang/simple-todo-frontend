<template>
  <div class="todo-item">
    <div class="todo-item-left">
        <div v-if="!todo.editing" @dblclick="editTodo" class="todo-item-label" >{{ todo.task }}</div>
        <input v-else class="todo-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>
    </div> <!-- end todo-item-left -->
    <div>
      <span class="remove-item" @click="removeTodo(todo.id)">
        &times;
      </span>
    </div>
  </div> <!-- end todo-item -->
</template>

<script>
export default {
  name: 'todo-item',
  props: {
    todo: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      'id': this.todo.id,
      'title': this.todo.title,
      'editing': this.todo.editing,
      'beforeEditCache': '',
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    removeTodo(id) {
      this.$store.dispatch('deleteTodo', id)
    },
    editTodo() {
      this.beforeEditCache = this.title
      this.editing = true
    },
    doneEdit() {
      if (this.title.trim() == '') {
        this.title = this.beforeEditCache
      }
      this.editing = false
      this.$store.dispatch('updateTodo', {
        'id': this.id,
        'title': this.title,
        'completed': this.completed,
        'editing': this.editing,
      })
    },
    cancelEdit() {
      this.title = this.beforeEditCache
      this.editing = false
    }
  }
}
</script>


