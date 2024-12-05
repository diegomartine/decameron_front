<template>
  <div class="container mt-5">
    <h2>Crear Habitación</h2>
    <form @submit.prevent="createRoom">
      <!-- Nombre del hotel -->
      <div class="mb-3">
        <label for="hotel" class="form-label">Hotel</label>
        <select class="form-select" id="hotel" v-model="form.hotel_id" required>
          <option value="">Seleccione un hotel</option>
          <option
            v-for="(hotel, index) in hotels"
            :key="index"
            :value="hotel.hotel_id"
          >
            {{ hotel.name }} - {{ hotel.city }}
          </option>
        </select>
      </div>

      <!-- Tipo de habitación -->
      <div class="mb-3">
        <label for="roomType" class="form-label">Tipo de Habitación</label>
        <select
          class="form-select"
          id="roomType"
          v-model="form.room_type_id"
          required
        >
          <option value="">Seleccione un tipo</option>
          <option
            v-for="(type, index) in roomTypes"
            :key="index"
            :value="type.room_type_id"
          >
            {{ type.name }}
          </option>
        </select>
      </div>

      <!-- Acomodación -->
      <div class="mb-3">
        <label for="accommodation" class="form-label">Acomodación</label>
        <select
          class="form-select"
          id="accommodation"
          v-model="form.accommodation_id"
          :disabled="!form.room_type_id"
          required
        >
          <option value="">Seleccione una acomodación</option>
          <option
            v-for="(acc, index) in filteredAccommodations"
            :key="index"
            :value="acc.accommodation_id"
          >
            {{ acc.name }}
          </option>
        </select>
      </div>

      <!-- Cantidad de habitaciones -->
      <div class="mb-3">
        <label for="quantity" class="form-label"
          >Cantidad de Habitaciones</label
        >
        <input
          type="number"
          class="form-control"
          id="quantity"
          v-model="form.quantity"
          required
          min="1"
        />
      </div>

      <!-- Botón de Enviar -->
      <button type="submit" class="btn btn-primary">Crear Habitación</button>
    </form>

    <!-- Mensaje de error o éxito -->
    <div
      v-if="message"
      :class="['message-container', messageClass]"
      class="mt-3"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CreateRoom",
  data() {
    return {
      form: {
        hotel_id: "",
        room_type_id: "",
        accommodation_id: "",
        quantity: 1,
      },
      hotels: [], // Lista de hoteles
      roomTypes: [],
      accommodations: [],
      message: "",
      messageClass: "",
    };
  },
  created() {
    this.fetchHotels(); // Obtener los hoteles
    this.fetchRoomTypes(); // Obtener los tipos de habitación
    this.fetchAccommodations(); // Obtener las acomodaciones
  },
  methods: {
    // Obtener la lista de hoteles
    async fetchHotels() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/hoteles");
        this.hotels = response.data; // Guardar los hoteles en la lista
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    },

    // Obtener los tipos de habitación
    async fetchRoomTypes() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/room-types"
        );
        this.roomTypes = response.data;
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    },

    // Obtener las acomodaciones
    async fetchAccommodations() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/accommodations"
        );
        this.accommodations = response.data;
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    },

    // Crear la habitación
    async createRoom() {
      console.log("Hotel ID:", this.form.hotel_id); // Verificar si el ID del hotel está correctamente asignado

      if (!this.form.hotel_id) {
        this.message = "Por favor, seleccione un hotel.";
        this.messageClass = "alert alert-danger";
        setTimeout(() => {
          this.message = "";
        }, 3000); // La alerta desaparecerá después de 3 segundos
        return;
      }

      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/hoteles/${this.form.hotel_id}/rooms`,
          this.form
        );

        console.log(response);

        // Si la creación fue exitosa, mostramos el mensaje de éxito
        this.message = "Habitación creada exitosamente!";
        this.messageClass = "alert alert-success";
        setTimeout(() => {
          this.message = "";
        }, 3000); // La alerta desaparecerá después de 3 segundos
        this.resetForm();
      } catch (error) {
        // Verificar si hay un error y si el mensaje de error viene en la propiedad "invalid"
        if (
          error.response &&
          error.response.data &&
          error.response.data.invalid
        ) {
          // Si el error contiene la clave "invalid", mostramos su mensaje
          this.message = error.response.data.invalid;
        } else {
          // Si no hay un mensaje de error específico, mostramos un mensaje genérico
          this.message = "Error al crear habitación.";
        }

        // Establecemos el estilo para el mensaje de error
        this.messageClass = "alert alert-danger";
        setTimeout(() => {
          this.message = "";
        }, 5000); // La alerta desaparecerá después de 3 segundos

        // También podemos imprimir el error en la consola para depuración
        console.error("Error creating room:", error);
      }
    },

    // Resetear el formulario
    resetForm() {
      this.form = {
        hotel_id: "",
        room_type_id: "",
        accommodation_id: "",
        quantity: 1,
      };
    },
  },
  computed: {
    // Filtrar acomodaciones según el tipo de habitación seleccionado
    filteredAccommodations() {
      return this.accommodations.filter(
        (acc) => acc.room_type_id === this.form.room_type_id
      );
    },
  },
};
</script>

<style scoped>
.message-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centra el mensaje */
  z-index: 9999; /* Asegura que la alerta esté encima de otros elementos */
  width: 80%; /* O cualquier otro valor que se ajuste a tu diseño */
  max-width: 500px; /* Máxima anchura */
}

.message-container .alert {
  margin: 0; /* Elimina el margen para que se alinee correctamente */
}

.home {
  text-align: center;
  margin-top: 50px;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  display: inline-block;
  margin: 0 10px;
}

nav a {
  text-decoration: none;
  color: #42b983;
}

nav a:hover {
  text-decoration: underline;
}
</style>
