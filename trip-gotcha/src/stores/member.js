import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const useMemberStore = defineStore("member", {
  state: () => ({
    member: null, // 멤버 정보
    loading: false, // 로딩 상태
    error: null, // 에러 상태
    isAuthenticated: false, // 로그인 상태 여부
  }),

  actions: {
    fetchMember() {
      this.loading = true;
      this.error = null;
      console.log("야호")

      axios.get(`${baseUrl}/members`, { withCredentials: false })
        .then((response) => {
          console.log(response.data)
          this.member = response.data;  // 로그인된 멤버 정보 저장
          this.isAuthenticated = true;
        })
        .catch((err) => {
          this.error = 'Failed to fetch member information';  // 에러 처리
        })
        .finally(() => {
          this.loading = false;  // 로딩 상태 종료
        });
    },

    updateMember(memberData) {
      this.loading = true;
      this.error = null;

      axios.patch(`${baseUrl}/members`, memberData, { withCredentials: true })
        .then((response) => {
          this.member = response.data;  // 수정된 멤버 정보 저장
        })
        .catch((err) => {
          this.error = 'Failed to update member information';  // 에러 처리
        })
        .finally(() => {
          this.loading = false;  // 로딩 상태 종료
        });
    },

    login(socialType) {
      window.location.href = `${baseUrl}/auth/login/${socialType}`;
    },

    logout() {
      this.loading = true;
      this.error = null;

      axios.post(`${baseUrl}/auth/logout`, {}, { withCredentials: true })
        .then(() => {
          this.isAuthenticated = false;
          this.member = null;  // 로그아웃 후 멤버 정보 초기화
        })
        .catch((err) => {
          this.error = 'Failed to log out';  // 에러 처리
        })
        .finally(() => {
          this.loading = false;  // 로딩 상태 종료
        });
    },
  },
},
{
  persist: true,
  },
);