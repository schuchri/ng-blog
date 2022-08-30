import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Post} from "./post";
import {map} from "rxjs/operators";
import {AuthService} from "../core/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsCollection: AngularFirestoreCollection<Post>;
  postDoc: AngularFirestoreDocument<Post>;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.postsCollection = this.afs.collection('posts', ref =>
        ref.orderBy('published', 'desc'));
  }

  getPosts() {
    return this.postsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(_ => {
        const data = _.payload.doc.data() as Post;
        const id = _.payload.doc.id;
        return { id, ...data};
      });
    }));
  }

  getPostData(id:string) {
    //console.log('getPostData');
    this.postDoc = this.afs.doc<Post>(`posts/${id}`);
    //console.log('postDoc: ', this.postDoc.valueChanges());
    return this.postDoc.valueChanges();
  }

  create(data: Post){
    this.postsCollection.add(data);
  }

  getPost(id: string) {
    //console.log('Get doc');
    return this.afs.doc<Post>(`posts/${id}`);
  }

  delete(id: string) {
    return this.getPost(id).delete();
  }

  update(id:string, formData) {
    return this.getPost(id).update(formData);
  }

}
