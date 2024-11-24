<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const drawer = ref(null);
const drawerContent = ref(null);
const isDragging = ref(false);
const startY = ref(0);
const currentHeight = ref(200); // 초기 높이 200px
const minHeight = 200;
const maxHeight = ref(window.innerHeight - 150); // 최대 높이는 화면 높이

// 드래그 시작
const handleTouchStart = (e) => {
  isDragging.value = true;
  startY.value = e.touches[0].clientY;
};

// 드래그 중
const handleTouchMove = (e) => {
  if (!isDragging.value) return;
  
  const currentY = e.touches[0].clientY;
  const deltaY = startY.value - currentY;
  const newHeight = currentHeight.value + deltaY;
  
  if (newHeight >= minHeight && newHeight <= maxHeight.value) {
    currentHeight.value = newHeight;
    startY.value = currentY;
  }
};

// 드래그 종료
const handleTouchEnd = () => {
  isDragging.value = false;
  
  // 드로어의 위치가 화면 높이의 50%를 넘었다면 완전히 펼치기
  if (currentHeight.value > maxHeight.value / 2) {
    expandDrawer();
  } else {
    collapseDrawer();
  }
};

// 드로어 펼치기
const expandDrawer = () => {
  currentHeight.value = maxHeight.value;
};

// 드로어 접기
const collapseDrawer = () => {
  currentHeight.value = minHeight;
};

// 드로어 토글
const toggleDrawer = () => {
  if (currentHeight.value === maxHeight.value) {
    collapseDrawer();
  } else {
    expandDrawer();
  }
};

// 화면 크기 변경 시 최대 높이 업데이트
const handleResize = () => {
  maxHeight.value = window.innerHeight;
  if (currentHeight.value === maxHeight.value) {
    currentHeight.value = window.innerHeight;
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div 
    ref="drawer"
    class="absolute bottom-0 left-0 right-0 w-full bg-white rounded-t-2xl shadow-lg transition-all duration-300 ease-out z-40"
    :style="{
      height: `${currentHeight}px`
    }"
    @click="toggleDrawer"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- 드래그 핸들 -->
    <div class="w-full h-6 flex justify-center items-center cursor-grab">
      <div class="w-10 h-1 bg-gray-200 rounded-full"></div>
    </div>
    
    <!-- 드로어 컨텐츠 -->
    <div 
      ref="drawerContent" 
      class="h-[calc(100%-24px)] overflow-y-auto px-4 py-2"
    >
      <slot></slot>
    </div>
  </div>
</template>