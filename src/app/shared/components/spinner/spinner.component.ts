import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  imports: [
    CommonModule, 
    NgxSpinnerModule
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent implements OnChanges {
  @Input() show = false;
  constructor(private spinner: NgxSpinnerService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']) {
      if (this.show) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    }
  }
}
