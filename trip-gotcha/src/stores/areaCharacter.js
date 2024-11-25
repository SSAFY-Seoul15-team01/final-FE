import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const userAreaCharacterStore = defineStore(
  "area-character",
  {
    state: () => ({
      characters: [],
      loading: false, // 로딩 상태
      error: null, // 에러 상태
    }),

    actions: {
      async fetchMemberCharacters(memberId) {
        this.loading = true;
        this.error = null;

        await axios
          .get(`${baseUrl}/area-characters/members/${memberId}`, {
            withCredentials: true,
          })
          .then((response) => {
            this.characters = response.data.areaCharacters;
          })
          .catch((err) => {
            this.error = "Failed to fetch member characters"; // 에러 처리
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
