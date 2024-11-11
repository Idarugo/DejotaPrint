<template>
  <main class="container">
    <div class="garantia-container">
      <h1>Garantía</h1>
      <h2>Términos y Condiciones</h2>
      <p>
        Todos nuestros productos están cubiertos por una garantía de 1 año
        contra defectos de fabricación. Si su producto presenta algún problema
        durante este período, lo reemplazaremos o repararemos sin costo alguno.
      </p>
      <p>
        La garantía no cubre el desgaste normal, el uso indebido, la negligencia
        o los daños accidentales. Si necesita hacer una reclamación, comuníquese
        con nuestro servicio de atención al cliente y le ayudaremos a resolver
        el problema.
      </p>
      <h2>Productos Cubiertos</h2>
      <ul>
        <li>Lanyards Personalizados</li>
        <li>Llaveros Personalizados</li>
        <li>Porta Credenciales Personalizados</li>
      </ul>
      <button class="contact-button">Contactar Servicio al Cliente</button>
    </div>
  </main>
</template>

<script>
export default {
  name: "Garantia",
};
</script>

<style scoped>
.container {
  margin-top: 100px; /* Ajusta según la altura del header */
  display: flex;
  justify-content: center;
}

.garantia-container {
  max-width: 800px;
  padding: 20px;
}

h1 {
  text-align: center;
  font-weight: bold;
}

h2 {
  font-weight: bold;
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin-bottom: 10px;
}

.contact-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
}

.contact-button:hover {
  background-color: #333;
}
</style>
