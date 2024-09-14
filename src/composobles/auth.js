import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { AUTH } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
export const firstLoad = () => {
  const loading = ref(true);
  const useStore = useUserStore();
  onAuthStateChanged(AUTH, async (user) => {
    if (user) {
      const res = await useStore.getUserProfile(user.uid);
      useStore.set(res);
    }
    loading.value = false;
  });
  return { loading };
};
export const isAuth = () => {
  let user = AUTH.currentUser;
  if (!user) {
    return "/signin";
  }
  return true;
};
export const isLoggedIn = () => {
  let user = AUTH.currentUser;
  if (user) {
    return "/";
  }
  return true;
};
