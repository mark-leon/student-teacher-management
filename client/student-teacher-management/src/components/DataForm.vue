<template>
  <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded-lg p-6 mb-4">
    <div v-for="field in fields" :key="field.name" class="mb-4">
      <label :for="field.name" class="block text-gray-700 text-sm font-bold mb-2">
        {{ field.label }}
      </label>
      <input
        :type="field.type"
        :id="field.name"
        v-model="formData[field.name]"
        required
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
    <div class="flex justify-end">
      <button
        type="button"
        @click="$emit('cancel')"
        class="mr-2 px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        {{ submitLabel }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'DataForm',
  props: {
    fields: {
      type: Array,
      required: true,
    },
    initialData: {
      type: Object,
      default: () => ({}),
    },
    submitLabel: {
      type: String,
      default: 'Submit',
    },
  },
  data() {
    return {
      formData: { ...this.initialData },
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.formData)
    },
  },
}
</script>
