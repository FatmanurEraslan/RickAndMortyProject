import { CommonModule } from '@angular/common';
import { CharacterService } from '../shared/services/character/character.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';
import { Character } from '../../core/model/character.model';
import { CharacterComponent } from '../character/character.component';
import { FilterPipe } from "../shared/pipe/filter.pipe";
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, HttpClientModule, PaginatorModule, CharacterComponent, FilterPipe]
})
export class HomeComponent implements OnInit{
  totalRecords: number = 0;
  rows: number = 5;
  searchKey: string = "";
  searchTerm: string = "";
  characters: Character[];
  isLoggedIn = false;


constructor(private characterService:CharacterService,private router: Router,private authService: AuthService){

}
ngOnInit(): void {
  
  this.isLoggedIn = this.authService.logged()?true:false;

    console.log(this.isLoggedIn)
    if(this.isLoggedIn == true){
      this.getCharacters(0);

    }
    else{

    }
  
  
}
onCharacterOutput(character:Character){
}
onPageChange(event:any){
  this.getCharacters(event.page);
}
search(){
  this.getSearchedCharacter(this.searchKey);
}

getSearchedCharacter(name:string){
  this.characterService.searchCharacter(name).subscribe(data=>{
    this.characters = data.results;
    this.totalRecords= data.info.count;

  });

}

getCharacters(page:number){
  this.characterService.getCharacters(page+1).subscribe(data =>{
    this.characters = data.results;
    this.totalRecords= data.info.count;
  }, error =>{
  })
}
goToCharacterDetail(characterId: number) {
  this.router.navigate(['/character', characterId]); // Detay sayfasına yönlendirme
}

}
