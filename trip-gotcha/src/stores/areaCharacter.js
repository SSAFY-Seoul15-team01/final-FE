import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const useAreaCharacterStore = defineStore(
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
      // 파일 업로드 함수
      uploadFile(imageFile, attractionId) {
        if (!imageFile || !attractionId) {
          throw new Error("파일과 관광지 번호가 필요합니다.");
        }

        this.loading = true;
        this.error = null;

        const formData = new FormData();
        formData.append("imageFile", imageFile);

        const url = `${baseUrl}/area-characters/attractions/${attractionId}`;

        axios
          .post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true, // 쿠키나 인증 정보를 포함하여 요청
          })
          .then((response) => {
            console.log("파일 업로드 성공:", response.data);
            // 성공적으로 업로드 후 필요한 상태 업데이트 (예: 관광지 데이터 다시 가져오기)
          })
          .catch((err) => {
            this.error = "파일 업로드 실패"; // 에러 처리
            console.error("파일 업로드 중 오류 발생:", err);
          })
          .finally(() => {
            this.loading = false;
          });
      },
    },
  },
  {
    persist: true,
  }
);
