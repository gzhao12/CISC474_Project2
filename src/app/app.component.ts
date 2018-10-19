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
  restItems: any;
  trending = 'https://api.themoviedb.org/3/discover/movie?'
    + 'page=' + this.pageNumber + '&include_video=false&include_adult=false' +
    '&sort_by=popularity.desc&language=en-US&api_key=096ec8c51f2550df738bf3cacc8f35ef';
  restItemsUrl = this.trending;


  constructor(private http: HttpClient) {
  }


  ngOnInit() {
    this.getRestItems();
    //    alert(this.pageNumber);
  }

  // Read all REST Items
  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
        }
      );
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.restItemsUrl)
      .pipe(map(data => data));
  }
}

