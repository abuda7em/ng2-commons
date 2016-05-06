import {Component,Input} from '@angular/core';
@Component({
  selector:'sc-icon',
  host:{
    'style':';display:inline-block;white-space:nowrap',
    '(mouseenter)':'showLabel()',
    '(mouseleave)':'hideLabel()'
  },
  styles:['.rounded{border-radius:50%}'],
  template:`
            <i [ngClass]="cssClasses" [style.backgroundColor]="backgroundColor"
              [style.fontSize]="fontSize" [style.color]="fontColor ? fontColor:'inherit'">
              {{fa ? '': name}}
            </i>
            <span *ngIf="labelShown && label">{{label}}</span>`
})
export class IconDirective{
  @Input() name:string;
  
  @Input('font-size') fontSize:string;
  @Input() backgroundColor:string;
  @Input() fontColor:string;
  @Input() label:string;
  @Input() dir = 'ltr';
  @Input() fa=false;
  @Input() spin=false;
  _cssClasses;
  labelShown:boolean=false;

  showLabel(){ this.labelShown = this.label ? true:false }
  hideLabel(){ this.labelShown = false}
  
  @Input() 
  set cssClasses(c:string){
      this._cssClasses=c;
  }
  get cssClasses(){
      this.cssClasses = this.fa? `fa fa-${this.name} ${this._cssClasses}`:`material-icons ${this._cssClasses}`;
      return this.fa && this.spin ? `${this.cssClasses} fa-spin` : `${this.cssClasses}`;
  }
}
