<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h1>To-Do List</h1>
      <button class="btn btn-primary" @click="moveToCreatePage">Create Todo</button>
    </div>

    <!-- Search bar -->
    <input class="form-control" type="text" @keyup.enter="searchTodo" v-model="searchText" placeholder="Search">
    <hr>

    <div style="color: red">{{ error }}</div>
    <div v-if="!todoList.length">할 일이 없습니다.</div>
    <TodoList :todoList="todoList" @toggle-todo="toggleTodo" @delete-task="deleteTask" />
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
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
</template>

<script>
import { ref, computed, watch } from 'vue';
import TodoList from '@/components/TodoList.vue';
import Toast from '@/components/Toast.vue';
import axios from 'axios';
import { useToast } from '@/composables/toast';
import { useRouter } from 'vue-router';

export default {
  components: {
    TodoList,
    Toast
  },
  setup() {
    
    const router = useRouter();
    const todoList = ref([]);
    const error = ref(''); // 에러 메시지 출력용
    const totalTodoCount = ref(0); // todo 총 개수
    const limit = 5; // 페이지당 보여줄 todo 개수
    const currentPage = ref(1);
    const searchText = ref(''); // todo 검색 텍스트

    // toast 컴포넌트 관련
    const {
      triggerToast,
      showToast,
      toastMessage,
      toastAlertType
    } = useToast();

    // 페이지 총 개수
    const totalPage = computed(() => {
      return Math.ceil(totalTodoCount.value/limit);
    });

    // json-server (db.json)에서 todoList 가져오기
    const getTodoList = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(`http://localhost:3000/todoList?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`);
        totalTodoCount.value = res.headers['x-total-count']; // todo 총 개수
        todoList.value = res.data; // 가져온 todo데이터를 넣어준다.
      }
      catch (err) {
        console.log(err);
        error.value = '!! ERROR: getTodoList error. !!'
        triggerToast('getTodoList - ERROR!!', 'danger');
      }
    }
    getTodoList(); // todoList 불러오기

    // 할 일 추가 - TodoSimpleForm 컴포넌트에서 받아온 데이터 추가 시킨다
    const addTask = async (todo) => {
      // 데이터베이스(json-server)에 저장
      try {
        await axios.post('http://localhost:3000/todoList', {
            subject: todo.subject,
            completed: todo.completed
        });
        getTodoList(1);
      }
      catch (err) {
        console.log(err);
        error.value = '!! ERROR: addTask error. !!'
        triggerToast('addTask - ERROR!!', 'danger');
      }
    };

    // 할 일 삭제
    const deleteTask = async (index) => {
      const id = todoList.value[index].id; // 할 일 id
      try {
        await axios.delete('http://localhost:3000/todoList/' + id);
        getTodoList(1);
      }
      catch (err) {
        console.log(err);
        error.value = '!! ERROR: deleteTask error. !!'
        triggerToast('deleteTask - ERROR!!', 'danger');
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
        triggerToast('toggleTodo - ERROR!!', 'danger');
      }
    }

    // todo 검색
    let timeOut = null;

    // 엔터로 바로검색 하기
    const searchTodo = () => {
      clearTimeout(timeOut);
      getTodoList(1);
    }

    // 엔터를 치지 않았을 경우, 글자 바뀔 때 마다 자동으로 search 해준다.
    watch(searchText, () => {
      clearTimeout(timeOut); // timeout 초기화
      timeOut = setTimeout(() => {
        getTodoList(1);
      }, 1000);
    });

    const moveToCreatePage = () => {
      router.push({
        name: 'TodoCreate'
      });
    }

    return {
      todoList,
      addTask,
      deleteTask,
      toggleTodo,
      searchText,
      searchTodo,
      error,
      totalPage,
      currentPage,
      getTodoList,
      toastMessage,
      toastAlertType,
      showToast,
      moveToCreatePage
    }
  }
}
</script>

<style>
  a {cursor: pointer;}
  .todoCompleted { color: gray; text-decoration: line-through; }
</style>