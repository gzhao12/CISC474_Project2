import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { $ } from 'protractor';
import { ThrowStmt } from '@angular/compiler';


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
    document.getElementById("sortTag").setAttribute("style", "font-weight: bold;");
    switch (type) {
      case 1: {
        this.pageNumber = 1;
        this.currentSort = this.nowPlaying;
        this.getRestItems(this.pageNumber, this.nowPlaying, this.restItemsURLSuffix);
        document.getElementById("sortTag").textContent = "Now Playing ";

        break;
      }
      case 2: {
        this.pageNumber = 1;
        this.currentSort = this.topRated;
        this.getRestItems(this.pageNumber, this.topRated, this.restItemsURLSuffix);
        document.getElementById("sortTag").textContent = "Top Rated ";

        break;
      }
      case 3: {
        this.pageNumber = 1;
        this.currentSort = this.popular;
        this.getRestItems(this.pageNumber, this.popular, this.restItemsURLSuffix);
        document.getElementById("sortTag").textContent = "Popular ";

        break;
      }
      case 4: {
        this.pageNumber = 1;
        this.currentSort = this.upcoming;
        this.getRestItems(this.pageNumber, this.upcoming, this.restItemsURLSuffix);
        document.getElementById("sortTag").textContent = "Upcoming ";

        break;
      }
    }
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.pageNumber = 1;
    this.getRestItems(this.pageNumber, this.popular, this.restItemsURLSuffix);
    document.getElementById("pageNum").textContent = this.restItems.page;
  }

  // Read all REST Items
  getRestItems(pageNumber, restItemsUrl, URLSuffix): void {
    this.restItemsServiceGetRestItems(pageNumber, restItemsUrl, URLSuffix)
      .subscribe(
        restItems => {
          this.restItems = restItems;
          document.getElementById("pageNum").textContent = "Page " + this.restItems.page + " of " + this.restItems.total_pages;

          // console.log(this.restItems);

          var tmpURL = "background-image: " + "url('http://image.tmdb.org/t/p/original/" + this.restItems.results[0].backdrop_path + "')";
          document.getElementById("backdrop").setAttribute("style", tmpURL);
        }
      );
  }

  incrementPageNumber() {
    if (this.pageNumber < this.restItems.total_pages) {
      this.pageNumber++;
      this.getRestItems(this.pageNumber, this.currentSort, this.restItemsURLSuffix);
    }
  }

  decrementPageNumber() {
    if (this.pageNumber <= 1) {
      this.pageNumber = 1;
    } else {
      this.pageNumber--;
    }
    this.getRestItems(this.pageNumber, this.currentSort, this.restItemsURLSuffix);
  }

  jumpToPageNumber(pageNumber) {
    this.pageNumber = pageNumber;
    this.getRestItems(this.pageNumber, this.currentSort, this.restItemsURLSuffix);
  }

  submitClick() {
    console.log((<HTMLInputElement>document.getElementById("input")).value);
    this.jumpToPageNumber((<HTMLInputElement>document.getElementById("input")).value);
  }

  jumpToFirst() {
    this.pageNumber = 1;
    this.getRestItems(this.pageNumber, this.currentSort, this.restItemsURLSuffix);
  }

  jumpToLast() {
    this.pageNumber = this.restItems.total_pages;
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

