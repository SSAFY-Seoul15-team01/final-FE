<script setup lang="js">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import IconMap from "@/assets/svg/map.svg"
import IconImageSearch from "@/assets/svg/image-search.svg"
import IconArticle from "@/assets/svg/write-article.svg"
import IconMyPage from "@/assets/svg/person.svg"

const route = useRoute();


// 네비게이션 아이템을 computed로 변경하여 동적 처리
const navItems = computed(() => [
    {
        href: "/",
        icon: "map",
        svg: IconMap
    },
    {
        href: "/",
        icon: "searchImage",
        svg: IconImageSearch
    },
    {
        href: "/",
        icon: "writeArticle",
        svg: IconArticle
    },
    {
        href: "/",
        icon: "myPage",
        svg: IconMyPage
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
                <li v-for="({ href, icon, svg }, index) in navItems" :key="`${index}-${icon}`" class="flex-1">
                    <router-link :to="href" class="relative block group">
                        <div class="flex flex-col items-center py-2 transition-all duration-300">
                            <!-- SVG 아이콘을 직접 렌더링 -->
                            <div class="relative p-2 rounded-lg transition-all duration-300"><component :is="svg"/></div>
                        </div>

                        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-0.5 transition-all duration-300"
                            :class="[
                                isActive(href)
                                    ? 'bg-indigo-500'
                                    : 'bg-transparent group-hover:bg-indigo-300',
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