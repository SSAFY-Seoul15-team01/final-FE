<script setup lang="js">
import { ref, onMounted } from 'vue';
import { useMemberStore } from '@/stores/member';
const memberStore = useMemberStore();
const showLoginModal = ref(!memberStore.isAuthenticated);
const logo = import.meta.env.VITE_APP_NAME;

const naverLogin = () => {
    memberStore.login("naver");
};
onMounted(async () => {
    await memberStore.fetchMember();
    showLoginModal.value = !memberStore.isAuthenticated;
});
</script>

<template>
    <div v-if="showLoginModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
        <div class="bg-white p-8 rounded-lg shadow-lg w-96 relative z-20 flex flex-col items-center">
            <!-- Trip GotCha 로고 -->
            <h2 class="text-3xl font-bold text-indigo-600 mb-4">{{ logo }}</h2>

            <!-- 로그인 설명 -->
            <p class="mb-4 text-gray-700 text-center">소셜 로그인을 통해 계정에 접근하세요.</p>

            <!-- 소셜 로그인 버튼 -->
            <button @click="naverLogin">
                <!-- 소셜 로그인 -->
                <img src="/src/assets/png/naver_login_btn.png" alt="">
            </button>
        </div>
    </div>
</template>

<style scoped></style>