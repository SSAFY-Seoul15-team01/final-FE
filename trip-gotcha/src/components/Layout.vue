<template>
    <div class="min-h-screen w-full bg-gray-50 relative">
        <div class="relative w-full h-screen sm:max-w-[450px] mx-auto bg-white shadow-lg overflow-hidden flex flex-col">
            <!-- 상단 인디케이터 (데스크톱) -->
            <div
                class="hidden sm:block absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-200/80 rounded-full mt-3 z-50">
            </div>

            <!-- 메인 컨텐츠 -->
            <div class="relative flex-1 overflow-hidden flex flex-col">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* iOS Safari에서 전체 높이 문제 해결 */
@supports (-webkit-touch-callout: none) {
    .h-screen {
        height: -webkit-fill-available;
    }

    .min-h-screen {
        min-height: -webkit-fill-available;
    }
}

/* Firefox와 Chrome에서 스크롤바 스타일링 */
@supports (scrollbar-width: thin) {
    * {
        scrollbar-width: thin;
        scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
    }
}

::-webkit-scrollbar {
    width: 3px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(59, 130, 246, 0.3);
    border-radius: 3px;
}
</style>