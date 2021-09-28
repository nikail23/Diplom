import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, TemplateRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, OnChanges {

  @Input() width?: string = '100%';
  @Input() height?: string = '57px';
  @Input() mainColor: string = '#5e9e5e';
  @Input() hoverColor: string = '#4a804a';
  @Input() textColor?: string;
  @Input() filled?: boolean = true;

  @Output() clicked = new EventEmitter<any>();

  @ViewChild('button', {static: true})
  private button?: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filled) {
      this.handleFilled();
    }
  }

  ngOnInit(): void {
    this.handleFilled();
  }

  private handleFilled() {
    if (this.filled) {
      if (this.textColor) {
        this.renderer.setStyle(this.button?.nativeElement, 'color', this.textColor);
      } else {
        this.renderer.setStyle(this.button?.nativeElement, 'color', '#ffffff');
      }
      this.renderer.setStyle(this.button?.nativeElement, 'border', `none`);
      this.renderer.setStyle(this.button?.nativeElement, 'background-color', this.mainColor);
    } else {
      if (this.textColor) {
        this.renderer.setStyle(this.button?.nativeElement, 'color', this.textColor);
      } else {
        this.renderer.setStyle(this.button?.nativeElement, 'color', this.mainColor);
      }
      this.renderer.setStyle(this.button?.nativeElement, 'border', `1px solid ${this.mainColor}`);
      this.renderer.setStyle(this.button?.nativeElement, 'background-color', '#ffffff');
    }
  }

  @HostListener('mouseover')
  onMouseOver() {
    if (this.filled) {
      this.renderer.setStyle(this.button?.nativeElement, 'background-color', this.hoverColor);
    } else {
      if (this.textColor) {
        this.renderer.setStyle(this.button?.nativeElement, 'color', this.textColor);
      } else {
        this.renderer.setStyle(this.button?.nativeElement, 'color', this.hoverColor);
      }
      this.renderer.setStyle(this.button?.nativeElement, 'border', `1px solid ${this.hoverColor}`);
    }
  }

  @HostListener('mouseout')
  onMouseOut() {
    if (this.filled) {
      this.renderer.setStyle(this.button?.nativeElement, 'background-color', this.mainColor);
    } else {
      if (this.textColor) {
        this.renderer.setStyle(this.button?.nativeElement, 'color', this.textColor);
      } else {
        this.renderer.setStyle(this.button?.nativeElement, 'color', this.mainColor);
      }
      this.renderer.setStyle(this.button?.nativeElement, 'border', `1px solid ${this.mainColor}`);
    }
  }

  public buttonClicked() {
    this.clicked.emit();
  }

}
