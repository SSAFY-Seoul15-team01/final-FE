import { defineStore } from "pinia";

export const useLocationStore = defineStore(
    "location",
    {
      state: () => ({
        latitude: null,
        longitude: null,
      }),
      actions: {
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.latitude = position.coords.latitude;
                        this.longitude = position.coords.longitude;
                    },
                    (error) => {
                        console.error("위치를 가져오는 데 실패했습니다:", error);
                    }
                );
            } else {
                console.error("Geolocation을 지원하지 않는 브라우저입니다.");
            }
        },
      },
    },
    {
      persist: true,
    }
  );
  