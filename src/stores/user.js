import { defineStore } from "pinia";
import errorCodes from "@/utils/fbcodes";
//FireBase
import { AUTH, DB } from "@/utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useToast } from "vue-toast-notification";
const $toast = useToast();
import router from "@/router";
const DEFAULT_USER = {
  uid: null,
  email: null,
  firstname: null,
  lastname: null,
  isAdmin: null,
};
export const useUserStore = defineStore("user", {
  state: () => ({
    loading: false,
    user: DEFAULT_USER,
    auth: false,
  }),
  getters: {
    gteUserData(state) {
      return state.user;
    },
    getUserId(state) {
      return state.user.uid;
    },
  },
  actions: {
    set(data) {
      this.user = { ...this.user, ...data };
      this.auth = true;
    },
    async update(formData) {
      try {
        const userRef = doc(DB, "users", this.getUserId);
        await updateDoc(userRef, {
          ...formData,
        });
        $toast.success("Updated!!!!");
        this.set(formData);
        return true;
      } catch (err) {
        $toast.error(err.message);
        throw new Error(err);
      }
    },
    async getUserProfile(uid) {
      try {
        const userRef = await getDoc(doc(DB, "users", uid));
        if (!userRef.exists()) {
          throw new Error("There is no user of this id");
        }
        return userRef.data();
      } catch (err) {
        console.log(err);
      }
    },
    async signin(formData) {
      try {
        this.loading = true;
        const res = await signInWithEmailAndPassword(
          AUTH,
          formData.email,
          formData.password
        );
        const userData = await this.getUserProfile(res.user.uid);
        this.set(userData);
        console.log(this.user);
        router.push({ name: "dashboard" });
      } catch (err) {
        throw new Error(errorCodes(err.code));
      } finally {
        this.loading = false;
      }
    },

    async register(formData) {
      try {
        this.loading = true;
        const res = await createUserWithEmailAndPassword(
          AUTH,
          formData.email,
          formData.password
        );
        router.push({ name: "dashboard" });
        //new user
        const newUser = {
          uid: res.user.uid,
          email: res.user.email,
          isAdmin: false,
        };
        this.set(newUser);
        await setDoc(doc(DB, "users", res.user.uid), newUser);
      } catch (err) {
        throw new Error(errorCodes(err.code));
      } finally {
        this.loading = false;
      }
    },
    async signOut() {
      await signOut(AUTH);
      this.user = DEFAULT_USER;
      this.auth = false;
      router.push({ name: "home" });
    },
  },
});
