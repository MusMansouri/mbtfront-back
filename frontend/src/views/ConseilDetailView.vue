<template>
  <section class="py-5 bg-light min-vh-100">
    <div class="container">
      <router-link to="/conseils" class="btn btn-link retour-btn mb-4">
        <i class="bi bi-arrow-left"></i> Retour à la liste des conseils
      </router-link>
      <div v-if="conseil" class="row justify-content-center">
        <div class="col-md-8">
          <div class="card conseil-detail-card shadow-sm p-4 animate-fadein">
            <div class="detail-img-wrapper mb-3">
              <img
                v-if="conseil.img"
                :src="conseil.img"
                :alt="conseil.name"
                class="card-img-top"
                style="max-height: 220px; object-fit: cover"
                @error="
                  (e) => (e.target.src = '/src/assets/conseil-detail.png')
                "
                loading="lazy"
              />
              <img
                v-else
                src="/src/assets/conseil-detail.png"
                alt="Conseil générique"
                class="card-img-top"
                style="max-height: 220px; object-fit: cover"
              />
            </div>
            <h1 class="h4 fw-bold mb-2 text-center conseil-detail-title">
              {{ conseil.name }}
            </h1>
            <span class="conseil-detail-badge mb-2">{{ conseil.role }}</span>
            <p class="mb-3 conseil-detail-description">
              {{ conseil.description }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-5">
        <div class="spinner-border text-primary"></div>
        <p class="mt-3">Chargement du conseil...</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();
const conseils = computed(() => store.getters["conseils/allConseils"] || []);
const conseil = ref(null);

onMounted(async () => {
  await store.dispatch("conseils/fetchConseils");
  conseil.value =
    conseils.value.find((c) => String(c.id) === route.params.id) || null;
});
</script>

<style scoped>
.retour-btn {
  color: #b96c53;
  font-weight: 600;
  font-size: 1.1rem;
  transition: color 0.18s;
}
.retour-btn:hover,
.retour-btn:focus {
  color: #a05a43;
  text-decoration: underline;
}
.conseil-detail-card {
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px 0 rgba(185, 108, 83, 0.13);
  border: none;
  background: linear-gradient(135deg, #fff6f1 0%, #ffe7d6 100%);
  animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
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
.animate-fadein {
  animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
.detail-img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 420px;
  margin: 0 auto 1.5rem auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(185, 108, 83, 0.13);
}
.card-img-top {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 1rem;
  background: #fff6f1;
}
.conseil-detail-title {
  color: #b96c53;
  text-align: center;
  margin-bottom: 0.3rem;
}
.conseil-detail-badge {
  display: inline-block;
  background: linear-gradient(90deg, #f7e3db 60%, #ffe7d6 100%);
  color: #b96c53;
  border-radius: 1rem;
  font-size: 1.05rem;
  font-weight: 500;
  padding: 0.3em 1.2em;
  margin-bottom: 0.7rem;
  box-shadow: 0 1px 4px 0 rgba(185, 108, 83, 0.07);
  text-align: center;
}
.conseil-detail-description {
  color: #6c757d;
  font-size: 1.08rem;
  text-align: center;
  margin-bottom: 1.2rem;
  line-height: 1.7;
}
@media (max-width: 600px) {
  .conseil-detail-card {
    padding: 1.2rem 0.5rem 1.2rem 0.5rem;
    border-radius: 1rem;
  }
  .detail-img-wrapper {
    width: 90px;
    height: 90px;
  }
  .card-img-top {
    width: 80px;
    height: 80px;
    font-size: 2.2rem;
  }
  .conseil-detail-title {
    font-size: 1.1rem;
  }
  .conseil-detail-badge {
    font-size: 0.95rem;
    padding: 0.2em 0.7em;
  }
}
</style>
