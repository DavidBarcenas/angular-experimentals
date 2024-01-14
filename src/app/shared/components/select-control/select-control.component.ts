import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgForOf, NgIf } from '@angular/common';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select-control',
  standalone: true,
  imports: [CdkOverlayOrigin, CdkConnectedOverlay, NgForOf, NgIf],
  templateUrl: './select-control.component.html',
  styleUrl: './select-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('dropdown', [
      state('void', style({ opacity: 0, transform: 'scale(1, 0.8)' })),
      state('*', style({ opacity: 1, transform: 'scale(1,1)' })),
      transition(':enter', [animate('120ms cubic-bezier(0, 0, 0.2, 1)')]),
      transition(':leave', [animate('100ms linear')]),
    ]),
  ],
})
export class SelectControlComponent implements AfterViewInit {
  @ViewChild('trigger') parent!: CdkOverlayOrigin;
  @Input() options: Option[] = [];

  isOpen = false;
  defaultWidth = 'auto';
  value = '';

  @HostListener('click')
  open() {
    this.isOpen = true;
  }

  ngAfterViewInit() {
    this.defaultWidth = this.parent?.elementRef.nativeElement.getBoundingClientRect().width + 'px';
  }

  setValue(option: Option) {
    if (option.disabled) {
      return;
    }
    this.value = option.label;
    this.close();
  }

  close() {
    this.isOpen = false;
  }
}
