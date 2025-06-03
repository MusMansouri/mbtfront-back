<template>
  <div class="card shadow-sm p-3 mb-3 feedback-card" :style="cardStyle">
    <div class="d-flex align-items-center mb-2 flex-column">
      <img
        v-if="photo"
        :src="photo"
        alt="photo feedback"
        class="feedback-avatar"
      />
      <img
        v-else
        src="/src/assets/feedback1.png"
        alt="avatar générique feedback"
        class="feedback-avatar"
      />
      <span class="fw-bold mt-2">{{ userName }}</span>
    </div>
    <div class="mb-2 feedback-message">"{{ message }}"</div>
    <div class="text-muted small">
      {{ formattedDate }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  userName: { type: String, default: "Utilisateur" },
  message: { type: String, required: true },
  photo: { type: String, default: "" },
  createdAt: { type: [String, Date], required: true },
  cardStyle: {
    type: Object,
    default: () => ({ maxWidth: "340px", minWidth: "220px" }),
  },
});
const formattedDate = computed(() => {
  return new Date(props.createdAt).toLocaleDateString();
});
</script>

<style scoped>
.feedback-card {
  background: linear-gradient(135deg, #fff6f1 0%, #ffe7d6 100%);
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px 0 rgba(185, 108, 83, 0.13);
  border: none;
  padding: 2rem 1.2rem 1.5rem 1.2rem;
  margin: 0.5rem auto;
  transition: transform 0.3s, box-shadow 0.3s;
  max-width: 340px;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
.feedback-card:hover {
  transform: translateY(-7px) scale(1.03);
  box-shadow: 0 8px 32px 0 rgba(185, 108, 83, 0.18);
}
.feedback-avatar {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.7rem;
  margin-bottom: 12px;
  box-shadow: 0 2px 12px 0 rgba(185, 108, 83, 0.13);
  border: 3px solid #b96c53;
  background: #fff6f1;
  font-size: 2.5rem;
  color: #b96c53;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.fw-bold.mt-2 {
  color: #b96c53;
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
}
.feedback-message {
  background: #fff;
  border-radius: 1rem;
  padding: 1rem 1.2rem;
  color: #6c757d;
  font-size: 1.08rem;
  text-align: center;
  margin-bottom: 1.2rem;
  line-height: 1.7;
  box-shadow: 0 1px 4px 0 rgba(185, 108, 83, 0.07);
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 4;
  max-height: 6em;
  min-height: 3em;
}
.text-muted.small {
  color: #b96c53 !important;
  font-size: 0.98rem;
  margin-top: 0.2rem;
}
@media (max-width: 600px) {
  .feedback-card {
    padding: 1.2rem 0.5rem 1.2rem 0.5rem;
    border-radius: 1rem;
    max-width: 98vw;
  }
  .feedback-avatar {
    width: 70px;
    height: 70px;
    font-size: 2rem;
  }
  .feedback-message {
    font-size: 0.98rem;
    padding: 0.7rem 0.6rem;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
