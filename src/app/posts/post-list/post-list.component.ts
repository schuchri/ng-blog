import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../post";
import {PostService} from "../post.service";
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]>;

  constructor(private postService: PostService, private auth: AuthService) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();

    //console.log('!!!!!', this);
  }

  delete(id: string){
    this.postService.delete(id);
  }


  secondsToDate(seconds: number){
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(seconds);
    return t;
  }
}
