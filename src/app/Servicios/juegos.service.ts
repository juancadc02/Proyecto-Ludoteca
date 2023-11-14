import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData,doc } from '@angular/fire/firestore';
import { Juegos } from '../Modelos/juegos';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  constructor(private db: Firestore) { }

 

  agregarJuego(juego: Juegos) {
    const juegoReferencia = collection(this.db,`juegos`);
    return addDoc(juegoReferencia,juego);
  }

  listarJuego() : Observable <Juegos[]>{
    const juegosRef =collection(this.db,'juegos')
    return collectionData(juegosRef,{idField:'id'}) as Observable<Juegos[]>
  }

}
