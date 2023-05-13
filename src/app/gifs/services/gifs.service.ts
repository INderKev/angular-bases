import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

//const GIPHY_API_KEY = "9f4Li5XRZ3ig1xoWRGq1gQb6lJD2LXps";

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory:  string[] = [];
  private serviceUrl:    string = 'https://api.giphy.com/v1/gifs';
  private GIPHY_API_KEY: string = "9f4Li5XRZ3ig1xoWRGq1gQb6lJD2LXps";

  constructor( private http:HttpClient ) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready')
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string):void{
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory=this._tagsHistory.filter( (oldtag) => oldtag !== tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();

  }

  private loadLocalStorage():void {
    //verifica si existe ese arreglo
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    //verifica que no sea vacío
    if (this._tagsHistory.length == 0) return;
    this.searchTag(this._tagsHistory[0]);
  }


  searchTag(tag:string):void{
    if(tag.length==0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.GIPHY_API_KEY)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`,{ params: params})
      .subscribe( resp => {
        this.gifsList= resp.data;
      });
    /*
    fetch('https://api.giphy.com/v1/gifs/search?api_key=9f4Li5XRZ3ig1xoWRGq1gQb6lJD2LXps&q=valorant&limit=10')
    .then( resp => resp.json())
    .then( data => console.log(data));
    */
    //const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=9f4Li5XRZ3ig1xoWRGq1gQb6lJD2LXps&q=valorant&limit=10');
    //const data = await resp.json();
    //console.log(data);
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }



}
