declare module "ng2-commons/layout/flex" {
    import { ElementRef, Renderer } from 'angular2/core';
    export class FlexDirective {
        private renderer;
        private el;
        flex: any;
        constructor(renderer: Renderer, el: ElementRef);
        ngOnChanges(): void;
    }
}
declare module "ng2-commons/layout/layout" {
    import { Renderer, ElementRef } from 'angular2/core';
    export class LayoutDirective {
        private renderer;
        private el;
        constructor(renderer: Renderer, el: ElementRef);
        layout: any;
        layoutAlign: string;
    }
}
declare module "ng2-commons/layout/responsive.service" {
    import { Observable } from 'rxjs/Observable';
    import 'rxjs/add/observable/fromEvent';
    import 'rxjs/add/operator/map';
    import 'rxjs/add/operator/pluck';
    import 'rxjs/add/operator/distinctUntilChanged';
    export class ResponsiveService {
        width: Observable<number>;
        height: Observable<number>;
        layouts: Observable<string>;
        constructor();
        getWindowSize(): {
            height: number;
            width: number;
            layouts: any[];
        };
    }
}
declare module "ng2-commons/layout" {
    export * from "ng2-commons/layout/flex";
    import { FlexDirective } from "ng2-commons/layout/flex";
    export * from "ng2-commons/layout/layout";
    import { LayoutDirective } from "ng2-commons/layout/layout";
    export const LAYOUT_DIRECTIVES: (typeof FlexDirective | typeof LayoutDirective)[];
    export * from "ng2-commons/layout/responsive.service";
}
declare module "ng2-commons" {
}
