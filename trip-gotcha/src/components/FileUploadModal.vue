<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        @click="closeModal">
        <div class="bg-white rounded-lg p-6 max-w-screen-sm w-full" @click.stop>
            <!-- 모달 닫기 버튼 -->
            <button @click="closeModal" class="absolute top-4 right-4 text-indigo-600 hover:text-indigo-800">
                X
            </button>

            <!-- 드래그 앤 드롭 업로드 폼 -->
            <div class="w-full p-6 border-2 border-indigo-500 border-dashed rounded-lg hover:border-indigo-700 transition-colors duration-300"
                @drop.prevent="handleDrop" @dragover.prevent @click="fileInputRef.click">
                <input ref="fileInputRef" type="file" class="hidden" @change="handleFileSelect" />
                <div class="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-indigo-500 mx-auto" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l5-5 5 5M12 4v12" />
                    </svg>
                    <p class="mt-4 text-lg text-indigo-600">드래그하거나 클릭하여 파일을 업로드하세요</p>
                    <p class="text-sm text-indigo-400">하나의 파일만 업로드할 수 있습니다.</p>
                </div>

                <!-- 업로드된 파일 목록 -->
                <div v-if="files.length" class="mt-4 space-y-2">
                    <div v-for="(file, index) in files" :key="index"
                        class="flex items-center justify-between px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg">
                        <span class="truncate max-w-[200px]">{{ file.name }}</span>
                        <button @click="removeFile" class="text-indigo-500 hover:text-indigo-700">
                            삭제
                        </button>
                    </div>
                </div>
            </div>
            <!-- 전송 버튼 -->
            <div class="mt-4 text-center">
                <button :disabled="!files.length" @click="uploadFile"
                    class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors">
                    전송
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

// 부모 컴포넌트로부터 전달받은 'isOpen'을 prop으로 받는다.
const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    }
});

// 모달을 닫을 수 있는 이벤트를 부모 컴포넌트로 emit
const emit = defineEmits(['update:isOpen']);

// 파일 상태 관리
const fileInputRef = ref(null);
const files = ref([]);

// 드래그 앤 드롭 파일 처리
const handleDrop = (event) => {
    const droppedFiles = event.dataTransfer.files;
    addFile(droppedFiles[0]);  // 첫 번째 파일만 추가
};

// 파일 선택 처리
const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];  // 첫 번째 파일만 선택
    if (selectedFile) {
        addFile(selectedFile);
    }
};

// 파일 추가 처리
const addFile = (newFile) => {
    // 기존 파일이 있으면 새 파일로 덮어씌운다.
    files.value = [newFile];
};

// 파일 삭제 처리
const removeFile = () => {
    files.value = [];  // 파일 삭제
};

// 모달 닫기
const closeModal = () => {
    emit('update:isOpen', false);  // 부모에게 모달 닫힘 상태 전달
};

const uploadFile = () => {

};
</script>

<style scoped>
/* Optional: Add any custom styles if needed */
</style>