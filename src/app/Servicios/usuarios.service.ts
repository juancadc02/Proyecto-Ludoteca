import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Usuario } from '../Modelos/usuarios';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private db: Firestore) { }


  agregarUsuario(usuario:Usuario){
    const usuarioReferencia = collection(this.db,`usuarios`);
    return addDoc(usuarioReferencia,usuario);
  }

  listarUsuario() : Observable <Usuario[]>{
    const juegosRef =collection(this.db,'usuarios')
    return collectionData(juegosRef,{idField:'id'}) as Observable<Usuario[]>
  }

  
}
