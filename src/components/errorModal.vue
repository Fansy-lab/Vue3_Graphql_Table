<template>
  <div class="modal-wrapper">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ errorData.title }}</h2>
        <button @click="$emit('closeClicked')" class="modal-close-btn">
          ×
        </button>
      </div>
      <div class="modal-body">
        <p>{{ errorData.message }}</p>
      </div>
    </div>
    <div class="modal-overlay"></div>
  </div>
</template>

<script setup lang="ts">
import type { ErrorData } from "@/interfaces/errorData";

const props = defineProps({
  errorData: {
    type: Object as () => ErrorData,
    required: true,
  },
});
</script>
<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  z-index: 10;
  max-width: 50rem;
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-header h2 {
  margin: 0;
}

.modal-close-btn {
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

.modal-close-btn:hover {
  opacity: 0.7;
}

.modal-body {
  margin-bottom: 1rem;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
}
</style>
