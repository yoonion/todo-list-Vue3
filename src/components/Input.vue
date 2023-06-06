<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input :value="subject" @input="onInput" type="text" class="form-control">
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const onInput = (e) => {
      emit('update:subject', e.target.value);
    }

    return {
      onInput
    }
  }
  
}
</script>

<style>

</style>