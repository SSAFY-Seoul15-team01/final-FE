<template>
    <div class="carousel relative w-full max-w-2xl mx-auto mb-10">
        <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center gap-2">
                <img class="w-8 h-8 rounded-full" :src="article.memberProfile" alt="프로필">
                <span>{{ article.memberNickname }}</span>
            </div>
            <div class="flex items-center gap-1">
                <span>{{ article.likes }}</span>
                <component :is="HeartIcon" />
            </div>
        </div>
        <!-- 메인 이미지 -->
        <div class="relative h-[400px] overflow-hidden rounded-lg">
            <transition name="slide">
                <img :src="article.imageUrls[currentIndex]" class="w-full h-full object-cover">
            </transition>

            <!-- 네비게이션 버튼 -->
            <button @click.stop="goToPrevious"
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/50 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6" />
                </svg>
            </button>

            <button @click.stop="goToNext"
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/50 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </button>
        </div>

        <!-- 인디케이터 닷 -->
        <div class="flex justify-center gap-2 mt-4">
            <button v-for="(_, index) in article.imageUrls" :key="index" class="w-2 h-2 rounded-full"
                :class="index === currentIndex ? 'bg-indigo-300' : 'bg-gray-300'"></button>
        </div>

        <!-- 내용 -->
        <div class="mt-1.5">
            <p>{{ article.content }}</p>
            <p class="text-gray-500 text-xs mt-1.5">{{ article.createdAt }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import HeartIcon from '@/assets/svg/heart-empty.svg'

const props = defineProps({
    article: {}
})


const currentIndex = ref(0)

const goToNext = () => {
    currentIndex.value = currentIndex.value === props.article.imageUrls.length - 1 ? 0 : currentIndex.value + 1
}

const goToPrevious = () => {
    currentIndex.value = currentIndex.value === 0 ? props.article.imageUrls.length - 1 : currentIndex.value - 1
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from {
    transform: translateX(100%);
}

.slide-leave-to {
    transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
    transform: translateX(0);
}
</style>