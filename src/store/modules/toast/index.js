export default {
  namespaced: true,
  state: {
    toasts: [],
    // showToast: false,
    // toastMessage: '',
    // toastAlertType: '',
  },
  mutations: {
    // UPDATE_TOAST_MESSAGE(state, payload) {
    //   state.toastMessage = payload;
    // },
    // UPDATE_TOAST_ALERT_TYPE(state, payload) {
    //   state.toastAlertType = payload;
    // },
    // UPDATE_TOAST_STATUS(state, payload) {
    //   state.showToast = payload;
    // },
    ADD_TOAST(state, payload) {
      state.toasts.push(payload);
    },
    REMOVE_TOAST(state) {
      state.toasts.shift();
    }
  },
  actions: {
    triggerToast({ commit }, message, type='success') {
      // commit('UPDATE_TOAST_MESSAGE', message);
      // commit('UPDATE_TOAST_ALERT_TYPE', type);
      // commit('UPDATE_TOAST_STATUS', true);
      commit('ADD_TOAST', {
        id: Date.now(),
        message,
        type
      });

      // 토스트 컴포넌트 다시 숨김
      setTimeout(() => { 
        // commit('UPDATE_TOAST_MESSAGE', '');
        // commit('UPDATE_TOAST_ALERT_TYPE', '');
        // commit('UPDATE_TOAST_STATUS', false);

        commit('REMOVE_TOAST', {
        })
      }, 3000);
    }
  },
  getters: {

  }
}