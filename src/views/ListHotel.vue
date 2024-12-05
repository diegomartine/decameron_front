<template>
    <div class="container mt-4">
      <h2>Lista de Hoteles</h2>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>NIT</th>
            <th>Teléfono</th>
            <th>Max. Habitaciones</th>
            <th>Habitaciones Disponibles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(hotel, index) in hotels" :key="hotel.hotel_id">
            <!-- Generar un ID secuencial a partir del índice + 1 -->
            <td>{{ index + 1 }}</td>
            <td>{{ hotel.name }}</td>
            <td>{{ hotel.address }}</td>
            <td>{{ hotel.city }}</td>
            <td>{{ hotel.nit }}</td>
            <td>{{ hotel.phone_number || "No disponible" }}</td>
            <td>{{ hotel.max_rooms }}</td>
            <td :style="getRoomAvailabilityStyle(hotel.hotel_id)">
              {{ calculateAvailableRooms(hotel.hotel_id) }} Habitaciones Disponibles
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "ListHotel",
    data() {
      return {
        hotels: [],
        rooms: [], // Array para almacenar las habitaciones
      };
    },
    mounted() {
      this.fetchHotels();
      this.fetchRooms(); // Cargar habitaciones cuando la página se monte
    },
    methods: {
      // Cargar la lista de hoteles desde la API
      async fetchHotels() {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/hoteles");
          this.hotels = response.data; // Cargar la lista de hoteles
        } catch (error) {
          console.error("Error al conectar con la API", error);
        }
      },
  
      // Cargar las habitaciones de todos los hoteles desde la API
      async fetchRooms() {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/hoteles/rooms");
          this.rooms = response.data; // Cargar las habitaciones
        } catch (error) {
          console.error("Error al conectar con las habitaciones", error);
        }
      },
  
      // Calcular las habitaciones disponibles para un hotel
      calculateAvailableRooms(hotel_id) {
        const hotelRooms = this.rooms.filter(room => room.hotel_id === hotel_id);
        let totalAssignedRooms = 0;
  
        // Sumar la cantidad de habitaciones asignadas para este hotel
        hotelRooms.forEach(room => {
          totalAssignedRooms += room.quantity;
        });
  
        // Calcular la cantidad de habitaciones disponibles
        const hotel = this.hotels.find(h => h.hotel_id === hotel_id);
        const availableRooms = hotel ? hotel.max_rooms - totalAssignedRooms : 0;
  
        return availableRooms;
      },
  
      // Obtener el estilo para las habitaciones disponibles
      getRoomAvailabilityStyle(hotel_id) {
        const availableRooms = this.calculateAvailableRooms(hotel_id);
        const hotel = this.hotels.find(h => h.hotel_id === hotel_id);
  
        if (!hotel || availableRooms <= 0) {
          return { backgroundColor: "gray", color: "white" }; // No disponible
        }
  
        const percentage = (availableRooms / hotel.max_rooms) * 100;
  
        if (percentage > 50) {
          return { backgroundColor: "greenyellow", color: "black" }; // Más del 50% disponible
        } else if (percentage <= 50 && percentage > 25) {
          return { backgroundColor: "yellow", color: "black" }; // Entre 25% y 50% disponible
        } else if (availableRooms === 1) {
          return { backgroundColor: "red", color: "white" }; // Solo 1 habitación disponible
        } else {
          return { backgroundColor: "red", color: "white" }; // Menos del 25% disponible
        }
      },
    },
  };
  </script>
  
  <style scoped>
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
  