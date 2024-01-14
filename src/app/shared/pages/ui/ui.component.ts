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
export class UiComponent {
  options = [
    {
      label: 'Option 1',
      value: '1',
    },
    {
      label: 'Option 2',
      value: '2',
      disabled: true,
    },
    {
      label: 'Option 3',
      value: '3',
    },
  ];
}
