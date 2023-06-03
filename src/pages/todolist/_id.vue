<template>
  <h1>To-Do view page</h1>
  <div v-if="loading">
    Loading ...
  </div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Subject</label>
          <input v-model="todo.subject" type="text" class="form-control">
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button type="button" class="btn" @click="toggleTodoStatus" :class="todo.completed ? 'btn-success' : 'btn-danger'">{{ todo.completed ? 'Completed' : 'Incomplete' }}</button>
          </div>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">Save</button>
    <button @click="moveToTodoList" class="btn btn-outline-dark ml-2">Cancel</button>
  </form>
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { computed, ref } from 'vue';
import _ from 'lodash'; // lodash library
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';

export default {
  components: {
    Toast
  },
  setup() {

    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const originalTodo = ref(null); // todo의 정보가 변경됐는지 안 됐는지 확인하기 위한 변수
    const loading = ref(true);
    const timeout = ref(null);
    const todoId = route.params.id; // todo id값

    // toast 컴포넌트 관련
    const {
      triggerToast,
      showToast,
      toastMessage,
      toastAlertType
    } = useToast();

    // 해당하는 todo 가져오기
    const getTodo = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/todolist/${todoId}`);

        todo.value = { ...res.data };
        originalTodo.value = { ...res.data }; // 변경사항이 있는지 확인하는 용도

        loading.value = false;  
      } 
      catch (error) {
        console.log(`getTodo ERROR ! --- ${error}`);
        triggerToast('getTodo - ERROR!!', 'danger');
      }
      
    }
    getTodo();

    // lodash library를 사용하여, 객체의 값을 비교한다.
    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });

    // 저장 (Save)
    const onSave = async () => {
      try {
        const res = await axios.put(`http://localhost:3000/todolist/${todoId}`, {
          subject: todo.value.subject,
          completed: todo.value.completed
        });

        originalTodo.value = { ...res.data };
        triggerToast('저장 성공!');  
      } 
      catch (error) {
        console.log(`onSave ERROR ! --- ${error}`);
        triggerToast('onSave - ERROR!!', 'danger');
      }
      
    }
   
    // 상태값 변경
    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    }

    // 리스트 페이지로 이동 (Cancel 버튼)
    const moveToTodoList = () => {
      router.push({
        name: 'TodoList'
      });
    }

    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoList,
      onSave,
      todoUpdated,
      showToast,
      toastMessage,
      toastAlertType,
    }

  }
}
</script>

<style>

</style>