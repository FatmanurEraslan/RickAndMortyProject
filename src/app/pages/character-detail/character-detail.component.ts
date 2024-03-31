import { AuthService } from './../shared/services/auth/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../shared/services/character/character.service';
import { Character } from '../../core/model/character.model';
import { UserFavorite } from '../../core/interface/user_favorite.interface';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { LocationDetails } from '../../core/model/location.model';
import { Episode } from '../../core/model/episode.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, ButtonModule,ToastModule],
  providers:[MessageService],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css'
})
export class CharacterDetailComponent {
  character: Character;
  favorite: UserFavorite;// Karakter detaylarını tutacak değişken
  userId: string;
  location: LocationDetails = new LocationDetails();
  episodes: Episode[] = [];
  ids: number[] = [];

  constructor(private route: ActivatedRoute, private characterService: CharacterService, private authService: AuthService,private messageService: MessageService) {

  }
  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.favorite = {
      characterId: 0,
      userId: this.userId,
    };
    // Route parametresinden karakter ID'sini al
    const characterId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.getCharacter(characterId);

    }
    // Karakter detaylarını almak için servisi veya veritabanını kullanarak karakteri bul

  }
  getCharacter(characterId) {

    this.characterService.getCharacter(characterId).subscribe(data => {
      this.character = data;
      this.getLocation();
      this.getEpisode();
      if (this.favorite) {
        this.favorite.characterId = this.character.id;
      }
    }, error => {
    })
  }
  addToFavorite() {
    this.characterService.addToFavorite(this.favorite);
    this.show();
    
    this.characterService.getAllFavorite();
  }
  getLocation() {
    this.characterService.getLocation(this.character.location.url).subscribe(data => {
      this.location = data;
    })
  }
  getEpisode() {
    let episodeIds = this.character.episode.map(url => parseInt(url.split('/').pop() || '', 10));
    if (episodeIds.length > 1) {
      this.characterService.getMultipleEpisodes(episodeIds).subscribe(data => {
        this.episodes = data;
      }) 
       }else if(episodeIds.length ==1){
        this.characterService.getEpisode(episodeIds[0]).subscribe(data => {
          this.episodes.push(data);
        }) 
    }
    
  

  }
  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Succesfully Added' });
}

}
