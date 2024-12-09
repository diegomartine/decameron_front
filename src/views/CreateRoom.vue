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
        const response = await axios.get(
          `${process.env.VUE_APP_SERVICE_API}/hoteles`
        );
        this.hotels = response.data; // Guardar los hoteles en la lista
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    },

    // Obtener los tipos de habitación
    async fetchRoomTypes() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_SERVICE_API}/room-types`
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
          `${process.env.VUE_APP_SERVICE_API}/accommodations`
        );
        this.accommodations = response.data;
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    },

    // Crear la habitación
    async createRoom() {
      if (!this.form.hotel_id) {
        this.message = "Por favor, seleccione un hotel.";
        this.messageClass = "alert alert-danger";
        setTimeout(() => {
          this.message = "";
        }, 3000); // La alerta desaparecerá después de 3 segundos
        return;
      }

      try {
        // Realizar la solicitud al backend
        const response = await axios.post(
          `${process.env.VUE_APP_SERVICE_API}/hoteles/${this.form.hotel_id}/rooms`,
          this.form
        );

        // Verificar si el mensaje existe en la respuesta
        if (response.data && response.data.message) {
          // Mostrar el mensaje del backend como una alerta de éxito
          this.message = response.data.message;
          this.messageClass = "alert alert-success";
        } else {
          // Mensaje genérico en caso de una respuesta inesperada
          this.message = "Habitación creada, pero sin mensaje del servidor.";
          this.messageClass = "alert alert-warning";
        }

        // Limpiar el formulario y ocultar el mensaje después de 3 segundos
        setTimeout(() => {
          this.message = "";
        }, 3000);
        this.resetForm();
      } catch (error) {
        // Manejo de errores en caso de fallos en la solicitud
        if (error.response && error.response.data) {
          console.log(error.response.data); // Imprimir la respuesta para depuración

          // Verificar si el error contiene la clave "invalid"
          if (error.response.data.invalid) {
            this.message = error.response.data.invalid;
          } else if (error.response.data.message) {
            // Usar "message" si está disponible
            this.message = error.response.data.message;
          } else {
            // Mensaje genérico si no hay claves esperadas
            this.message = "Error desconocido al crear habitación.";
          }
        } else {
          // Mensaje genérico en caso de error sin respuesta estructurada
          this.message = "Error al crear habitación. Intenta nuevamente.";
        }

        // Estilo para errores
        this.messageClass = "alert alert-danger";
        setTimeout(() => {
          this.message = "";
        }, 5000); // Mostrar el mensaje durante 5 segundos

        // Imprimir el error en la consola para depuración
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
  z-index: 9999;
  width: 80%;
  max-width: 500px;
}

.message-container .alert {
  margin: 0;
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
