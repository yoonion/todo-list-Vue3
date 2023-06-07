<template>
  <List :items="todoList">
    <template #default="{ item, index }">
      <div class="card-body p-2 d-flex align-items-center" style="cursor: pointer" @click="moveToPage(item.id)">
        <div class="form-check flex-grow-1">
          <input :checked="item.completed" @click.stop="toggleTodo(index)" class="form-check-input" type="checkbox">
          <span :class="{ todoCompleted: item.completed }">{{ item.subject }}</span>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click.stop="openModal(item.id)">Delete</button>
        </div>
      </div>
    </template>
  </List>
  <teleport to="#modal">
    <Modal v-if="showModal" @close="closeModal" @delete="deleteTask">Delete Todo</Modal>
  </teleport>
</template>

<script>
import { useRouter } from 'vue-router';
import Modal from '@/components/DeleteModal.vue';
import { ref } from 'vue';
import List from '@/components/List.vue';

export default {
  components: {
    Modal,
    List
  },
  props: ['todoList'],
  emits: ['toggle-todo', 'delete-task'],
  setup(props, { emit }) {
    const router = useRouter();
    const showModal = ref(false);  
    const todoDeleteId = ref(null);

    // modal 창 열기
    const openModal = (id) => {
      console.log('open modal!');
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