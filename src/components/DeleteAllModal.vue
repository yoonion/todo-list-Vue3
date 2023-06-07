<template>
  <Modal>
    <template #title>Delete All Todo</template>
    <template #body>Are you sure you want to <u><b>delete all todo?</b></u></template>
    <template #footer>
      <button type="button" class="btn btn-secondary" @click="onClose">Close</button>
      <button type="button" class="btn btn-danger" @click="onDeleteAll">Delete all</button>
    </template>
  </Modal>
</template>

<script>
import Modal from './Modal.vue';

export default {
  components: {
    Modal
  },
  setup(props, { emit }) {
    const onClose = () => {
      emit('close');
    }

    const onDeleteAll = () => {
      emit('delete-all');
    }

    return {
      onClose,
      onDeleteAll
    }
  }
}
</script>

<style>

</style>