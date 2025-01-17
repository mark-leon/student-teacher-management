<template>
  <div class="mb-4">
    <input
      type="text"
      v-model="searchQuery"
      @input="handleSearch"
      placeholder="Search..."
      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: '',
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchQuery)
    },
  },
}
</script>
