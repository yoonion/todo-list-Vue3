<template>
  <form @submit.prevent="onSubmit">
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
          <input class="form-control" type="text" v-model="todo" placeholder="Write new task">
        </div>
        <div>
          <button class="btn btn-primary" type="submit">Add</button>  
        </div>
      </div>
      <div v-show="hasErr" style="color: red">This field cannot be empty</div>
    </form>
</template>

<script>
  import { ref } from 'vue';

  export default {
    emits: ['add-task'],
    setup(porps, context) {
      const todo = ref('');
      const hasErr = ref(false); // 할 일 적지 않았을 경우 체크 플래그

      // 할 일 추가
      const onSubmit = () => {
        if(todo.value === '') {
          hasErr.value = true;
        }
        else {
          context.emit('add-task', {
            id: Date.now(),
            subject: todo.value,
            completed: false  
          });
          hasErr.value = false;
          todo.value = '';
        }
      };

      return {
        todo,
        hasErr,
        onSubmit
      }
    }
  }
</script>

<style></style>
