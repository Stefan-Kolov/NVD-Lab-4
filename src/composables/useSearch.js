import { ref, computed } from "vue";

export const useSearch = (items) => {
    const searchQuery = ref("");
    const searchFilters = ref(["title"]);
    const filteredResults = computed(() => {
        if (!searchQuery.value.trim()) {
            return items.value;
        }

        return items.value.filter((item) =>
            searchFilters.value.some((filter) =>
                item[filter]?.toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        );
    });

    return {
        searchTerm: searchQuery,
        filters: filteredResults,
        filteredItems:searchFilters,
    };
};
