<script setup lang="js">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const route = useRoute();


// 네비게이션 아이템을 computed로 변경하여 동적 처리
const navItems = computed(() => [
    {
        href: "/",
        icon: "home",
        name: "홈",
        svg: `<svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>`,
    },
    // {
    //     href: userInfo.value?.login ? "/user" : "/login",
    //     icon: userInfo.value?.login ? "user" : "lock",
    //     name: userInfo.value?.login ? "프로필" : "로그인",
    //     svg: userInfo.value?.login
    //         ? `<svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor">
    //        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
    //              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    //      </svg>`
    //         : `<svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor">
    //        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
    //              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    //      </svg>`,
    // },
]);

const currentPage = computed(() => route.path);

const isActive = (href) => {
    if (href === "/mobile") {
        return currentPage.value === href || currentPage.value === "/mobile/";
    }
    return currentPage.value.startsWith(href);
};
</script>

<template>
    <div class="sticky bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-100 shadow-sm">
        <nav class="max-w-screen-md mx-auto px-2">
            <ul class="flex justify-between items-center">
                <li v-for="({ href, name, svg }, index) in navItems" :key="`${index}-${name}`" class="flex-1">
                    <router-link :to="href" class="relative block group">
                        <div class="flex flex-col items-center py-3 transition-all duration-200" :class="[
                            isActive(href)
                                ? 'text-blue-500'
                                : 'text-gray-400 hover:text-blue-400',
                        ]">
                            <!-- SVG 아이콘을 직접 렌더링 -->
                            <div class="relative p-2 rounded-lg transition-all duration-200"
                                :class="[isActive(href) && 'bg-blue-50']" v-html="svg"></div>

                            <span class="text-xs mt-1 font-medium transition-colors duration-200" :class="[
                                isActive(href)
                                    ? 'text-blue-500'
                                    : 'text-gray-500 group-hover:text-blue-400',
                            ]">
                                {{ name }}
                            </span>
                        </div>

                        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-0.5 transition-all duration-200"
                            :class="[
                                isActive(href)
                                    ? 'bg-blue-500'
                                    : 'bg-transparent group-hover:bg-blue-200',
                            ]"></div>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.router-link-active {
    font-weight: 500;
}

/* SVG 스타일링을 위한 추가 CSS */
:deep(svg) {
    @apply transition-colors duration-200;
}

.group:hover :deep(svg) {
    @apply transform scale-105 transition-transform duration-200;
}
</style>