import {Injectable,Pipe} from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/distinctUntilChanged';



@Injectable()
export class ResponsiveService {
  width: Observable<number>;
  height: Observable<number>;
  layouts: Observable<Array<string>>;
  constructor () {
    let windowSize = new BehaviorSubject(this.getWindowSize()); // most recent and subsequent values
    this.width = windowSize.pluck('width').distinctUntilChanged();
    this.height = windowSize.pluck('height').distinctUntilChanged();
    this.layouts = windowSize.pluck('layouts').distinctUntilChanged(); // only observed distinct changes, e.g sm -> md -> lg, not lg -> lg -> lg
    Observable.fromEvent(window, 'resize')
      .map(this.getWindowSize)
      .subscribe(windowSize);
  }

  getWindowSize() {
    let width = window.innerWidth;
    console.log('width',width);
    let sizes = [];
    if(width < 600) sizes.push('xs');
    if(width >= 600) sizes.push('gt-xs');
    if(width < 960  && width >= 600) sizes.push('sm');
    if(width >= 960) sizes.push('gt-sm');
    if(width < 1280 && width >= 960) sizes.push('md');
    if(width >= 1280) sizes.push('gt-md');
    if(width < 1920 && width >= 1280) sizes.push('lg');
    if(width >= 1920) sizes.push('gt-lg');
    return {
      height: window.innerHeight,
      width: window.innerWidth,
      layouts: sizes
    };
  }
}

@Pipe({
  name:'responsive'
})
export class ResponsivePipe{
  obs;
  constructor(private responsive:ResponsiveService) {
  }
  transform(value){
    return Observable.create(observer=>{
      this.responsive.layouts.subscribe(l=>{
        let matchedLayouts = l.filter(l=>!l.startsWith('gt-')).filter(l => value[l]);
        let matchedGtLayouts = l.filter(l=>l.startsWith('gt-')).filter(l => value[l]);
        let usedLayout = undefined;
        for(let i = 0;usedLayout === undefined && i < matchedLayouts.length;i++){
            usedLayout = matchedLayouts[i];
        }
        for(let i = 0;usedLayout === undefined && i < matchedGtLayouts.length;i++){
            usedLayout = matchedGtLayouts[i];
        }
        if(usedLayout === undefined ){
            usedLayout = 'default';
        }
        console.log('matched layout',usedLayout);
        observer.next(value[usedLayout]);
      });
    });
  }
}
