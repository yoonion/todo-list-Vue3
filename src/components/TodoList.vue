<template>
  <div v-for="(todo, index) in todoList" :key="todo.id" class="card mt-2">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input :value="todo.completed" @change="toggleTodo(index)" class="form-check-input" type="checkbox">
          <label :class="{ todoCompleted: todo.completed }" class="form-check-label">{{ todo.subject }}</label>
        </div>
        <div>
            <button class="btn btn-danger btn-sm" @click="deleteTask(index)">Delete</button>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['todoList'],
  emits: ['toggle-todo', 'delete-task'],
  setup(props, context) {
    const toggleTodo = (index) => {
      context.emit('toggle-todo', index);
    }

    const deleteTask = (index) => {
      context.emit('delete-task', index);
    }

    return {
      toggleTodo,
      deleteTask
    }
  }
}
</script>

<style>

</style>