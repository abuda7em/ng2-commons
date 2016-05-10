import {Directive, Input, ElementRef, Renderer, HostBinding} from '@angular/core';

@Directive({
  selector:'[flex]'
})
export class FlexDirective{
    @Input() shrink:number = 1;
    @Input() grow:number = 1;
    @Input() flex:string;
    
    constructor(private renderer:Renderer, private el:ElementRef){}
    
    
    ngOnChanges(changes){
        
        let flexString = `${this.grow} ${this.shrink} ` + (this.flex === '') ? '0%':`${this.flex}%`;
        
        //this.renderer.setElementStyle(this.el.nativeElement,'flex',flexString);
    }
    @HostBinding('style.flex')
    get style(){
        let flexString = `${this.grow} ${this.shrink} ${this.flex === '' ? '0':this.flex}%`;
        console.log('changes',flexString, this.shrink, this.grow, this.el.nativeElement);
        return flexString;
    }
}