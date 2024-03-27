export const useFiltersStore = defineStore({
    id: 'filter-store',
    state: () => {
      return {
        filtersList: ['youtube', 'twitch'],
      }
    },
    actions: {
      addValueToFilterList(value) {
        // Certifique-se de que o valor não está duplicado, se necessário
        if (!this.filtersList.includes(value)) {
          this.filtersList.push(value);
        }
      },
    },
    // Removido o getter 'filtersList' desnecessário
  })