<script setup>
import BottomSheet from "@/components/BottomSheet.vue";
import GNB from "@/components/Gnb.vue";
import MobileLayout from "@/components/Layout.vue";
import ArticleList from "@/components/ArticleList.vue";
import SearchItem from "@/components/SearchItem.vue";
import KakaoMap from "@/components/KakaoMap.vue";
</script>

<template>
    <MobileLayout>
        <div class="grow relative">
            <SearchItem/>
            <KakaoMap/>
        </div>
        <GNB />
        <BottomSheet>
            <ArticleList/>
        </BottomSheet>
    </MobileLayout>
</template>