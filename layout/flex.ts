import {Directive,Input,ElementRef,Renderer} from '@angular/core';

@Directive({
  selector:'[flex]'
})
export class FlexDirective{
    @Input() shrink:number = 1;
    @Input() grow:number = 1;
    @Input() basis:string = '0%';
    
    constructor(private renderer:Renderer, private el:ElementRef){}
    
    @Input()
    set flex(f){
        let flexString = (f === '') ? '1 1 0%' : `${this.grow} ${this.shrink} ${f}%`;
        this.renderer.setElementStyle(this.el.nativeElement,'flex',flexString);
    }
}