<template>
  <footer class="site-footer">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h6>Acerca de Nosotros</h6>
          <p class="text-justify">
            Somos una empresa dedicada a ofrecer soluciones creativas para tus
            necesidades de identidad visual. En <strong>Tu Empresa</strong>, nos
            enfocamos en brindar productos de alta calidad como credenciales en
            PVC, lanyards personalizados, llaveros únicos y mucho más. Nuestra
            misión es ayudarte a destacar con diseños innovadores y servicios
            que superen tus expectativas.
          </p>
        </div>

        <div class="col-xs-6 col-md-3">
          <h6>Categorías</h6>
          <ul class="footer-links">
            <li><a href="#productos">Productos</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <!-- Puedes agregar más categorías según tus necesidades -->
          </ul>
        </div>

        <div class="col-xs-6 col-md-3">
          <h6>Enlaces Rápidos</h6>
          <ul class="footer-links">
            <li>
              <router-link to="/blog" class="nav-link">Blog</router-link>
            </li>
            <li>
              <router-link to="/servicios" class="nav-link"
                >Servicios</router-link
              >
            </li>
            <li>
              <router-link to="/contacto" class="nav-link"
                >Contacto</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <hr />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-sm-6 col-xs-12">
          <p class="copyright-text">
            Derechos de autor &copy; 2024 Todos los derechos reservados por
            <a href="#">DejotaPrint</a>.
          </p>
        </div>

        <div class="col-md-4 col-sm-6 col-xs-12">
          <ul class="social-icons">
            <li>
              <a class="facebook" href="#"
                ><i class="fa-brands fa-facebook"></i
              ></a>
            </li>
            <li>
              <a class="twitter" href="#"><i class="fa fa-twitter"></i></a>
            </li>
            <li>
              <a class="instagram" href="#"
                ><i class="fa-brands fa-instagram"></i
              ></a>
            </li>
            <!-- Puedes agregar más iconos de redes sociales según tus necesidades -->
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style>
@import "../assets/styles/components/footer.css";
</style>