import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectControlComponent } from '../../components/select-control/select-control.component';

@Component({
  selector: 'app-ui',
  standalone: true,
  imports: [CommonModule, SelectControlComponent],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.scss',
})
export class UiComponent {}
