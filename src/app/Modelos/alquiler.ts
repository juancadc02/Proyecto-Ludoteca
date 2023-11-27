export interface Alquiler {
    id?: string;
    nombreUsuario: string; // ID del usuario que alquila el juego
    nombreJuego: string;   // ID del juego que se ha alquilado
    fechaAlquiler?: Date;
    fechaDevolucionPrevista: Date;
    costoAlquiler: number;
    totalDiasAlquiler:number;
    alquilerDevuelto:boolean;
    
  }