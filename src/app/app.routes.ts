import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';
import { FavoriteCharactersComponent } from './pages/favorite-characters/favorite-characters.component';

export const routes: Routes = [
    {path:'', redirectTo:'sign-in' ,pathMatch:'full'},
    {path:'sign-in',component:SignInComponent},
    {path:'sign-up', component:SignUpComponent},
    {path:'home', component:HomeComponent},
    { path: 'character/:id', component: CharacterDetailComponent } ,// :id parametresi ile karakter ID'sini alıyoruz
    {path:'favorite', component:FavoriteCharactersComponent},


];
