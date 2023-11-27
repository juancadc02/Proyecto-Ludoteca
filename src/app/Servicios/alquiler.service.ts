import { Injectable } from '@angular/core';

import { Alquiler } from '../Modelos/alquiler';
import { Firestore, collection, collectionData, getDoc } from '@angular/fire/firestore';
import { addDoc, doc, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {

  constructor(private db: Firestore) {}

 
  listarAlquiler() : Observable <Alquiler[]>{
    const juegosRef =collection(this.db,'alquileres')
    return collectionData(juegosRef,{idField:'id'}) as Observable<Alquiler[]>
  }
  
  agregarAlquiler(alquiler: Alquiler) {
    const alquilerReferencia=collection(this.db,`alquileres`);
    return addDoc(alquilerReferencia,alquiler);
  }

  async obtenerUsuarioPorId(usuarioId: string) {
    const usuarioDocumento = doc(this.db, 'usuarios', usuarioId);
    const usuarioSnap = await getDoc(usuarioDocumento);

    if (usuarioSnap.exists()) {
      return usuarioSnap.data();
    } else {
      return null;
    }
  }

  async obtenerJuegoPorId(juegoId: string) {
    const juegoDocumento = doc(this.db, 'juegos', juegoId);
    const juegoSnap = await getDoc(juegoDocumento);

    if (juegoSnap.exists()) {
      return juegoSnap.data();
    } else {
      return null;
    }
  }
  modificarAlquiler(objeto: any, nombreColeccion: string, id: string) {
    const collectionRef = doc(this.db, nombreColeccion+"/"+id);
    return setDoc(collectionRef, objeto);
  }
}

