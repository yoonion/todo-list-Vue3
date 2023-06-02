<template>
  <div v-for="(todo, index) in todoList" :key="todo.id" class="card mt-2">
    <div class="card-body p-2 d-flex align-items-center" style="cursor: pointer" @click="moveToPage(todo.id)">
      <div class="form-check flex-grow-1">
        <input :checked="todo.completed" @click.stop="toggleTodo(index)" class="form-check-input" type="checkbox">
        <label :class="{ todoCompleted: todo.completed }" class="form-check-label">{{ todo.subject }}</label>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" @click.stop="deleteTask(index)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  props: ['todoList'],
  emits: ['toggle-todo', 'delete-task'],
  setup(props, context) {
    const router = useRouter();

    // 완료한 todo 체크
    const toggleTodo = (index) => {
      context.emit('toggle-todo', index);
    }

    // todo 삭제
    const deleteTask = (index) => {
      context.emit('delete-task', index);
    }

    // todo 상세보기로 이동
    const moveToPage = (todoId) => {
      // router.push(`/todolist/${todoId}`);
      router.push({
        name: 'Todo',
        params: {
          id: todoId
        }
      });
    }

    return {
      toggleTodo,
      deleteTask,
      moveToPage
    }
  }
}
</script>

<style>

</style>