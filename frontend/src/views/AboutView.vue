<!-- AboutSection.vue -->
<template>
  <section class="py-5 bg-light">
    <div class="container">
      <!-- ===== Titre principal ===== -->
      <header class="text-center mb-5">
        <h1 class="display-5 fw-bold brand-title mb-3">
          Découvrez l'institut de beauté MABÔTÉ
        </h1>
        <p class="lead brand-text mb-0">
          Chez MABÔTÉ, nous combinons expertise, passion et soins sur-mesure
          pour révéler le meilleur de votre beauté.<br />
          <span style="display: block; margin-top: 1rem">
            Notre philosophie : chaque personne est unique et mérite une
            attention personnalisée. Nous vous accueillons dans un cadre raffiné
            et chaleureux, propice à la détente et à la confiance.<br />
            Notre équipe d'esthéticiennes expérimentées met tout en œuvre pour
            vous offrir des prestations d'exception, alliant gestes experts,
            innovations beauté et écoute attentive de vos besoins.
          </span>
        </p>
      </header>

      <!-- ===== Image + description ===== -->
      <div class="row gy-4 align-items-center">
        <!-- image -->
        <div class="col-12 col-md-6">
          <img
            src="@/assets/about.png"
            alt="Esthéticienne prodiguant un soin dans l'institut de beauté MABÔTÉ"
            class="img-fluid rounded-4 shadow-sm"
            loading="lazy"
          />
        </div>

        <!-- complément d’info -->
        <div class="col-12 col-md-6">
          <h2 class="h4 fw-semibold mb-3">Pourquoi choisir MABÔTÉ&nbsp;?</h2>
          <ul class="list-unstyled lh-lg">
            <li>
              ✓ Soins personnalisés réalisés par des expertes beauté, à l'écoute
              de vos envies
            </li>
            <li>
              ✓ Produits professionnels, naturels et technologies de pointe pour
              des résultats visibles
            </li>
            <li>
              ✓ Ambiance cocooning, conseils beauté adaptés et suivi attentionné
              après chaque rendez-vous
            </li>
            <li>
              ✓ Engagement pour votre bien-être global : beauté, relaxation,
              confiance en soi
            </li>
          </ul>

          <router-link
            to="/contact"
            class="btn btn-primary rounded-pill px-4 mt-3 d-flex align-items-center"
            aria-label="Prendre rendez-vous"
          >
            <i class="bi bi-calendar-check me-2"></i>
            Prendre rendez-vous
          </router-link>
        </div>
      </div>

      <!-- Section feedbacks clients -->
      <div class="row mt-5">
        <div class="col-12">
          <h2 class="h4 fw-semibold mb-4 text-center">
            Ils nous ont fait confiance
          </h2>
          <div class="d-flex flex-wrap justify-content-center gap-4">
            <div
              v-for="fb in feedbacks"
              :key="fb.id"
              class="card shadow-sm p-3 mb-3"
              style="max-width: 320px; min-width: 220px"
            >
              <div class="d-flex align-items-center mb-2 flex-column">
                <!-- photo ici -->
                <img
                  v-if="fb.photo"
                  :src="fb.photo"
                  alt="photo feedback"
                  style="
                    width: 96px;
                    height: 96px;
                    object-fit: cover;
                    border-radius: 50%;
                    margin-right: 0;
                    margin-bottom: 12px;
                    box-shadow: 0 2px 12px 0 rgba(185, 108, 83, 0.13);
                    border: 3px solid #b96c53;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                  "
                />
                <span class="fw-bold mt-2">{{ getUserName(fb.userId) }}</span>
              </div>
              <div class="mb-2">"{{ fb.message }}"</div>
              <div class="text-muted small">
                {{ new Date(fb.createdAt).toLocaleDateString() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// aucun script nécessaire pour ce bloc statique
import { ref, onMounted } from "vue";
import { useStoreHelpers } from "@/composables/useStoreHelpers";
import axios from "axios";

const { allUsers, fetchUsers } = useStoreHelpers();
const feedbacks = ref([]);
const users = allUsers;

function getUserName(userId) {
  const user = users.value.find((u) => u.id === userId);
  if (!user) return "Utilisateur";
  return (user.firstName || "") + " " + (user.lastName || "");
}

async function loadFeedbacks() {
  let apiFeedbacks = [];
  try {
    const API_URL = process.env.VUE_APP_API_URL || "";
    const res = await axios.get(`${API_URL}/feedbacks`);
    // Mappe les feedbacks BDD au format attendu par l'affichage
    apiFeedbacks = Array.isArray(res.data)
      ? res.data.map((fb) => ({
          id: fb.id,
          userId: fb.UserId || fb.userId,
          message: fb.comment || fb.message,
          photo: fb.photo || "",
          createdAt: fb.createdAt,
        }))
      : [];
  } catch (e) {
    // Silencieusement ignorer si l'API n'est pas dispo
    apiFeedbacks = [];
  }
  // Feedbacks locaux (feedbacksAll)
  const stored = localStorage.getItem("feedbacksAll");
  const localFeedbacks = stored
    ? JSON.parse(stored).map((fb) => ({
        ...fb,
        userId: fb.userId || fb.UserId,
        message: fb.message || fb.comment,
      }))
    : [];
  // Fusionne et retire les doublons par id
  const all = [
    ...apiFeedbacks,
    ...localFeedbacks.filter(
      (lf) => !apiFeedbacks.some((af) => af.id === lf.id)
    ),
  ];
  feedbacks.value = all;
}

onMounted(() => {
  loadFeedbacks();
  fetchUsers();
});
</script>

<style scoped>
/* ========= palette maison ========= */
:root {
  --brand-primary: #b96c53;
  --brand-dark: #45241b;
}

/* titres & texte */
.brand-title {
  color: var(--brand-primary);
}
.brand-text {
  color: var(--brand-dark);
}

/* petite retouche sur les puces */
ul li::marker {
  color: var(--brand-primary);
}

/* Responsive layout improvements */
@media (max-width: 991.98px) {
  .row.align-items-center {
    flex-direction: column;
    gap: 2rem;
  }
  .col-12.col-md-6 {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
  .col-12.col-md-6:last-child {
    background: #fff;
    border-radius: 1.5rem;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    padding: 2rem 1.5rem 1.5rem 1.5rem;
    margin-top: 1.5rem;
    text-align: center;
  }
  .brand-title,
  .brand-text {
    text-align: center;
  }
  .btn {
    display: inline-flex;
    margin: 0 auto;
  }
}

@media (max-width: 576px) {
  .col-12.col-md-6:last-child {
    padding: 1.2rem 0.5rem 1.5rem 0.5rem;
  }
  .brand-title {
    font-size: 1.5rem;
  }
  .brand-text {
    font-size: 1rem;
  }
}
</style>
