<template>
 <h1>Changelog</h1>

  <h5>5. 12. 2022</h5>
    <p>- Opravena chyba, kdy občas zmizel celý seznam spojů</p>
    <p>- V seznamu zastávek se načítají linky</p>
    <p>- V seznamu zastávek a ve spojích přidána informace o načítání dat a chybová hláška v případě neúspěchu</p>
    <p>- V aktuálnbích spojích naformátována informace o posledním stažení dat.</p>

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