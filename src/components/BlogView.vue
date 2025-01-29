<template>
  <div>
    <button @click="toggleEditor" v-if="!showEditor">Add New Blog</button>
    <BlogEditor v-else @addNewItem="addItem" />
    <Blogs :blogs="blogs" :is-loading="isLoading" :error="error" @deleteBlog="deleteItem" />
  </div>
</template>

<script setup>
import BlogEditor from "./BlogEditor.vue";
import Blogs from "./Blogs.vue";
import { useBlogs } from "../composables/useBlogs";
import { ref } from "vue";
const { blogs, isLoading, error, addItem, deleteItem } = useBlogs();
const showEditor = ref(false);
const toggleEditor = () => {
  showEditor.value = !showEditor.value;
};
</script>

<style scoped>
button {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 15px;
}

button:hover {
  background: #218838;
}
</style>

