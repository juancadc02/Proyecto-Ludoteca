import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, query, setDoc } from '@angular/fire/firestore';
import { Usuario } from '../Modelos/usuarios';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private db: Firestore) { }

  //CRUD USUARIO
  listarUsuario() : Observable <Usuario[]>{
    const juegosRef =collection(this.db,'usuarios')
    return collectionData(juegosRef,{idField:'id'}) as Observable<Usuario[]>
  }
  agregarUsuario(usuario:Usuario){
    const usuarioReferencia = collection(this.db,`usuarios`);
    return addDoc(usuarioReferencia,usuario);
  }
  modificarJuego(objeto: any, nombreColeccion: string, id: string) {
    const collectionRef = doc(this.db, nombreColeccion+"/"+id);
    return setDoc(collectionRef, objeto);
  }
  eliminarJuego(objeto: any, nombreColeccion: string){
    const collectionRef = doc(this.db, nombreColeccion+"/"+objeto.id);
    return deleteDoc(collectionRef);
  }
  
 
  
 
}
