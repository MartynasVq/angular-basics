import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @HostBinding("class.open") isOpen = false;
  private x?: string;
  private dropdown?: any;
  private native?: any;
  //

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.native = this.elementRef.nativeElement;
    this.dropdown = this.renderer.nextSibling(this.native);
    this.x = this.native.offsetLeft + 'px';
    this.renderer.setStyle(this.dropdown, "left", this.x);
  }

  @HostListener("click") toggle() {
    this.isOpen = !this.isOpen;
    if(this.isOpen) {
      this.renderer.addClass(this.dropdown, 'show');
    } else {
      this.renderer.removeClass(this.dropdown, 'show');
    }
  }


}
