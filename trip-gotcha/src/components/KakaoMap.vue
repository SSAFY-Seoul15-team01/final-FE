<script setup>
import { onMounted } from 'vue'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
const kakaoMapApiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;

onMounted(() => {
  // 스크립트 로드 확인
  if (window.kakao && window.kakao.maps) {
    initMap()
  } else {
    // Kakao 맵 스크립트가 아직 로드되지 않은 경우
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapApiKey}&autoload=false`
    script.onload = () => {
      kakao.maps.load(initMap)
    }
    document.head.appendChild(script)
  }
})

const initMap = () => {
  const container = document.getElementById('map')
  const options = {
    center: new kakao.maps.LatLng(37.566826, 126.978656),
    level: 3
  }

  const map = new kakao.maps.Map(container, options)
  searchStore.setMap(map)
}
</script>

<template>
    <div>
        <div id="map" style="width:100%;height:900px;"></div>
    </div>
</template>

<style scoped>

</style>