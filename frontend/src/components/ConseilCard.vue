<template>
  <div class="conseil-card shadow-sm animate-fadein">
    <div class="conseil-img-wrapper">
      <img
        v-if="conseil.img"
        :src="conseil.img"
        class="conseil-img"
        :alt="'Image du conseil ' + conseil.name"
        @error="onImgError"
      />
      <img
        v-else
        src="/src/assets/conseil1.png"
        class="conseil-img"
        alt="Conseil générique"
      />
    </div>
    <div class="conseil-content">
      <h3 class="conseil-title">{{ conseil.name }}</h3>
      <span class="conseil-badge">{{ conseil.role }}</span>
      <p class="conseil-description">{{ conseil.description }}</p>
      <router-link
        v-if="
          conseil.id !== undefined && conseil.id !== null && conseil.id !== ''
        "
        :to="{ name: 'ConseilDetail', params: { id: conseil.id } }"
        class="conseil-btn"
        :aria-label="'Voir le détail du conseil ' + conseil.name"
      >
        <i class="bi bi-info-circle me-1"></i>
        Détail
      </router-link>
      <button v-else disabled class="conseil-btn conseil-btn-disabled">
        <i class="bi bi-info-circle me-1"></i>
        Détail indisponible
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  conseil: {
    type: Object,
    required: true,
  },
});
function onImgError(e) {
  e.target.src = "/src/assets/conseil1.png";
}
</script>

<style scoped>
.conseil-card {
  background: linear-gradient(135deg, #fff6f1 0%, #ffe7d6 100%);
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px 0 rgba(185, 108, 83, 0.1);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.18s, border 0.18s, transform 0.18s;
  min-width: 260px;
  max-width: 340px;
  margin: 0 auto;
  animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
.conseil-card:hover {
  transform: translateY(-7px) scale(1.03);
  box-shadow: 0 8px 32px 0 rgba(185, 108, 83, 0.18);
}
.conseil-img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 80px;
  margin-bottom: 1.2rem;
  border-radius: 0.7rem;
  background: #f8f8f8;
  box-shadow: 0 2px 8px 0 rgba(185, 108, 83, 0.07);
  overflow: hidden;
}
.conseil-img {
  width: 116px;
  height: 76px;
  object-fit: cover;
  border-radius: 0.6rem;
  border: 2px solid #fff;
  box-shadow: 0 1px 4px 0 rgba(185, 108, 83, 0.1);
  background: #fff6f1;
  font-size: 2.5rem;
  color: #b96c53;
}
.conseil-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #b96c53;
  margin-bottom: 0.3rem;
  text-align: center;
}
.conseil-badge {
  display: inline-block;
  background: linear-gradient(90deg, #f7e3db 60%, #ffe7d6 100%);
  color: #b96c53;
  border-radius: 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.25em 1em;
  margin-bottom: 0.7rem;
  box-shadow: 0 1px 4px 0 rgba(185, 108, 83, 0.07);
}
.conseil-description {
  color: #6c757d;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1.2rem;
  min-height: 48px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 3;
  max-height: 4.5em;
}
.conseil-btn {
  display: block;
  width: 100%;
  background: linear-gradient(90deg, #b96c53 60%, #e7bfae 100%);
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.6em 0;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: background 0.18s, color 0.18s;
  margin-top: 0.2rem;
  box-shadow: 0 1px 4px 0 rgba(185, 108, 83, 0.08);
}
.conseil-btn:hover,
.conseil-btn:focus {
  background: linear-gradient(90deg, #a05a43 60%, #b96c53 100%);
  color: #fff;
}
.conseil-btn-disabled {
  background: #e0e0e0;
  color: #aaa;
  cursor: not-allowed;
}
@media (max-width: 600px) {
  .conseil-card {
    padding: 1.2rem 0.5rem 1.2rem 0.5rem;
    min-width: 180px;
    border-radius: 1rem;
  }
  .conseil-img-wrapper {
    width: 80px;
    height: 80px;
  }
  .conseil-img {
    width: 70px;
    height: 70px;
    font-size: 2rem;
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
