<template>
  <div class="container">

    <h1>To-Do List</h1>
    <input class="form-control" type="text" v-model="searchText" placeholder="Search">
    <hr>
    <TodoSimpleForm @add-task="addTask" />
    <div v-if="!filteredTodos.length">todo가 없습니다.</div>
    <TodoList :todoList="filteredTodos" @toggle-todo="toggleTodo" @delete-task="deleteTask" />

  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: {
    TodoSimpleForm,
    TodoList
  },
  setup() {
    
    const todoList = ref([]);

    // 할 일 추가 - TodoSimpleForm 컴포넌트에서 받아온 데이터 추가 시킨다
    const addTask = (todo) => {
      todoList.value.push(todo);
    };

    // 할 일 삭제
    const deleteTask = (index) => {
      todoList.value.splice(index, 1);
    };

    // 완료한 일 체크 - TodoList 컴포넌트에서 받아온 데이터로 수정한다. > 자식 컴포넌트 자체에서 데이터 조작하면 안 됨
    const toggleTodo = (index) => {
      todoList.value[index].completed = !todoList.value[index].completed;
    }

    const searchText = ref('');
    const filteredTodos = computed(() => {
      if(searchText.value) {
        return todoList.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        });
      }

      return todoList.value;
    });

    return {
      todoList,
      addTask,
      deleteTask,
      toggleTodo,
      searchText,
      filteredTodos
    }
  }
}
</script>

<style>
  .todoCompleted { color: gray; text-decoration: line-through; }
</style>