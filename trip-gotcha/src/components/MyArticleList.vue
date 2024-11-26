<script setup>
import { storeToRefs } from 'pinia'
import { useMyArticleStore } from '@/stores/myArticle'
import Article from './Article.vue';

const store = useMyArticleStore()
const { articles, loading, error } = storeToRefs(store)

</script>

<template>
    <div>
        <div v-if="loading">로딩 중...</div>
        <div v-else-if="error">에러 발생: {{ error }}</div>
        <div v-else>
            <Article v-for="article in articles" :key="article.id" :article="article" />
        </div>
    </div>
</template>

<style scoped></style>