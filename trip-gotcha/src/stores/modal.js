import { defineStore } from "pinia";

export const useModalStore = defineStore(
    "modal",
    {
      state: () => ({
        isFileUploadModalOpen: false,
      }),
  
      actions: {
        openFileUploadModal() {
          this.isFileUploadModalOpen = true;
        },
        closeFileUploadModal() {
          this.isFileUploadModalOpen = false;
        },
      },
    },
    {
      persist: true,
    }
  );
  