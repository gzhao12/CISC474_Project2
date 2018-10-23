import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  pageNumber: number;
  title = 'PopcornPass';
  restItems: any = [];
  // popular = 'https://api.themoviedb.org/3/discover/movie?'
  //   + 'page=' + this.pageNumber + '&include_video=false&include_adult=false' +
  //   '&sort_by=popularity.desc&language=en-US&api_key=096ec8c51f2550df738bf3cacc8f35ef';
  restItemsUrl: string;
  latest: string;


  constructor(private http: HttpClient) {}


  ngOnInit() {
    this.getRestItems(this.pageNumber);
    this.pageNumber = 1;
  }

  // changeSorting() {
  //   latest = 'https://api.themoviedb.org/3/discover/movie?'
  //   + 'page=&include_video=false&include_adult=false&'
  //   + 'sort_by=latest.desc&language=enUS&api_key=096ec8c51f2550df738bf3cacc8f35ef';

  // }

  // Read all REST Items
  getRestItems(pageNumber): void {
    this.restItemsServiceGetRestItems(pageNumber)
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
        }
      );
  }

  incrementPageNumber() {
    this.pageNumber ++;
    this.getRestItems(this.pageNumber);
  }

  decrementPageNumber() {
    if (this.pageNumber < 1) {
      this.pageNumber = 1;
    }
    else {
    this.pageNumber --;
    }
    this.getRestItems(this.pageNumber);
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems(pageNumber) {
    this.restItemsUrl = 'https://api.themoviedb.org/3/discover/movie?'
    + 'page=' + pageNumber + '&include_video=false&include_adult=false' +
    '&sort_by=popularity.desc&language=en-US&api_key=096ec8c51f2550df738bf3cacc8f35ef';
    return this.http
      .get<any[]>(this.restItemsUrl)
      .pipe(map(data => data));
  }
}

