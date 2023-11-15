import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData, setDoc } from '@angular/fire/firestore';
import { Juegos } from '../Modelos/juegos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fb: Firestore) { }

 /* añadirJuego(juego:Juegos){
    const juegoReferencia=collection(this.fb,`juegos`);
    return addDoc(juegoReferencia,juego);
  }*/

  getFireBasePorId(nombreColeccion: string, idA:string){
    const collecionRef = doc(this.fb, nombreColeccion+"/"+idA);
    return docData(collecionRef, {idField: "id"}) as Observable<any>;
  }
  


}
