import {Directive,Input,Renderer,ElementRef} from '@angular/core';

const ALIGN_ITEMS = {'baseline':'baseline','end':'flex-end','start':'flex-start','stretch':'stretch','center':'center'};
const JUSTIFY_CONTENT = {'end':'flex-end','start':'flex-start','center':'center','space-around':'space-around','space-between':'space-between'};

@Directive({
  selector:'[layout]'
})
export class LayoutDirective{
  constructor(private renderer:Renderer, private el:ElementRef){
  }

  @Input()
  set layout(layout){
    var direction = (layout === 'column') ? 'column':'row';
    this.renderer.setElementStyle(this.el.nativeElement,'display','flex');
    this.renderer.setElementStyle(this.el.nativeElement,'flex-direction',direction);
  }

  @Input('layout-align')
  set layoutAlign(s:string){
    
    var layoutArgs = s.split(' ');
    var justifyContent = JUSTIFY_CONTENT[layoutArgs[0]] !== undefined ?
                                JUSTIFY_CONTENT[layoutArgs[0]]: JUSTIFY_CONTENT['start'];
    var alignContent = ALIGN_ITEMS[layoutArgs[1]] !== undefined ?
                                ALIGN_ITEMS[layoutArgs[1]]: ALIGN_ITEMS['stretch'];
    this.renderer.setElementStyle(this.el.nativeElement,'align-items',alignContent);
    this.renderer.setElementStyle(this.el.nativeElement,'justify-content',justifyContent);
  }
}
