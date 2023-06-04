<template>
  <div v-for="(todo, index) in todoList" :key="todo.id" class="card mt-2">
    <div class="card-body p-2 d-flex align-items-center" style="cursor: pointer" @click="moveToPage(todo.id)">
      <div class="form-check flex-grow-1">
        <input :checked="todo.completed" @click.stop="toggleTodo(index)" class="form-check-input" type="checkbox">
        <span :class="{ todoCompleted: todo.completed }">{{ todo.subject }}</span>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" @click.stop="openModal(todo.id)">Delete</button>
      </div>
    </div>
  </div>
  <teleport to="#modal">
    <Modal v-if="showModal" @close="closeModal" @delete="deleteTask">Delete Todo</Modal>
  </teleport>
</template>

<script>
import { useRouter } from 'vue-router';
import Modal from '@/components/DeleteModal.vue';
import { ref } from 'vue';

export default {
  components: {
    Modal
  },
  props: ['todoList'],
  emits: ['toggle-todo', 'delete-task'],
  setup(props, { emit }) {
    const router = useRouter();
    const showModal = ref(false);  
    const todoDeleteId = ref(null);

    // modal 창 열기
    const openModal = (id) => {
      showModal.value = true;
      todoDeleteId.value = id; // 삭제시킬 todo id 값
    }

    // modal 창 닫기
    const closeModal = () => {
      showModal.value = false;
      todoDeleteId.value = null;
    }

    // 완료한 todo 체크
    const toggleTodo = (index) => {
      emit('toggle-todo', index);
    }

    // todo 삭제
    const deleteTask = () => {
      emit('delete-task', todoDeleteId.value);
      showModal.value = false;
      todoDeleteId.value = null;
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
      moveToPage,
      showModal,
      openModal,
      closeModal
    }
  }
}
</script>

<style>

</style>