import { Component } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { MessageComponent } from './message/message.component';

@Component({
  selector: 'app-content-projection',
  standalone: true,
  imports: [ModalComponent, MessageComponent],
  templateUrl: './content-projection.component.html',
  styles: ``,
})
export class ContentProjectionComponent {}
