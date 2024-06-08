import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import Button from 'devextreme/ui/button';

@Directive({
  selector: '[appMeButton]',
})
export class MeButtonDirective implements AfterViewInit {
  constructor(private el: ElementRef, private re: Renderer2) {
  }

  ngAfterViewInit(): void {
    const _test = Button.getInstance(this.el.nativeElement) as Button;
    console.log(_test);
  }
}
