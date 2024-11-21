<script setup lang="js">
import { ref, onMounted } from 'vue';
import * as d3 from 'd3'; // d3 모듈 임포트
import settingIcon from "@/assets/svg/setting.svg"
import personCircleIcon from "@/assets/svg/person-circle.svg"
import charactersInfoJson from "@/assets/json/charactersInfoJson";

const mapRef = ref(null); // 맵을 참조할 ref
const profileImageUrl = ""; // 여기에 프로필 사진 URL이 없을 경우 기본값으로 설정

// 캐릭터 그려주는 함수
const addCharacter = (characterMap) => {
    Object.entries(charactersInfoJson).map(([key, value]) => {
        // todo: 데이터 받아와서 캐릭터 존재하는지 확인 및 레벨 경험치 url 적용하기
        if (true) {
            characterMap
                .append('text') // text 요소 추가
                .attr('x', value.x - 6)  // 텍스트의 x 좌표
                .attr('y', value.y + 25)  // 텍스트의 y 좌표 (조금 아래에 배치)
                .attr('font-size', '12px') // 폰트 크기 설정
                .attr('fill', 'black')  // 텍스트 색상
                .text(value.name); // 텍스트 내용 설정
            characterMap
                .append('image') // image 태그를 사용하여 SVG 아이콘을 추가
                .attr('x', value.x) // x 좌표 설정
                .attr('y', value.y) // y 좌표 설정
                .attr('width', 10) // 아이콘 크기 설정
                .attr('height', 10) // 아이콘 크기 설정
                .attr('href', value.href); // 아이콘 파일 경로
        }
    })
}

// 맵이 로드된 후 줌 기능을 적용하는 함수
const applyZoom = () => {
    const objectElement = mapRef.value;

    if (objectElement) {
        const svgDocument = objectElement.contentDocument; // object 안의 SVG 문서에 접근

        if (svgDocument) {
            const svgElement = d3.select(svgDocument); // SVG 요소 선택
            addCharacter(svgElement.select('svg'))

            // 줌 설정
            const zoom = d3.zoom()
                .scaleExtent([0.67, 3]) // 줌의 최소 및 최대 배율 설정
                .translateExtent([[-103, -138], [414 + 103, 552 + 138]])
                .on('zoom', function (event) {
                    svgElement.selectAll('svg *').attr('transform', event.transform); // 줌 및 이동 효과 적용
                });

            // 줌 기능을 SVG에 적용
            svgElement.select('svg').call(zoom);
        }
    }
};

onMounted(() => {
    const objectElement = mapRef.value;
    objectElement.onload = applyZoom;
});

</script>

<template>
    <div class="flex flex-col items-center p-4 h-screen bg-indigo-50"> <!-- indigo 계열 배경색 적용 -->
        <!-- 설정 버튼 -->
        <button
            class="absolute top-4 right-4 bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <component :is="settingIcon" />
        </button>

        <!-- 프로필 (왼쪽 정렬) -->
        <div class="flex items-center justify-start mb-8 w-full">
            <img v-if="profileImageUrl" class="w-24 h-24 rounded-full object-cover mr-4" :src="profileImageUrl"
                alt="Profile Picture" />

            <div class="w-24 h-24 overflow-hidden relative">
                <component :is="personCircleIcon" class="mr-4"
                    style="transform: scale(5); transform-origin: left top;" />
            </div>
            <span class="text-lg font-semibold">사용자 닉네임</span>
        </div>
        <!-- 맵 -->
        <div class="relative w-full aspect-square mb-8 bg-indigo-100 rounded-md">
            <object ref="mapRef" data="/src/assets/svg/character-map.svg" type="image/svg+xml"></object>
        </div>
        <!-- 여행 인증 버튼 (가로로 길게, indigo 계열 색상 적용) -->
        <button
            class="w-full bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            여행인증
        </button>

    </div>
</template>

<style scoped></style>
