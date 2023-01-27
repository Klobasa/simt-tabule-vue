<template>
 <h1>Changelog</h1>

  <h5>27. 1. 2023</h5>
    <p>V jízdních dobách opravena chyba s duplicitních zobrazením zastávek vzniká po změně databáze.</p>
    <p>Chybové hlášky při výpadku backendu přidány na všechny stránky</p>

  <h5>25. 1. 2023</h5>
    <p>Zprovoznění na nové doméně</p>
    <p>Spustění dispečerské appky</p>
    <p>Opravena chyba s errorem 404 při stisku F5</p>

  <h5>Prosinec - Leden</h5>
    <p>Přesun na nový server</p>
    <p>Zaregistrována a nastavena doména www.simt-tabule.cz a získání certifikátu</p>
    <p>Vývoj dispečerské appky</p>

  <h5>8. 12. 2022</h5>
    <p>- Změněn způsob rozhodování trakce</p>
    <p>- V jízdních dobách přidána možnost výběru denní doby (zatím s jistými chybami)</p>

  <h5>6. 12. 2022</h5>
    <p>- Snad opraven problém s duplikací dat a pády/nenačítání s tím spojené</p>

  <h5>5. 12. 2022</h5>
    <p>- Opravena chyba, kdy občas zmizel celý seznam spojů</p>
    <p>- V seznamu zastávek se načítají linky</p>
    <p>- V seznamu zastávek a ve spojích přidána informace o načítání dat a chybová hláška v případě neúspěchu</p>
    <p>- V aktuálních spojích naformátována informace o posledním stažení dat.</p>

</template>

<script>
export default {
  name: "Changelog.vue"
};
</script>

<style scoped>
  h5 {
    text-align: left;
  }
  p {
    text-align: left;
    margin-bottom: 2px;
  }
</style>