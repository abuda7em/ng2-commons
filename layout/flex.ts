import {Directive,Input,ElementRef,Renderer} from '@angular/core';

@Directive({
  selector:'[flex]'
})
export class FlexDirective{
    @Input() shrink:number = 1;
    @Input() grow:number = 1;
    @Input() flex:string;
    
    constructor(private renderer:Renderer, private el:ElementRef){}
    
    
    ngOnChanges(changes){
        console.log(changes, this.shrink, this.grow, this.el.nativeElement);
        let flexString = `${this.grow} ${this.shrink} ` + (this.flex === '') ? '0%':`${this.flex}%`;
        this.renderer.setElementStyle(this.el.nativeElement,'flex',flexString);
    }
}