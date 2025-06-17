import { mount } from "@vue/test-utils";
import RituelCard from "@/components/RituelCard.vue";
import FeedbackCard from "@/components/FeedbackCard.vue";
import ConseilCard from "@/components/ConseilCard.vue";

// Teste le composant RituelCard pour vérifier que le nom et la description du rituel sont bien affichés
describe("RituelCard.vue", () => {
  it("affiche le nom et la description du rituel", () => {
    // On crée un objet rituel factice
    const rituel = {
      id: 1,
      name: "Rituel Test",
      description: "Description test",
      image: "",
    };
    // On monte le composant avec les props
    const wrapper = mount(RituelCard, { props: { rituel } });
    // On vérifie que le nom et la description sont présents dans le rendu
    expect(wrapper.text()).toContain("Rituel Test");
    expect(wrapper.text()).toContain("Description test");
  });
});

// Teste le composant FeedbackCard pour vérifier que le nom de l'utilisateur et le message sont affichés
describe("FeedbackCard.vue", () => {
  it("affiche le nom de l’utilisateur et le message", () => {
    // On monte le composant avec les props nécessaires
    const wrapper = mount(FeedbackCard, {
      props: {
        userName: "Alice",
        message: "Super expérience !",
        createdAt: new Date(),
        photo: "",
      },
    });
    // On vérifie que le nom et le message sont présents dans le rendu
    expect(wrapper.text()).toContain("Alice");
    expect(wrapper.text()).toContain("Super expérience !");
  });
});

// Teste le composant ConseilCard pour vérifier que le nom, le rôle et la description sont affichés
describe("ConseilCard.vue", () => {
  it("affiche le nom, le rôle et la description du conseil", () => {
    // On crée un objet conseil factice
    const conseil = {
      id: 1,
      name: "Conseil Test",
      role: "Expert",
      description: "Conseil important",
      img: "",
    };
    // On monte le composant avec les props
    const wrapper = mount(ConseilCard, { props: { conseil } });
    // On vérifie que le nom, le rôle et la description sont présents dans le rendu
    expect(wrapper.text()).toContain("Conseil Test");
    expect(wrapper.text()).toContain("Expert");
    expect(wrapper.text()).toContain("Conseil important");
  });
});

// Teste un exemple simple d'addition
describe("Exemple de test", () => {
  it("additionne correctement", () => {
    // Vérifie que 1 + 1 = 2
    expect(1 + 1).toBe(2);
  });
});
