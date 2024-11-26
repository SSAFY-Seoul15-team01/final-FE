<script setup>
import { ref } from 'vue'
import { useSearchStore } from '@/stores/search'
import searchGlass from '@/assets/svg/search-glass.svg'

const searchStore = useSearchStore()
const keyword = ref('')
const selectedCategories = ref([])
const scrollContainer = ref(null)

const contentTypes = {
  'attraction-filter': 12,
  'restaurant-filter': 39,
  'residence-filter': 32,
  'culture-facility-filter': 14,
  'event-filter': 15,
  'shopping-filter': 38
}

const categoryLabels = {
  'attraction-filter': '관광지',
  'restaurant-filter': '음식점',
  'residence-filter': '숙박',
  'culture-facility-filter': '문화시설',
  'event-filter': '행사/공연/축제',
  'shopping-filter': '쇼핑'
}

const handleScroll = (e) => {
  e.preventDefault()
  
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft += e.deltaY
  }
}

const getCategoryLabel = (name) => categoryLabels[name]

const toggleCategory = (category) => {
  const index = selectedCategories.value.indexOf(category)
  if (index === -1) {
    selectedCategories.value.push(category)
  } else {
    selectedCategories.value.splice(index, 1)
  }

searchStore.setCategories(selectedCategories.value)

  // if (keyword.value != '') {
  //   searchStore.searchPlaces()
  // }
}

const searchByKeyword = async () => {
  searchStore.setKeyword(keyword.value)
  searchStore.searchPlaces()
  await searchStore.createMarkers()
}

const { results, loading, error } = searchStore
</script>

<template>
    <div class="search-container">
      <div class="absolute top-4 left-3 flex items-center h-14 mx-2 p-2 rounded bg-white z-[100]">
        <input
          type="text"
          v-model="keyword"
          @keyup.enter="searchByKeyword"
          placeholder="관광지를 검색하세요"
          class="p-2 border rounded w-[345px] my-4 outline-none focus:ring-0"
        />
        <button
          @click="searchByKeyword"
          class="right-2 ml-2 p-2 hover:bg-gray-100 rounded-full"  
        >
          <component :is="searchGlass" />
        </button>
      </div>
    
      <div
        ref="scrollContainer"
        @wheel="handleScroll"
        class="absolute flex overflow-x-auto scrollbar-hide gap-2 mb-4 z-[100] top-20 left-3"
      >
        <button
          v-for="(typeId, name) in contentTypes"
          :key="name"
          @click="toggleCategory(name)"
          :class="[
            'px-4 py-2 rounded-full border text-sm flex-shrink-0',
            selectedCategories.includes(name)
              ? 'bg-indigo-300 text-white border-indigo-300'
              : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-300'
          ]"
        >
          {{ getCategoryLabel(name) }}
        </button>
      </div>

      <div v-if="loading">검색 중...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="place in results" :key="place.id" class="border p-4 rounded">
          <h3>{{ place.name }}</h3>
          <p>{{ place.address }}</p>
        </div>
      </div>
    </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.overflow-x-auto {
    scroll-behavior: smooth;
}
</style>