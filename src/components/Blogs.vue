<template>
  <div>
    <h1>Blogs</h1>
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    <section v-else>
      <div class="search-bar">
        <label for="search">Search:</label>
        <input type="text" id="search" v-model="searchTerm" />
      </div>
      <fieldset>
        <div>Filter by:</div>
        <input type="checkbox" id="title" value="title" v-model="filteredItems" />
        <label for="title">By Title</label>
        <input type="checkbox" id="content" value="description" v-model="filteredItems" />
        <label for="content">By Content</label>
      </fieldset>
      <ul class="blog-list">
        <li v-for="(blog, index) in filters" :key="index">
          <article class="blog-item">
            <div class="blog-content">
              <img v-if="blog.heroImage" class="thumbnail" :src="`${blog.heroImage.fields.file.url}?fit=scale&w=350&h=196`"/>
              <div class="text-section">
                <div class="date">
                  {{ new Date(blog.publishDate).toDateString() }}
                </div>
                <h4>{{ blog.title }}</h4>
                <p>{{ blog.description }}</p>
              </div>
            </div>
            <button @click="emits('deleteBlog', blog.id)">Delete</button>
          </article>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { useSearch } from "../composables/useSearch";

const props = defineProps({
  blogs: Array,
  isLoading: Boolean,
  error: String,
});

const emits = defineEmits(["deleteBlog"]);
const blogList = ref(props.blogs);

watch(
    () => props.blogs,
    (newBlogs) => {
      blogList.value = newBlogs;
    }
);
const { searchTerm, filters, filteredItems } = useSearch(blogList);
</script>

<style scoped>
.blog-list {
  list-style: none;
  padding: 0;
}

.blog-item {
  background: darkblue;
  color: #0d47a1;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, background 0.3s;
}

.blog-item:hover {
  transform: scale(1.02);
  background: #333;
}

.blog-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.text-section h4 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #fff;
}

.text-section p {
  color: #ddd;
}

.date {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: #aaa;
}

.thumbnail {
  width: 120px;
  height: 80px;
  border-radius: 5px;
  object-fit: cover;
}

button {
  background: red;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: darkred;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

input[type="text"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #333;
  color: white;
}

fieldset {
  border: 1px solid #555;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  color: #ddd;
}
</style>


