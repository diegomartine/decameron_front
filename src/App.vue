<template>
  <div>
    <!-- Navbar fija en la parte superior -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                data-datarouter=""
                @click="redireccion($event)"
                href="#"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-datarouter="Createroom"
                @click="redireccion($event)"
                href="#"
                >Crear Habitacion</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-datarouter="Listhotel"
                @click="redireccion($event)"
                href="#"
                >Listar hoteles</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";

export default {
  name: "App",
  components: {
    RouterView,
  },
  methods: {
    redireccion(event) {
      var router = event.target.getAttribute("data-datarouter");
      const ruta = `/${router}`;
      this.$router.push(ruta);
    },
  },
};
</script>

<style>
/* Asegurarse de que el contenido no quede oculto detrás del nav fijo */
.content {
  padding-top: 70px; /* Ajustar según la altura del navbar */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
