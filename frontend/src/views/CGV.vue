<template>
  <div class="cgv-container">
    <h1 class="cgv-title">Conditions Générales de Vente</h1>

    <nav class="cgv-toc">
      <ul>
        <li><a href="#objet">1. Objet</a></li>
        <li><a href="#produits">2. Produits et services</a></li>
        <li><a href="#commande">3. Commande</a></li>
        <li><a href="#prix">4. Prix</a></li>
        <li><a href="#paiement">5. Paiement</a></li>
        <li><a href="#livraison">6. Livraison</a></li>
        <li><a href="#retractation">7. Droit de rétractation</a></li>
        <li><a href="#garanties">8. Garanties et réclamations</a></li>
        <li><a href="#responsabilite">9. Responsabilité</a></li>
        <li><a href="#donnees">10. Données personnelles</a></li>
        <li><a href="#droit">11. Droit applicable</a></li>
      </ul>
    </nav>

    <section id="objet">
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions générales de vente (CGV) régissent les ventes
        de produits et services proposés sur le site MABOTE.com. Toute commande
        implique l’acceptation sans réserve des présentes CGV.
      </p>
    </section>

    <section id="produits">
      <h2>2. Produits et services</h2>
      <p>
        Les caractéristiques essentielles des produits et services sont
        présentées sur le site. Les photographies n’ont pas de valeur
        contractuelle.
      </p>
    </section>

    <section id="commande">
      <h2>3. Commande</h2>
      <p>
        Le client passe commande en ligne via le site. Toute commande vaut
        acceptation des prix et descriptions des produits disponibles à la
        vente.
      </p>
    </section>

    <section id="prix">
      <h2>4. Prix</h2>
      <p>
        Les prix sont indiqués en euros, toutes taxes comprises (TTC).
        MABOTE.com se réserve le droit de modifier ses prix à tout moment, mais
        les produits seront facturés sur la base des tarifs en vigueur au moment
        de la validation de la commande.
      </p>
    </section>

    <section id="paiement">
      <h2>5. Paiement</h2>
      <p>
        Le paiement s’effectue en ligne par carte bancaire ou tout autre moyen
        proposé sur le site. La commande sera considérée comme effective après
        confirmation de l’accord des centres de paiement bancaire.
      </p>
    </section>

    <section id="livraison">
      <h2>6. Livraison</h2>
      <p>
        Les produits sont livrés à l’adresse indiquée par le client lors de la
        commande. Les délais de livraison sont donnés à titre indicatif.
      </p>
    </section>

    <section id="retractation">
      <h2>7. Droit de rétractation</h2>
      <p>
        Conformément à la législation en vigueur, le client dispose d’un délai
        de 14 jours à compter de la réception de sa commande pour exercer son
        droit de rétractation sans avoir à justifier de motifs ni à payer de
        pénalités.
      </p>
    </section>

    <section id="garanties">
      <h2>8. Garanties et réclamations</h2>
      <p>
        Les produits bénéficient de la garantie légale de conformité et de la
        garantie contre les vices cachés. Pour toute réclamation, le client peut
        contacter le service client via la page de contact du site.
      </p>
    </section>

    <section id="responsabilite">
      <h2>9. Responsabilité</h2>
      <p>
        MABOTE.com ne saurait être tenue pour responsable des dommages résultant
        d’une mauvaise utilisation du produit acheté.
      </p>
    </section>

    <section id="donnees">
      <h2>10. Données personnelles</h2>
      <p>
        Les informations collectées sont nécessaires à la gestion de la commande
        et à l’amélioration des services. Elles sont traitées conformément à la
        politique de confidentialité disponible sur le site.
      </p>
    </section>

    <section id="droit">
      <h2>11. Droit applicable</h2>
      <p>
        Les présentes CGV sont soumises au droit français. En cas de litige, les
        tribunaux compétents seront ceux du ressort du siège social de
        l’entreprise.
      </p>
    </section>

    <button class="back-to-top" @click="scrollToTop">Retour en haut</button>
  </div>
</template>

<script setup>
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style scoped>
.cgv-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: #fff;
  border-radius: 8px;
}
.cgv-title {
  text-align: center;
  margin-bottom: 2rem;
}
.cgv-toc {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 2rem;
}
.cgv-toc ul {
  list-style: none;
  padding: 0;
  margin: 0;
  columns: 2;
  column-gap: 2rem;
}
.cgv-toc li {
  margin-bottom: 0.5rem;
}
.cgv-toc a {
  color: #1976d2;
  text-decoration: none;
}
.cgv-toc a:hover {
  text-decoration: underline;
}
section {
  margin-bottom: 2.5rem;
}
.back-to-top {
  display: block;
  margin: 2rem auto 0 auto;
  padding: 0.5rem 1.5rem;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.back-to-top:hover {
  background: #125ea2;
}
</style>
