import {Component,Input,Optional} from '@angular/core';
@Component({
  selector:'sc-icon',
  host:{
    'style':';display:inline-block;white-space:nowrap',
    '(mouseenter)':'showLabel()',
    '(mouseleave)':'hideLabel()'
  },
  styles:['.rounded{border-radius:50%}'],
  template:`
            <i *ngIf="!fa" [ngClass]="'material-icons '+ cssClasses" [style.backgroundColor]="backgroundColor"
              [style.fontSize]="fontSize" [style.color]="fontColor ? fontColor:'inherit'">
              {{name}}
            </i>
            <i *ngIf="fa" [ngClass]="'fa '+ name + ' ' + cssClasses" [style.backgroundColor]="backgroundColor"
              [style.fontSize]="fontSize" [style.color]="fontColor ? fontColor:'inherit'">
            </i>
            <span *ngIf="labelShown && label">{{label}}</span>`
})
export class IconDirective{
  @Input() name:string;
  @Input() cssClasses:string;
  @Input('font-size') fontSize:string;
  @Input() backgroundColor:string;
  @Input() fontColor:string;
  @Input() label:string;
  @Input() dir = 'ltr';
  @Input() fa=false;
  labelShown:boolean=false;

  showLabel(){ this.labelShown = this.label ? true:false }
  hideLabel(){ this.labelShown = false}
}
