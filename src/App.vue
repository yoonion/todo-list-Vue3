<template>
  <div class="container">

    <h1>To-Do List</h1>
    <input class="form-control" type="text" v-model="searchText" placeholder="Search">
    <hr>
    <TodoSimpleForm @add-task="addTask" />
    <div style="color: red">{{ error }}</div>
    <div v-if="!filteredTodos.length">할 일이 없습니다.</div>
    <TodoList :todoList="filteredTodos" @toggle-todo="toggleTodo" @delete-task="deleteTask" />
    <br>

    <!-- Pagination -->
    <nav>
      <ul class="pagination" style="justify-content: center;">
        <li v-if="currentPage !== 1" class="page-item"><a class="page-link" @click="getTodoList(currentPage - 1)">Previous</a></li>
        <li v-for="page in totalPage" :key="page" class="page-item" :class="currentPage === page ? 'active' : ''"><a class="page-link" @click="getTodoList(page)">{{ page }}</a></li>
        <li v-if="currentPage !== totalPage" class="page-item"><a class="page-link" @click="getTodoList(currentPage + 1)">Next</a></li>
      </ul>
    </nav>

  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';

export default {
  components: {
    TodoSimpleForm,
    TodoList
  },
  setup() {
    
    const todoList = ref([]);
    const error = ref(''); // 에러 메시지 출력용
    const totalTodoCount = ref(0); // todo 총 개수
    const limit = 7; // 페이지당 보여줄 todo 개수
    const currentPage = ref(1);

    // 페이지 총 개수
    const totalPage = computed(() => {
      return Math.ceil(totalTodoCount.value/limit);
    });

    // json-server (db.json)에서 todoList 가져오기
    const getTodoList = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(`http://localhost:3000/todoList?_page=${page}&_limit=${limit}`);
        totalTodoCount.value = res.headers['x-total-count']; // todo 총 개수
        todoList.value = res.data; // 가져온 todo데이터를 넣어준다.
      }
      catch (err) {
        console.log(err);
        error.value = '!! ERROR: getTodoList error. !!'
      }
    }
    getTodoList(); // todoList 불러오기

    // 할 일 추가 - TodoSimpleForm 컴포넌트에서 받아온 데이터 추가 시킨다
    const addTask = async (todo) => {
      // 데이터베이스(json-server)에 저장
      try {
        const res = await axios.post('http://localhost:3000/todoList', {
            subject: todo.subject,
            completed: todo.completed
        });
        todoList.value.push(res.data);
      }
      catch (err) {
        console.log(err);
        error.value = '!! ERROR: addTask error. !!'
      }
    };

    // 할 일 삭제
    const deleteTask = async (index) => {
      const id = todoList.value[index].id; // 할 일 id
      try {
        await axios.delete('http://localhost:3000/todoList/' + id);
        todoList.value.splice(index, 1);
      }
      catch (err) {
        console.log(err);
        error.value = '!! ERROR: deleteTask error. !!'
      }
    };

    // 완료한 일 체크 - TodoList 컴포넌트에서 받아온 데이터로 수정한다. > 자식 컴포넌트 자체에서 데이터 조작하면 안 됨
    const toggleTodo = async (index) => {
      const id = todoList.value[index].id; // 할 일 id
      try {
        await axios.patch('http://localhost:3000/todoList/' + id, {
          completed: !todoList.value[index].completed
        });
        todoList.value[index].completed = !todoList.value[index].completed;
      }
      catch (err) {
        console.log(err);
        error.value = '!! ERROR: toggleTodo error. !!'
      }
    }

    // todo 검색
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
      filteredTodos,
      error,
      totalPage,
      currentPage,
      getTodoList
    }
  }
}
</script>

<style>
  a {cursor: pointer;}
  .todoCompleted { color: gray; text-decoration: line-through; }
</style>