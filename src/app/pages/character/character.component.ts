import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Character } from '../../core/model/character.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  @Input() character: Character;

  constructor() { }

  ngOnInit(): void {
    
  }



}
