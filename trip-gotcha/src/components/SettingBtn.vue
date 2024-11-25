<script setup>
import { ref } from 'vue';
import { useMemberStore } from '@/stores/member';
import settingIcon from "@/assets/svg/setting.svg"
const memberStore = useMemberStore();
const dropdownOpen = ref(false);
const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};
const logout = () => {
    memberStore.logout();
    memberStore.member = null;
    window.location.href = '/';
};
</script>

<template>
    <div>
        <button @click="toggleDropdown"
            class="absolute top-4 right-4 bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10">
            <component :is="settingIcon" />
        </button>
        <div v-if="dropdownOpen"
            class="absolute top-14 right-4 bg-white shadow-lg rounded-md border border-indigo-200 z-10">
            <ul class="space-y-2 p-4">
                <li>
                    <button class="w-full text-left text-indigo-700 hover:bg-indigo-50 rounded-md p-2"
                        @click="console.log('정보 수정 클릭')">
                        정보수정
                    </button>
                </li>
                <li>
                    <button class="w-full text-left text-indigo-700 hover:bg-indigo-50 rounded-md p-2"
                        @click="logout()">
                        로그아웃
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped></style>