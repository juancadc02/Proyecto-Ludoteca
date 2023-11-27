export interface Alquiler {
    id?: string;
    usuarioId: string; // ID del usuario que alquila el juego
    juegoId: string;   // ID del juego que se ha alquilado
    fechaAlquiler: Date;
    fechaDevolucionPrevista: Date;
    costoAlquiler: number;
  }