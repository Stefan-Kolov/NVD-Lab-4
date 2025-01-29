import { ref, onMounted } from "vue";
import { useListActions } from "./useListAction";
import { createClient } from "contentful";

const contentfulClient = createClient({
    space: "hpr0uushokd4",
    accessToken: "jwEHepvQx-kMtO7_2ldjhE4WMAsiDp3t1xxBT8aDp7U",
});

export const useBlogs = () => {
    const blogs = ref([]);
    const loadingState = ref(false);
    const fetchError = ref(null);
    const { addItem, deleteItem } = useListActions(blogs);
    const loadBlogs = async () => {
        loadingState.value = true;
        fetchError.value = null;

        try {
            const response = await contentfulClient.getEntries({
                content_type: "blogPost",
                order: "-fields.publishDate",
            });

            blogs.value = response.items.map((entry) => ({
                id: entry.fields.slug, ...entry.fields,
            }));
        } catch (err) {
            fetchError.value = err.message;
        } finally {
            loadingState.value = false;
        }
    };

    onMounted(loadBlogs);

    return {
        blogs,
        loadingState,
        fetchError,
        addItem,
        deleteItem,
    };
};
