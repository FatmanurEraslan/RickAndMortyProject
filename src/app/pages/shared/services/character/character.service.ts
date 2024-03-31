import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/service/api.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { UserFavorite } from '../../../../core/interface/user_favorite.interface';
import { Character } from '../../../../core/model/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  public url=" https://rickandmortyapi.com/api/";
  private dbPath ='/userFavorite';
  favoriteCharcterRef :AngularFireList<any>

  constructor(private apiService:ApiService,private db:AngularFireDatabase) {
    this.favoriteCharcterRef =db.list(this.dbPath);
   }
  allCharacters():Observable<any>{
    return this.apiService.get(this.url+"character/");
  }
  getCharacters(page:number):Observable<any>{
    return this.apiService.get(this.url+"character/?page="+page);
  }
  getCharacter(id:number):Observable<any>{
    return this.apiService.get(this.url+"character/"+id);
  }
  searchCharacter(name:string):Observable<any>{
    return this.apiService.get(this.url+"character/?name="+name);
  }
  addToFavorite(favorite:UserFavorite){
    this.favoriteCharcterRef.push(favorite).then(() => {
      console.log('Veri başarıyla gönderildi.');
    })
    .catch((error) => {
    });

  }
  getAllFavorite(){
    return this.favoriteCharcterRef;
  }

  deleteFavorite(key:string){
    this.favoriteCharcterRef.remove(key);
  }
  getMultipleCharacter(ids: number[]): Observable<Character[]> {
    const characterIds = ids.join(',');
    return this.apiService.get(this.url+"character/"+characterIds);

  }
  getLocation(url):Observable<any>{
    return this.apiService.get(url);

  }
  getMultipleEpisodes(ids:number[]){
    const episodeIds = ids.join(',');
    return this.apiService.get(this.url+"episode/"+episodeIds);
  }
  getEpisode(id){
    return this.apiService.get(this.url+"episode/"+id);
  }

}