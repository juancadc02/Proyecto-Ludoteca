import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData, setDoc } from '@angular/fire/firestore';
import { Juegos } from '../Modelos/juegos';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fb: Firestore) { }



  añadirJuego(juego:Juegos){
    const juegoReferencia=collection(this.fb,`juegos`);
    return addDoc(juegoReferencia,juego);
  }

  


}
