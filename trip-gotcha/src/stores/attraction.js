import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const useAttractionStore = defineStore(
  "attraction",
  {
    state: () => ({
      attractions: [],
      lastId: null,
      loading: false, // 로딩 상태
      error: null, // 에러 상태
    }),

    actions: {
      async fetchAttractions(cursorId, lat, lng) {
        console.log(lat, lng);
        this.loading = true;
        this.error = null;

        await axios
          .get(
            `${baseUrl}/attractions?latitude=${lat}&longitude=${lng}&cursorId=${cursorId}`,
            { withCredentials: true }
          )
          .then((response) => {
            this.attractions = [
              ...this.attractions,
              ...response.data.attractions,
            ];
            this.lastId = response.data.lastId;
          })
          .catch((err) => {
            this.error = "Failed to fetch attractions"; // 에러 처리
          })
          .finally(() => {
            this.loading = false; // 로딩 상태 종료
          });
      },
    },
  },
  {
    persist: true,
  }
);
