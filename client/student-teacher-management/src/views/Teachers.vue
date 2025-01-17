<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 sm:px-0 mb-4 flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-900">Teacher Management</h2>
        <button
          v-if="!showForm"
          @click="showForm = true"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Add Teacher
        </button>
      </div>

      <div class="px-4 py-6 sm:px-0">
        <SearchBar v-if="!showForm" @search="handleSearch" />

        <DataForm
          v-if="showForm"
          :fields="teacherFields"
          :initial-data="selectedTeacher"
          :submit-label="selectedTeacher ? 'Update Teacher' : 'Add Teacher'"
          @submit="handleSubmit"
          @cancel="cancelForm"
        />

        <DataTable
          v-if="!showForm"
          :columns="teacherColumns"
          :items="filteredTeachers"
          @edit="handleEdit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue'
import DataForm from '../components/DataForm.vue'
import DataTable from '../components/DataTable.vue'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

export default {
  name: 'Teachers',
  components: {
    SearchBar,
    DataForm,
    DataTable,
  },
  data() {
    return {
      searchQuery: '',
      showForm: false,
      selectedTeacher: null,
      teacherFields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'subject', label: 'Subject', type: 'text' },
        { name: 'experience', label: 'Experience (years)', type: 'number' },
      ],
      teacherColumns: [
        { key: 'name', label: 'Name' },
        { key: 'subject', label: 'Subject' },
        { key: 'experience', label: 'Experience (years)' },
      ],
    }
  },
  computed: {
    filteredTeachers() {
      return this.$store.state.teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
    },
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query
    },
    async handleSubmit(data) {
      try {
        const token = this.$store.state.token
        if (this.selectedTeacher) {
          await axios.put(`${API_URL}/teachers/${this.selectedTeacher.id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
          })
        } else {
          await axios.post(`${API_URL}/teachers`, data, {
            headers: { Authorization: `Bearer ${token}` },
          })
        }
        await this.$store.dispatch('fetchTeachers')
        this.cancelForm()
      } catch (error) {
        alert('Error saving teacher data')
      }
    },
    handleEdit(teacher) {
      this.selectedTeacher = teacher
      this.showForm = true
    },
    cancelForm() {
      this.showForm = false
      this.selectedTeacher = null
    },
  },
  mounted() {
    this.$store.dispatch('fetchTeachers')
  },
}
</script>
