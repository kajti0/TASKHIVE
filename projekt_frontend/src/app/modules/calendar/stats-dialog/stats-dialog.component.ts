import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stats-dialog',
  templateUrl: './stats-dialog.component.html',
  styleUrls: ['./stats-dialog.component.css']
})
export class StatsDialogComponent {
  productivity: number;
  selfCare: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { productivity: number, selfCare: number }) {
    this.productivity = data.productivity || 0;
    this.selfCare = data.selfCare || 0;
  }
}
