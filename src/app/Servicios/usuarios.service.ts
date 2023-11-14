import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Usuario } from '../Modelos/usuarios';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private db: Firestore) { }


  agregarUsuario(usuario:Usuario){
    const usuarioReferencia = collection(this.db,`usuarios`);
    return addDoc(usuarioReferencia,usuario);
  }


  
}
