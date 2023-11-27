import { Injectable } from '@angular/core';

import { Alquiler } from '../Modelos/alquiler';
import { Firestore, collection, collectionData, getDoc } from '@angular/fire/firestore';
import { addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {

  constructor(private db: Firestore) {}

 //CRUD ALQUILER
  listarAlquiler() : Observable <Alquiler[]>{
    const juegosRef =collection(this.db,'alquileres')
    return collectionData(juegosRef,{idField:'id'}) as Observable<Alquiler[]>
  }
  agregarAlquiler(alquiler: Alquiler) {
    const alquilerReferencia=collection(this.db,`alquileres`);
    return addDoc(alquilerReferencia,alquiler);
  }
  modificarAlquiler(objeto: any, nombreColeccion: string, id: string) {
    const collectionRef = doc(this.db, nombreColeccion+"/"+id);
    return setDoc(collectionRef, objeto);
  }
  eliminarAlquiler(objeto: any, nombreColeccion: string){
    const collectionRef = doc(this.db, nombreColeccion+"/"+objeto.id);
    return deleteDoc(collectionRef);
  }
}

