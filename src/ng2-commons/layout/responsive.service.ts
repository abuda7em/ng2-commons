import {Injectable} from 'angular2/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/distinctUntilChanged'

@Injectable()
export class ResponsiveService {
  width: Observable<number>;
  height: Observable<number>;
  layouts: Observable<string>;
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
