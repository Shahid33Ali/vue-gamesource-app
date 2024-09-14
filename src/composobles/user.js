import { ref } from "vue";
import * as yup from "yup";
import { useUserStore } from "@/stores/user";
import { useArticleStore } from "@/stores/stores";
export const updateProfile = () => {
  const useStore = useUserStore();
  const articleStore = useArticleStore();
  const firstname = ref(useStore.user.firstname);
  const lastname = ref(useStore.user.lastname);
  const loading = ref(false);
  const formSchema = yup.object({
    firstname: yup
      .string()
      .required("The name is required")
      .max(100, "Too Long"),
    lastname: yup
      .string()
      .required("The name is required")
      .max(100, "Too Long"),
  });
  function onSubmit(values) {
    loading.value = true;
    useStore.update(values).finally(() => {
      loading.value = false;
    });
  }
  return { loading, formSchema, onSubmit, lastname, firstname };
};
