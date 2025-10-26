import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private router: Router, private firestore: Firestore) { }

  async newGame() {
    const newGame = new Game();
    const gamesCollection = collection(this.firestore, 'games');
    const gameRef = await addDoc(gamesCollection, newGame.toJson ? newGame.toJson() : { ...newGame });
    this.router.navigateByUrl(`/game/${gameRef.id}`);
  }
}
