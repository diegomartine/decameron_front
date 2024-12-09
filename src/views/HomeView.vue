<template>
  <div class="container mt-5">
    <h2 class="mb-4">Crear Hotel</h2>
    <form @submit.prevent="createHotel">
      <!-- Formulario de datos del hotel -->
      <div class="mb-3">
        <label for="name" class="form-label">Nombre del Hotel</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="hotel.name"
          placeholder="Ingresa el nombre del hotel"
          required
        />
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">Dirección</label>
        <input
          type="text"
          class="form-control"
          id="address"
          v-model="hotel.address"
          placeholder="Ingresa la dirección del hotel"
          required
        />
      </div>

      <div class="mb-3">
        <label for="city" class="form-label">Ciudad</label>
        <input
          type="text"
          class="form-control"
          id="city"
          v-model="hotel.city"
          placeholder="Ingresa la ciudad del hotel"
          required
        />
      </div>

      <div class="mb-3">
        <label for="nit" class="form-label">NIT</label>
        <input
          type="text"
          class="form-control"
          id="nit"
          v-model="hotel.nit"
          placeholder="Ingresa el NIT del hotel"
          required
        />
      </div>

      <div class="mb-3">
        <label for="phone_number" class="form-label">Número de Teléfono</label>
        <input
          type="text"
          class="form-control"
          id="phone_number"
          v-model="hotel.phone_number"
          placeholder="Ingresa el número de teléfono"
          required
        />
      </div>

      <div class="mb-3">
        <label for="max_rooms" class="form-label">Máximo de Habitaciones</label>
        <input
          type="number"
          class="form-control"
          id="max_rooms"
          v-model="hotel.max_rooms"
          placeholder="Ingresa el número máximo de habitaciones"
          required
          min="1"
        />
      </div>

      <button type="submit" class="btn btn-primary">Crear Hotel</button>
    </form>

    <!-- Mensaje de éxito o error -->
    <div v-if="message" class="alert-container">
      <div :class="messageClass" role="alert">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      hotel: {
        name: "",
        address: "",
        city: "",
        nit: "",
        phone_number: "",
        max_rooms: "",
      },
      message: "",
      messageClass: "",
    };
  },
  methods: {
    async createHotel() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_SERVICE_API}/hoteles`,
          this.hotel
        );

        // Si la creación es exitosa, muestra el mensaje de éxito
        this.message =
          response.data.message || "El hotel fue creado exitosamente.";
        this.messageClass = "alert alert-success";

        // Reinicia el formulario
        this.hotel = {
          name: "",
          address: "",
          city: "",
          nit: "",
          phone_number: "",
          max_rooms: "",
        };

        setTimeout(() => {
          this.message = "";
        }, 5000);
      } catch (error) {
        console.error(error);

        // Si hay una respuesta del backend con un mensaje de error, lo muestra
        if (error.response && error.response.data) {
          this.message =
            error.response.data.message ||
            "El nit ingresado ya esta registrado";
        } else {
          // Si no hay respuesta del servidor o algún otro tipo de error
          this.message =
            "Hubo un error al crear el hotel. Por favor, verifica los datos.";
        }

        this.messageClass = "alert alert-danger";

        setTimeout(() => {
          this.message = "";
        }, 5000);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}

.alert-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  z-index: 1050;
}

.alert {
  text-align: center;
}
</style>
