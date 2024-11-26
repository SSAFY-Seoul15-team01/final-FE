<script setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3'; // d3 모듈 임포트
import { useAreaCharacterStore } from '@/stores/areaCharacter'
import { useMemberStore } from '@/stores/member';
import { useMyArticleStore } from "@/stores/myArticle";
import charactersInfo from "@/assets/json/charactersInfoJson";

const mapRef = ref(null); // 맵을 참조할 ref
const areaCharacterStore = useAreaCharacterStore();
const memberStore = useMemberStore();
const myArticleStore = useMyArticleStore();
const imageSize = 80;

// 캐릭터 그려주는 함수
const addCharacter = async (memberCharacters) => {
    await areaCharacterStore.fetchMemberCharacters(memberStore.member.id);
    const characters = areaCharacterStore.characters;
    characters.forEach((ch) => {
        let cInfo = charactersInfo[ch.sidoId];

        memberCharacters
            .append('text') // text 요소 추가
            .attr('x', cInfo.x)  // 텍스트의 x 좌표
            .attr('y', cInfo.y - 6)  // 텍스트의 y 좌표 (조금 아래에 배치)
            .attr('font-size', '16px') // 폰트 크기 설정
            .attr('fill', 'black')  // 텍스트 색상
            .attr('text-anchor', 'middle')
            .text(cInfo.name); // 텍스트 내용 설정
        memberCharacters
            .append('text') // text 요소 추가
            .attr('x', cInfo.x)  // 텍스트의 x 좌표
            .attr('y', cInfo.y - 22)  // 텍스트의 y 좌표 (조금 아래에 배치)
            .attr('font-size', '12px') // 폰트 크기 설정
            .attr('fill', 'black')  // 텍스트 색상
            .attr('text-anchor', 'middle')
            .text(`[LV: ${ch.level}]`); // 텍스트 내용 설정
        memberCharacters
            .append('image') // image 태그를 사용하여 SVG 아이콘을 추가
            .attr('x', cInfo.x - imageSize / 2) // x 좌표 설정
            .attr('y', cInfo.y - imageSize / 4) // y 좌표 설정
            .attr('width', imageSize) // 아이콘 크기 설정
            .attr('height', imageSize) // 아이콘 크기 설정
            .attr('href', cInfo.href) // 아이콘 파일 경로
            .on('click', function (event) {
                // 클릭 이벤트 리스너 추가
                myArticleStore.fetchMyArticles(memberStore.member.id, ch.sidoId)
                console.log('Character clicked:', cInfo.name);
            })
            .on('mouseenter', function () {
                // 마우스 올리기: 이미지 크기 확대
                d3.select(this)
                    .transition() // 트랜지션 적용
                    .duration(200) // 트랜지션 시간
                    .attr('width', imageSize * 1.1) // 크기 확대
                    .attr('height', imageSize * 1.1) // 크기 확대
                    .attr('x', cInfo.x - (imageSize * 1.1) / 2) // 확대된 크기에 맞게 x 조정
            })
            .on('mouseleave', function () {
                // 마우스 떠나기: 이미지 원래 크기로 복귀
                d3.select(this)
                    .transition() // 트랜지션 적용
                    .duration(200) // 트랜지션 시간
                    .attr('width', imageSize) // 원래 크기
                    .attr('height', imageSize) // 원래 크기
                    .attr('x', cInfo.x - imageSize / 2) // 원래 크기에 맞게 x 조정
            });
    });

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
    <div class="relative w-full aspect-square mb-8 bg-indigo-100 rounded-md">
        <object ref="mapRef" data="/src/assets/svg/character-map.svg" type="image/svg+xml"></object>
    </div>
</template>

<style scoped></style>