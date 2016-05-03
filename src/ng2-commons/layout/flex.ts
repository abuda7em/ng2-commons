import {Directive,Input,ElementRef,Renderer} from '@angular/core';

@Directive({
  selector:'[flex]'
})
export class FlexDirective{
  @Input() flex;
  constructor(private renderer:Renderer, private el:ElementRef){
  }
  ngOnChanges(){
    var flexString = this.flex === ''? '1':'0 0 ' + this.flex +'%';
    this.renderer.setElementStyle(this.el.nativeElement,'flex',flexString);
  }
}
