import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    students: [],
    teachers: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
    setStudents(state, students) {
      state.students = students;
    },
    setTeachers(state, teachers) {
      state.teachers = teachers;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const { data } = await axios.post(`${API_URL}/login`, credentials);
      commit('setToken', data.token);
    },
    async logout({ commit }) {
      commit('clearToken');
    },
    async fetchStudents({ commit, state }) {
      const { data } = await axios.get(`${API_URL}/students`, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      commit('setStudents', data);
    },
    async fetchTeachers({ commit, state }) {
      const { data } = await axios.get(`${API_URL}/teachers`, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      commit('setTeachers', data);
    }
  }
});