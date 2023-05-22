import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})
export class MainTableComponent {

  winner: any;
  cells: any[];
  moves: number;
  tie: any;
  player: string;
  @Input() vsCPU: any;
  @Output() isVisible: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor() {
  }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.cells = Array(9).fill(null);
    this.winner = null;
    this.moves = 0;
    this.tie = null;
    this.player = 'X';
  }

  setValue(i: number) {
    if (this.winner == null && this.tie == null && this.cells[i] == null) {
      this.cells[i] = this.player;
      if (!this.checkWin()) {
        if (this.vsCPU) {
          this.cpuMove(i);
          this.winner = this.checkWin() ? 'O' : null;
          this.moves += 2;
        } else {
          this.player = this.player == 'X' ? 'O' : 'X';
          this.moves++;
        }
        if (this.winner == null) {
          if (this.moves > 8) this.tie = "";
        }
      } else this.winner = this.player;
    }
  }

  cpuMove(i: number) { //callback function

    let possibleIndex: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let indexToRemove: number;
    let cellIndex: number;

    do {
      cellIndex = Math.floor(Math.random() * 9);
      indexToRemove = possibleIndex.indexOf(cellIndex);
    } while (this.cells[cellIndex] != null && possibleIndex.splice(indexToRemove, 1).length > 0);

    if (possibleIndex.length == 0) {
      this.winner = null;
      return;
    }

    this.cells[cellIndex] = 'O';
  }

  checkWin() {
    return this.checkFromFirstCell() ||
      this.checkFromThirdCell() ||
      this.checkCrossShape() ||
      this.checkOtherCases();

  }

  checkFromFirstCell() {
    return this.cells[0] != null ?
      (this.cells[0] == this.cells[1]) && (this.cells[1] == this.cells[2])
      || (this.cells[0] == this.cells[3]) && (this.cells[3] == this.cells[6])
      || (this.cells[0] == this.cells[4]) && (this.cells[4] == this.cells[8])
      : false;
  }

  checkFromThirdCell() {
    return this.cells[2] != null ?
      (this.cells[2] == this.cells[4]) && (this.cells[4] == this.cells[6])
      || (this.cells[2] == this.cells[5]) && (this.cells[5] == this.cells[8])
      : false;
  }

  checkCrossShape() {
    return this.cells[4] != null ?
      (this.cells[1] == this.cells[4]) && (this.cells[4] == this.cells[7])
      || (this.cells[3] == this.cells[4]) && (this.cells[4] == this.cells[5])
      : false;
  }

  checkOtherCases() {
    return this.cells[7] != null ?
      (this.cells[6] == this.cells[7]) && (this.cells[7] == this.cells[8])
      : false;
  }

  showPopUpRematch() {
    console.log("confirm steps");
    if (confirm("Vuoi fare una nuova partita?")) {
      this.newGame();
    }
  }

  goBack() {
    this.isVisible.emit(false);
  }
}
