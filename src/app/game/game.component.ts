import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, doc, docData, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    GameInfoComponent
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard?: string = '';
  game!: Game;
  gameId!: string;
  gameSub?: Subscription;

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      console.log('Game ID:', this.gameId);
      const gameDoc = doc(this.firestore, 'games', this.gameId);
      this.gameSub = docData(gameDoc).subscribe((gameData: any) => {
        if (gameData) {
          console.log('Game update:', gameData);
          this.game = new Game();
          Object.assign(this.game, gameData);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.gameSub?.unsubscribe();
  }

  newGame() {
    this.game = new Game();
  }

  async takeCard() {
    if (!this.pickCardAnimation) {
      const card = this.game.stack.pop();
      if (card) {
        this.currentCard = card;
        this.pickCardAnimation = true;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        setTimeout(async () => {
          this.game.playedCards.push(card);
          this.pickCardAnimation = false;
          const gameDoc = doc(this.firestore, 'games', this.gameId);
          await updateDoc(gameDoc, { ...this.game });
        }, 1000);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe(async (name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        const gameDoc = doc(this.firestore, 'games', this.gameId);
        await updateDoc(gameDoc, { players: this.game.players });
      }
    });
  }
}
