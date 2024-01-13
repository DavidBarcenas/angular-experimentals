import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  ViewChild,
} from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-select-control',
  standalone: true,
  imports: [CdkOverlayOrigin, CdkConnectedOverlay],
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

  isOpen = false;
  defaultWidth = 'auto';
  value = 'Placeholder';

  @HostListener('click')
  open() {
    this.isOpen = true;
  }

  ngAfterViewInit() {
    this.defaultWidth = this.parent?.elementRef.nativeElement.getBoundingClientRect().width + 'px';
  }

  setValue(value: string) {
    this.value = value;
    this.close();
  }

  close() {
    this.isOpen = false;
  }
}
