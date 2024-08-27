import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [],
  template: `
    <article class="flex items-center bg-white/10 max-w-lg m-auto py-5 rounded-sm text-white">
      <div class="w-5/12">
        <ng-content>
          <p>No content...</p>
        </ng-content>
      </div>
      <div class="flex-1 border-l border-white pl-3 pr-4 text-left relative">
        <h2 class="font-semibold">{{ title() }}</h2>
        <p class="font-bold text-lg">{{ description() }}</p>
        <button (click)="closed.emit()" class="absolute top-0 right-4">&times;</button>
      </div>
    </article>
  `,
})
export class WidgetComponent {
  title = input<string>('__title__');
  description = input<string>('__description__');

  closed = output<void>();
}
