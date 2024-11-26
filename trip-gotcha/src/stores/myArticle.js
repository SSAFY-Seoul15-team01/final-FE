import { defineStore } from 'pinia'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL;

export const useMyArticleStore = defineStore('myArticle', {
  state: () => ({
    articles: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchMyArticles() {
      this.loading = true
      try {
        const response = await axios.get(`${baseURL}/articles/members/${memberId}/sidos/${sidoCode}`, { withCredentials: true })
        console.log(response.data)
        this.articles = response.data.articles

        this.articles.map((article) => {
            article["memberProfile"] = `https://www.gravatar.com/avatar/${article.memberId}?d=identicon&s=40`;
            article.createdAt = article.createdAt.split('T')[0]
        })
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})