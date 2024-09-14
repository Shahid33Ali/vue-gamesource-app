import { Editor } from "@tiptap/vue-3";
import * as yup from "yup";
const articleSchema = {
  game: yup.string().required("Necessary"),
  title: yup
    .string()
    .required("Give the title bro!!!")
    .min(20, "make it 20")
    .max(70, "Make it shorter"),
  excrept: yup
    .string()
    .required("Required!!!")
    .min(100, "Add more")
    .max(400, "make it less"),
  editor: yup.string().required(),
  rating: yup
    .string()
    .required("The rating is required")
    .notOneOf(["Select a string"], "select a rating"),
  src: yup.string().required("Give the img url").url(),
};
export default articleSchema;
