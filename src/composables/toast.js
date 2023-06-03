import { ref, onUnmounted } from "vue";

export const useToast = () => {
  const showToast = ref(false);
  const toastMessage = ref('');
  const toastAlertType = ref('');
  const timeout = ref(null);
  const triggerToast = (msg, type='success') => {
    toastMessage.value = msg;
    toastAlertType.value = type;
    showToast.value = true;
    timeout.value = setTimeout(() => { // 토스트 컴포넌트 다시 숨김
      showToast.value = false;
    }, 3000); 
  }

  // 메모리 낭비 관리
  onUnmounted(() => {
    console.log('onUnmounted !');
    clearTimeout(timeout.value);
  });

  return {
    triggerToast,
    showToast,
    toastMessage,
    toastAlertType
  }
}