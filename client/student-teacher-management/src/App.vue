<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Header - Only show when authenticated -->
    <nav v-if="isAuthenticated" class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/dashboard" class="text-xl font-bold text-gray-900">
                School Management
              </router-link>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                to="/dashboard"
                class="nav-link"
                :class="{ active: currentRoute === 'Dashboard' }"
              >
                Dashboard
              </router-link>
              <router-link
                to="/students"
                class="nav-link"
                :class="{ active: currentRoute === 'Students' }"
              >
                Students
              </router-link>
              <router-link
                to="/teachers"
                class="nav-link"
                :class="{ active: currentRoute === 'Teachers' }"
              >
                Teachers
              </router-link>
            </div>
          </div>
          <div class="flex items-center">
            <button
              @click="handleLogout"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Navigation Menu -->
    <div v-if="isAuthenticated" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          to="/dashboard"
          class="mobile-nav-link"
          :class="{ active: currentRoute === 'Dashboard' }"
        >
          Dashboard
        </router-link>
        <router-link
          to="/students"
          class="mobile-nav-link"
          :class="{ active: currentRoute === 'Students' }"
        >
          Students
        </router-link>
        <router-link
          to="/teachers"
          class="mobile-nav-link"
          :class="{ active: currentRoute === 'Teachers' }"
        >
          Teachers
        </router-link>
      </div>
    </div>

    <!-- Main Content -->
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const isAuthenticated = computed(() => store.state.token !== null)
    const currentRoute = computed(() => route.name)

    const handleLogout = async () => {
      await store.dispatch('logout')
      router.push('/login')
    }

    return {
      isAuthenticated,
      currentRoute,
      handleLogout,
    }
  },
}
</script>

<style>
.nav-link {
  @apply inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700;
}

.nav-link.active {
  @apply border-b-2 border-blue-500 text-gray-900;
}

.mobile-nav-link {
  @apply block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50;
}

.mobile-nav-link.active {
  @apply bg-blue-50 border-blue-500 text-blue-700;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
