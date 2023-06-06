// 어떤 컴포넌트에서도 바로 접근이 가능함
import { createStore } from "vuex";
import modules from "./modules";

export default createStore({
  modules
});