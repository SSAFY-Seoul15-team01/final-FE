import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const useAttractionStore = defineStore(
  "attraction",
  {
    state: () => ({
      attractions: [],
      loading: false, // 로딩 상태
      error: null, // 에러 상태
    }),

    actions: {
      async fetchAttractions(cursorId, lat, lng) {
        console.log(lat, lng)
        this.loading = true;
        this.error = null;

        await axios({
            method: 'get',
            url: `${baseUrl}/attractions`,
            params: {
              cursorId: cursorId,
            },
            data: {
              latitude: lat,
              longitude: lng,
            },
            withCredentials: true,
          })
          .then((response) => {
            this.attractions = response.data.attractions;
            console.log(this.attractions)
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
