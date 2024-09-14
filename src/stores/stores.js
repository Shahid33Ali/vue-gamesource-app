import { defineStore } from "pinia";
import router from "@/router";
import { DB } from "@/utils/firebase";
import { useUserStore } from "./user";
import {
  collection,
  getDoc,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  query,
  orderBy,
  getDocs,
  limit,
  startAfter,
  deleteDoc,
} from "firebase/firestore";
import { useToast } from "vue-toast-notification";
const articlesCol = collection(DB, "articles");
const $toast = useToast();
export const useArticleStore = defineStore("article", {
  state: () => ({
    homeArticles: "",
    adminArticles: "",
    adminLastVisible: "",
  }),
  getters: {
    getFeaturedSlides(state) {
      return state.homeArticles.slice(0, 2);
    },
    getHomeArticles(state) {
      return state.homeArticles;
    },
  },
  actions: {
    async getArticles() {
      try {
        const q = query(
          articlesCol,
          orderBy("timestamp", "desc"),
          limit(limit)
        );
        const querySnapshot = await getDocs(q);
        const articles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.homeArticles = articles;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    async updateArticle(id, formData) {
      try {
        const docRef = doc(DB, "articles", id);
        await updateDoc(docRef, {
          ...formData,
        });
        $toast.success("This is a success");
      } catch (err) {
        $toast.error(err.message);
        throw new Error(err);
      }
    },
    async getArticleById(uid) {
      const docRef = await getDoc(doc(DB, "articles", uid));
      if (!docRef.exists()) {
        throw new Error("Could not find document");
      }
      return docRef.data();
    },
    async addArticle(formData) {
      try {
        //user profile
        const useStore = useUserStore();
        const user = useStore.gteUserData;
        const newArticle = doc(articlesCol);
        await setDoc(newArticle, {
          timestamp: serverTimestamp(),
          owner: {
            uid: user.uid,
            firstname: user.firstname,
            lastname: user.lastname,
          },
          ...formData,
        });
        router.push({ name: "admin_articles", query: { reload: true } });
        return true;
      } catch (err) {}
    },
    async adminGetMoreArticles(doclimit) {
      try {
        if (this.adminLastVisible) {
          let oldArticles = this.adminArticles;
          const q = query(
            articlesCol,
            orderBy("timestamp", "desc"),
            startAfter(this.adminLastVisible),
            limit(doclimit)
          );
          const querySnapshot = await getDocs(q);
          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          const articles = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.adminArticles = [...oldArticles, ...articles];
          this.adminLastVisible = lastVisible;
        }
      } catch (err) {}
    },
    async adminGetArticles(doclimit) {
      try {
        const q = query(
          articlesCol,
          orderBy("timestamp", "desc"),
          limit(doclimit)
        );
        const querySnapshot = await getDocs(q);
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        const articles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.adminArticles = articles;
        this.adminLastVisible = lastVisible;
      } catch (err) {
        $toast.error(err.message);
        throw new Error(err);
      }
    },
    async removeById(articleID) {
      try {
        await deleteDoc(doc(DB, "articles", articleID));
        const newList = this.adminArticles.filter((x) => x.id !== articleID);
        this.adminArticles = newList;
        $toast.success("this is a success");
      } catch (err) {
        $toast.error(err.message);
        throw new Error(err);
      }
    },
  },
});
