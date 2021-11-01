import { DOCUMENT } from '@angular/common';
import {
  Inject,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  public isHide: boolean = false;
  private renderer: Renderer2;
  @Inject(DOCUMENT) document;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.document = document;
  }

  public hide() {
    this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
    this.isHide = true;
  }

  public show() {
    this.renderer.setStyle(this.document.body, 'overflow', 'auto');
    this.isHide = false;
  }
}
