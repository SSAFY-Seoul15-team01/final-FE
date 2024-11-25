<script setup>
import BottomSheet from "@/components/BottomSheet.vue";
import GNB from "@/components/Gnb.vue";
import MobileLayout from "@/components/Layout.vue";
import ArticleList from "@/components/ArticleList.vue";
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
const coordinate = {
  lat: 37.566826,
  lng: 126.9786567
};
</script>

<template>
    <MobileLayout>
        <div class="grow bg-black">
            <KakaoMap :width="450" :height="1000" :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true">
                <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
            </KakaoMap>
        </div>
        <GNB />
        <BottomSheet>
            <ArticleList/>
        </BottomSheet>
    </MobileLayout>
</template>