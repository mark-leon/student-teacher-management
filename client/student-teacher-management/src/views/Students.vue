<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 sm:px-0 mb-4 flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-900">Student Management</h2>
        <button
          v-if="!showForm"
          @click="showForm = true"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Add Student
        </button>
      </div>

      <div class="px-4 py-6 sm:px-0">
        <SearchBar v-if="!showForm" @search="handleSearch" />

        <DataForm
          v-if="showForm"
          :fields="studentFields"
          :initial-data="selectedStudent"
          :submit-label="selectedStudent ? 'Update Student' : 'Add Student'"
          @submit="handleSubmit"
          @cancel="cancelForm"
        />

        <DataTable
          v-if="!showForm"
          :columns="studentColumns"
          :items="filteredStudents"
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
  name: 'Students',
  components: {
    SearchBar,
    DataForm,
    DataTable,
  },
  data() {
    return {
      searchQuery: '',
      showForm: false,
      selectedStudent: null,
      studentFields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'age', label: 'Age', type: 'number' },
        { name: 'class', label: 'Class', type: 'text' },
      ],
      studentColumns: [
        { key: 'name', label: 'Name' },
        { key: 'age', label: 'Age' },
        { key: 'class', label: 'Class' },
      ],
    }
  },
  computed: {
    filteredStudents() {
      return this.$store.state.students.filter((student) =>
        student.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
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
        if (this.selectedStudent) {
          await axios.put(`${API_URL}/students/${this.selectedStudent.id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
          })
        } else {
          await axios.post(`${API_URL}/students`, data, {
            headers: { Authorization: `Bearer ${token}` },
          })
        }
        await this.$store.dispatch('fetchStudents')
        this.cancelForm()
      } catch (error) {
        alert('Error saving student data')
      }
    },
    handleEdit(student) {
      this.selectedStudent = student
      this.showForm = true
    },
    cancelForm() {
      this.showForm = false
      this.selectedStudent = null
    },
  },
  mounted() {
    this.$store.dispatch('fetchStudents')
  },
}
</script>
