import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {  Component, OnInit } from '@angular/core';
import { CharacterComponent } from '../character/character.component';
import { CharacterService } from '../shared/services/character/character.service';
import { Character } from '../../core/model/character.model';
import { UserFavorite } from '../../core/interface/user_favorite.interface';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-characters',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CharacterComponent],
  templateUrl: './favorite-characters.component.html',
  styleUrl: './favorite-characters.component.css',
  providers:[CharacterService]
})

export class FavoriteCharactersComponent implements OnInit {

  characters: Character[]=[];
  favCharacter: number[] = [];
  userId:string;

  constructor(private characterService: CharacterService,private authService:AuthService,private router: Router) {}

  ngOnInit(): void {
    this.userId =this.authService.getUserId();
    if(this.userId){
    this.getFavCharacters();}
  }

  getFavCharacters() {
  
      this.characterService.getAllFavorite().snapshotChanges().subscribe({
        next: (data) => {
          this.favCharacter = [];
          data.forEach((item) => {
            let ch = item.payload.toJSON() as UserFavorite;
            if(this.userId == ch.userId){
              this.favCharacter.push(ch.characterId);
            }
  
            
          });
          if (this.favCharacter.length > 1) {
            this.getMultipleCharacter(this.favCharacter);
          }else if(this.favCharacter.length ==1){
            this.getCharacter(this.favCharacter[0])
          }
        }
      });
    

  }
  getMultipleCharacter(ids) {
    this.characterService.getMultipleCharacter(ids).subscribe((data: any[]) => {
      if (Array.isArray(data)) {
        this.characters = data;
      } else {
      }
    });
  }
  
  getCharacter(characterId){
    this.characterService.getCharacter(characterId).subscribe(data =>{
      this.characters.push(data);
    }, error =>{
    })
  }
  
  goToCharacterDetail(characterId: number) {
    this.router.navigate(['/character', characterId]); // Detay sayfasına yönlendirme
  }
  
}
