export const useListActions = (list) => {
    const appendItem = (newItem) => {
        list.value = [...list.value, newItem];
    };

    const removeItem = (itemId) => {
        list.value = list.value.filter((item) => item.id !== itemId);
    };

    return {
        addItem: appendItem,
        deleteItem: removeItem,
    };
};
