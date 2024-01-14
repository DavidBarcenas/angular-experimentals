import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgForOf, NgIf } from '@angular/common';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

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
  @Input() placeholder = 'Selecciona una opción';
  @Input()
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  get disabled() {
    return this._disabled;
  }
  @HostBinding('class.disabled')
  private _disabled = false;
  isOpen = false;
  defaultWidth = 'auto';
  value = '';

  @HostListener('click')
  open() {
    if (this.disabled) {
      return;
    }
    this.isOpen = true;
  }

  ngAfterViewInit(): void {
    this.defaultWidth = this.parent?.elementRef.nativeElement.getBoundingClientRect().width + 'px';
  }

  setValue(option: Option): void {
    if (option.disabled) {
      return;
    }
    this.value = option.label;
    this.close();
  }

  close(): void {
    this.isOpen = false;
  }
}
