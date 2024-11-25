<script setup lang="js">
import { onBeforeUnmount } from "vue";
import { useModalStore } from "@/stores/modal";
import { useMemberStore } from '@/stores/member';
import { useLocationStore } from "@/stores/location";
import LoginModal from "@/components/LoginModal.vue";
import SettingBtn from "@/components/SettingBtn.vue";
import CharacterMap from "@/components/CharacterMap.vue";
import FileUploadModal from "@/components/FileUploadModal.vue";

const modalStore = useModalStore();
const memberStore = useMemberStore();
const locationStore = useLocationStore();

// 모달 열기
const openModal = () => {
    locationStore.getLocation();
    modalStore.openFileUploadModal();
};

onBeforeUnmount(() => {
    modalStore.closeFileUploadModal();
})

</script>

<template>
    <div class="flex flex-col items-center p-4 h-screen bg-indigo-50"> <!-- indigo 계열 배경색 적용 -->

        <setting-btn />

        <!-- 프로필 (왼쪽 정렬) -->
        <div v-if="memberStore.member !== null" class="flex items-center justify-start mb-8 w-full mt-12">
            <img class="w-24 h-24 rounded-full object-cover mr-4 border-4 border-indigo-50 shadow-md"
                :src="memberStore.member.profileUrl" alt="Profile Picture" />
            <span class="text-lg font-semibold">{{ memberStore.member.nickname.substr(0, 20) }}</span>
        </div>

        <login-modal />

        <character-map />

        <file-upload-modal />

        <!-- 여행 인증 버튼 (가로로 길게, indigo 계열 색상 적용) -->
        <button @click="openModal"
            class="w-full bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            여행인증
        </button>

    </div>
</template>

<style scoped></style>
