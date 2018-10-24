import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { $ } from 'protractor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  pageNumber: number;
  title = 'PopcornPass';
  restItems: any = [];

  restItemsUrl: string;
  latest: string;

  restItemsURLSuffix = '&language=en-US&api_key=096ec8c51f2550df738bf3cacc8f35ef'
  nowPlaying = 'https://api.themoviedb.org/3/movie/now_playing?page='
  topRated = 'https://api.themoviedb.org/3/movie/top_rated?page='
  popular = 'https://api.themoviedb.org/3/movie/popular?page='
  upcoming = 'https://api.themoviedb.org/3/movie/upcoming?page='
  currentSort = this.popular;

  switchSort(type) {
    switch(type) {
      case 1: {
        this.pageNumber = 1;
        this.currentSort = this.nowPlaying;
        this.getRestItems(this.pageNumber, this.nowPlaying, this.restItemsURLSuffix);
        break;
      }
      case 2: {
        this.pageNumber = 1;
        this.currentSort = this.topRated;
        this.getRestItems(this.pageNumber, this.topRated, this.restItemsURLSuffix);
        break;
      }
      case 3: {
        this.pageNumber = 1;
        this.currentSort = this.popular;
        this.getRestItems(this.pageNumber, this.popular, this.restItemsURLSuffix);
        break;
      }
      case 4: {
        this.pageNumber = 1;
        this.currentSort = this.upcoming;
        this.getRestItems(this.pageNumber, this.upcoming, this.restItemsURLSuffix);
        break;
      }
    }
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.pageNumber = 1;
    this.getRestItems(this.pageNumber, this.popular, this.restItemsURLSuffix);
  }

  // Read all REST Items
  getRestItems(pageNumber, restItemsUrl, URLSuffix): void {
    this.restItemsServiceGetRestItems(pageNumber, restItemsUrl, URLSuffix)
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log("getRestItems function: " + this.restItems);
        }
      );
  }

  incrementPageNumber() {
    this.pageNumber ++;
    this.getRestItems(this.pageNumber, this.currentSort, this.restItemsURLSuffix);
  }

  decrementPageNumber() {
    if (this.pageNumber < 1) {
      this.pageNumber = 1;
    }
    else {
    this.pageNumber --;
    }
    this.getRestItems(this.pageNumber, this.currentSort, this.restItemsURLSuffix);
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems(pageNumber, restItemsUrl, URLSuffix) {
    this.restItemsUrl = restItemsUrl + pageNumber + URLSuffix;
    return this.http
      .get<any[]>(this.restItemsUrl)
      .pipe(map(data => data));
  }
}

