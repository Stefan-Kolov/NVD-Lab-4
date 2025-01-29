<template>
  <section>
    <h1>Blog Editor</h1>
    <form @submit.prevent="handleSave">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" placeholder="Enter blog title" />
      </div>
      <div class="form-group">
        <label for="slug">Blog ID</label>
        <input type="text" id="slug" v-model="id" placeholder="Enter blog ID" />
      </div>
      <div class="form-group">
        <label for="author">Author</label>
        <input type="text" id="author" v-model="author" placeholder="Enter author's name" />
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea id="content" v-model="content" placeholder="Write your content here"></textarea>
      </div>
      <div class="form-group">
        <button type="submit">Save</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from "vue";
const title = ref("");
const author = ref("");
const content = ref("");
const id = ref("");
const emits = defineEmits(["addNewItem"]);

const handleSave = () => {
  if (!title.value || !id.value) return;

  emits("addNewItem", {
    title: title.value,
    author: author.value,
    content: content.value,
    id: id.value,
  });

  resetForm();
};

const resetForm = () => {
  title.value = "";
  author.value = "";
  content.value = "";
  id.value = "";
};
</script>

<style scoped>
.input-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #0056b3;
}
</style>
