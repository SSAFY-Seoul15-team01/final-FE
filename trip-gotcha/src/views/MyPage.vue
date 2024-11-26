<script setup lang="js">
import { onBeforeUnmount } from "vue";
import { useModalStore } from "@/stores/modal";
import { useMemberStore } from '@/stores/member';
import { useLocationStore } from "@/stores/location";
import { useMyArticleStore } from '@/stores/myArticle'
import MobileLayout from "@/components/Layout.vue";
import GNB from "@/components/Gnb.vue";
import MyArticleList from "@/components/MyArticleList.vue";
import LoginModal from "@/components/LoginModal.vue";
import SettingBtn from "@/components/SettingBtn.vue";
import CharacterMap from "@/components/CharacterMap.vue";
import FileUploadModal from "@/components/FileUploadModal.vue";

const modalStore = useModalStore();
const memberStore = useMemberStore();
const locationStore = useLocationStore();
const myArticleStore = useMyArticleStore();

// 모달 열기
const openModal = () => {
    locationStore.getLocation();
    modalStore.openFileUploadModal();
};

onBeforeUnmount(() => {
    modalStore.closeFileUploadModal();
    myArticleStore.articles = [];
})

</script>

<template>
    <MobileLayout>

        <div class="flex flex-col items-center h-screen bg-indigo-50"> <!-- indigo 계열 배경색 적용 -->

            <setting-btn />
            <div class="flex flex-col items-center w-full mb-8 overflow-y-auto overflow-x-hidden rtl p-4">
                <!-- 프로필 (왼쪽 정렬) -->
                <div v-if="memberStore.member !== null" class="flex items-center justify-start mb-8 w-full mt-12">
                    <img class="w-24 h-24 rounded-full object-cover mr-4 border-4 border-indigo-50 shadow-md"
                        :src="memberStore.member.profileUrl" alt="Profile Picture" />
                    <span class="text-lg font-semibold">{{ memberStore.member.nickname.substr(0, 20) }}</span>
                </div>

                <login-modal />

                <character-map :key="modalStore.isFileUploadModalOpen" />

                <file-upload-modal />

                <button @click="openModal"
                    class="w-full bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    여행인증
                </button>
                <div class="mb-8"></div>
                <MyArticleList />
            </div>
        </div>
        <GNB />
    </MobileLayout>
</template>

<style scoped></style>
