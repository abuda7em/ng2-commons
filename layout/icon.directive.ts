import {Component,Input} from '@angular/core';

@Component({
  selector:'sc-icon',
  host:{
    '(mouseenter)':'showLabel()',
    '(mouseleave)':'hideLabel()'
  },
  styles:[
      '.wrapper{display:inline-block;border-radius:5px;border:1px solid #aaa;padding:5px;padding-bottom:2px}',
      ':host{display:inline-block;white-space:nowrap}',
      '.rounded{border-radius:50%}'],
  template:`
        <div [class.wrapper]="label">
            <i [ngClass]="cssClasses" [style.backgroundColor]="backgroundColor"
              [style.fontSize]="fontSize" [style.color]="fontColor ? fontColor:'inherit'">
              {{fa ? '': name}}
            </i>
            <span>{{label}}</span>
        </div>
    `
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
      let cssClasses = this.fa? `fa fa-${this.name} ${this._cssClasses}`:`material-icons ${this._cssClasses}`;
      return this.fa && this.spin ? `${cssClasses} fa-spin` : `${cssClasses}`;
  }
}