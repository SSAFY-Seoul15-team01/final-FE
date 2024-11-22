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
    // 멤버 정보 조회 (GET) - 로그인한 사용자의 정보 조회
    fetchMember() {
      this.loading = true;
      this.error = null;

      axios.get(`${baseUrl}/members`, { withCredentials: true })
        .then((response) => {
          this.member = response.data;  // 로그인된 멤버 정보 저장
        })
        .catch((err) => {
          this.error = 'Failed to fetch member information';  // 에러 처리
        })
        .finally(() => {
          this.loading = false;  // 로딩 상태 종료
        });
    },

    // 멤버 정보 수정 (PATCH) - 로그인한 사용자의 정보 수정
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

    // 로그인 상태 확인 (GET)
    checkAuthStatus() {
      this.loading = true;
      this.error = null;

      axios.get(`${baseUrl}/auth/status`, { withCredentials: true })
        .then((response) => {
          this.isAuthenticated = response.data.isAuthenticated; // 로그인 상태
          if (this.isAuthenticated) {
            this.member = response.data.member;  // 로그인된 멤버 정보
          }
        })
        .catch((err) => {
          this.isAuthenticated = false;
          this.error = 'Failed to check authentication status';  // 에러 처리
        })
        .finally(() => {
          this.loading = false;  // 로딩 상태 종료
        });
    },

    // 로그아웃 처리
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
});