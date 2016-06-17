declare module "layout/flex" {
    export class FlexDirective {
        shrink: number;
        grow: number;
        flex: string;
        style: string;
    }
}
declare module "layout/icon.directive" {
    export class IconDirective {
        name: string;
        fontSize: string;
        backgroundColor: string;
        fontColor: string;
        label: string;
        dir: string;
        fa: boolean;
        spin: boolean;
        _cssClasses: any;
        labelShown: boolean;
        showLabel(): void;
        hideLabel(): void;
        cssClasses: string;
    }
}
declare module "layout/layout" {
    import { Renderer, ElementRef } from '@angular/core';
    export class LayoutDirective {
        private renderer;
        private el;
        constructor(renderer: Renderer, el: ElementRef);
        layout: any;
        layoutAlign: string;
    }
}
declare module "layout/responsive.service" {
    import { Observable } from 'rxjs/Observable';
    import 'rxjs/add/observable/fromEvent';
    import 'rxjs/add/operator/map';
    import 'rxjs/add/operator/pluck';
    import 'rxjs/add/operator/distinctUntilChanged';
    export class ResponsiveService {
        width: Observable<any>;
        height: Observable<any>;
        layouts: Observable<any>;
        constructor();
        getWindowSize(): {
            height: number;
            width: number;
            layouts: any[];
        };
    }
    export class ResponsivePipe {
        private responsive;
        obs: any;
        constructor(responsive: ResponsiveService);
        transform(value: any): any;
    }
}
declare module "layout" {
    export * from "layout/flex";
    export * from "layout/icon.directive";
    export * from "layout/layout";
    export * from "layout/responsive.service";
}
declare module "layout/index" {
    export { FlexDirective } from "layout/flex";
    export { IconDirective } from "layout/icon.directive";
    export { LayoutDirective } from "layout/layout";
    export { ResponsiveService, ResponsivePipe } from "layout/responsive.service";
}
