import { Component, ComponentRef, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { WidgetComponent } from './widget/widget.component';
import { WidgetContentComponent } from './widget/widget-content.component';

@Component({
  selector: 'app-dynamic-component',
  standalone: true,
  imports: [WidgetContentComponent],
  templateUrl: './dynamic-component.component.html',
})
export class DynamicComponentComponent {
  vcr = viewChild('container', { read: ViewContainerRef });
  content = viewChild<TemplateRef<unknown>>('content');
  #componentRef?: ComponentRef<WidgetComponent>;

  createComponent() {
    const content = this.content();
    if (!content) {
      throw new Error('Content reference not found');
    }
    this.destroyComponent();
    this.appendContent(content);
    this.#componentRef?.setInput('title', 'Weather');
    this.#componentRef?.setInput('description', 'Currently in Mexico');

    this.#componentRef?.instance.closed.subscribe(() => this.destroyComponent());
  }

  appendContent(content: TemplateRef<unknown>) {
    const contentView = this.vcr()?.createEmbeddedView(content);
    if (!contentView) {
      throw new Error('Embedded content is undefined');
    }
    this.#componentRef = this.vcr()?.createComponent(WidgetComponent, {
      projectableNodes: [contentView.rootNodes],
    });
  }

  destroyComponent() {
    this.vcr()?.clear();
  }
}
