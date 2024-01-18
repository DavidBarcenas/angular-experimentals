import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectControlComponent } from '../../components/select-control/select-control.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ui',
  standalone: true,
  imports: [CommonModule, SelectControlComponent, ReactiveFormsModule],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.scss',
})
export class UiComponent {
  mySelect = new FormControl('1');
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
