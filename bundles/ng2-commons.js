var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("ng2-commons/layout/flex", ['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var FlexDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            FlexDirective = (function () {
                function FlexDirective(renderer, el) {
                    this.renderer = renderer;
                    this.el = el;
                }
                FlexDirective.prototype.ngOnChanges = function () {
                    var flexString = this.flex === '' ? '1' : '0 0 ' + this.flex + '%';
                    this.renderer.setElementStyle(this.el.nativeElement, 'flex', flexString);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], FlexDirective.prototype, "flex", void 0);
                FlexDirective = __decorate([
                    core_1.Directive({
                        selector: '[flex]'
                    }), 
                    __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
                ], FlexDirective);
                return FlexDirective;
            }());
            exports_1("FlexDirective", FlexDirective);
        }
    }
});
System.register("ng2-commons/layout/layout", ['@angular/core'], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2;
    var ALIGN_ITEMS, JUSTIFY_CONTENT, LayoutDirective;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            ALIGN_ITEMS = { 'baseline': 'baseline', 'end': 'flex-end', 'start': 'flex-start', 'stretch': 'stretch', 'center': 'center' };
            JUSTIFY_CONTENT = { 'end': 'flex-end', 'start': 'flex-start', 'center': 'center', 'space-around': 'space-around', 'space-between': 'space-between' };
            LayoutDirective = (function () {
                function LayoutDirective(renderer, el) {
                    this.renderer = renderer;
                    this.el = el;
                }
                Object.defineProperty(LayoutDirective.prototype, "layout", {
                    set: function (layout) {
                        var direction = (layout === 'column') ? 'column' : 'row';
                        this.renderer.setElementStyle(this.el.nativeElement, 'display', 'flex');
                        this.renderer.setElementStyle(this.el.nativeElement, 'flex-direction', direction);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LayoutDirective.prototype, "layoutAlign", {
                    set: function (s) {
                        var layoutArgs = s.split(' ');
                        var justifyContent = JUSTIFY_CONTENT[layoutArgs[0]] !== undefined ?
                            JUSTIFY_CONTENT[layoutArgs[0]] : JUSTIFY_CONTENT['start'];
                        var alignContent = ALIGN_ITEMS[layoutArgs[1]] !== undefined ?
                            ALIGN_ITEMS[layoutArgs[1]] : ALIGN_ITEMS['stretch'];
                        this.renderer.setElementStyle(this.el.nativeElement, 'align-items', alignContent);
                        this.renderer.setElementStyle(this.el.nativeElement, 'justify-content', justifyContent);
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], LayoutDirective.prototype, "layout", null);
                __decorate([
                    core_2.Input('layout-align'), 
                    __metadata('design:type', String), 
                    __metadata('design:paramtypes', [String])
                ], LayoutDirective.prototype, "layoutAlign", null);
                LayoutDirective = __decorate([
                    core_2.Directive({
                        selector: '[layout]'
                    }), 
                    __metadata('design:paramtypes', [core_2.Renderer, core_2.ElementRef])
                ], LayoutDirective);
                return LayoutDirective;
            }());
            exports_2("LayoutDirective", LayoutDirective);
        }
    }
});
System.register("ng2-commons/layout/responsive.service", ['@angular/core', 'rxjs/BehaviorSubject', 'rxjs/Rx', 'rxjs/add/observable/fromEvent', 'rxjs/add/operator/map', 'rxjs/add/operator/pluck', 'rxjs/add/operator/distinctUntilChanged'], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_3, BehaviorSubject_1, Rx_1;
    var ResponsiveService, ResponsivePipe;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (BehaviorSubject_1_1) {
                BehaviorSubject_1 = BehaviorSubject_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (_4) {}],
        execute: function() {
            ResponsiveService = (function () {
                function ResponsiveService() {
                    var windowSize = new BehaviorSubject_1.BehaviorSubject(this.getWindowSize()); // most recent and subsequent values
                    this.width = windowSize.pluck('width').distinctUntilChanged();
                    this.height = windowSize.pluck('height').distinctUntilChanged();
                    this.layouts = windowSize.pluck('layouts').distinctUntilChanged(); // only observed distinct changes, e.g sm -> md -> lg, not lg -> lg -> lg
                    Rx_1.Observable.fromEvent(window, 'resize')
                        .map(this.getWindowSize)
                        .subscribe(windowSize);
                }
                ResponsiveService.prototype.getWindowSize = function () {
                    var width = window.innerWidth;
                    console.log('width', width);
                    var sizes = [];
                    if (width < 600)
                        sizes.push('xs');
                    if (width >= 600)
                        sizes.push('gt-xs');
                    if (width < 960 && width >= 600)
                        sizes.push('sm');
                    if (width >= 960)
                        sizes.push('gt-sm');
                    if (width < 1280 && width >= 960)
                        sizes.push('md');
                    if (width >= 1280)
                        sizes.push('gt-md');
                    if (width < 1920 && width >= 1280)
                        sizes.push('lg');
                    if (width >= 1920)
                        sizes.push('gt-lg');
                    return {
                        height: window.innerHeight,
                        width: window.innerWidth,
                        layouts: sizes
                    };
                };
                ResponsiveService = __decorate([
                    core_3.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ResponsiveService);
                return ResponsiveService;
            }());
            exports_3("ResponsiveService", ResponsiveService);
            ResponsivePipe = (function () {
                function ResponsivePipe(responsive) {
                    this.responsive = responsive;
                }
                ResponsivePipe.prototype.transform = function (value) {
                    var _this = this;
                    return Rx_1.Observable.create(function (observer) {
                        _this.responsive.layouts.subscribe(function (l) {
                            var matchedLayouts = l.filter(function (l) { return !l.startsWith('gt-'); }).filter(function (l) { return value[l]; });
                            var matchedGtLayouts = l.filter(function (l) { return l.startsWith('gt-'); }).filter(function (l) { return value[l]; });
                            var usedLayout = undefined;
                            for (var i = 0; usedLayout === undefined && i < matchedLayouts.length; i++) {
                                usedLayout = matchedLayouts[i];
                            }
                            for (var i = 0; usedLayout === undefined && i < matchedGtLayouts.length; i++) {
                                usedLayout = matchedGtLayouts[i];
                            }
                            if (usedLayout === undefined) {
                                usedLayout = 'default';
                            }
                            console.log('matched layout', usedLayout);
                            observer.next(value[usedLayout]);
                        });
                    });
                };
                ResponsivePipe = __decorate([
                    core_3.Pipe({
                        name: 'responsive'
                    }), 
                    __metadata('design:paramtypes', [ResponsiveService])
                ], ResponsivePipe);
                return ResponsivePipe;
            }());
            exports_3("ResponsivePipe", ResponsivePipe);
        }
    }
});
System.register("ng2-commons/layout/icon.directive", ['@angular/core'], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_4;
    var IconDirective;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            }],
        execute: function() {
            IconDirective = (function () {
                function IconDirective() {
                    this.dir = 'ltr';
                    this.labelShown = false;
                }
                IconDirective.prototype.showLabel = function () { this.labelShown = this.label ? true : false; };
                IconDirective.prototype.hideLabel = function () { this.labelShown = false; };
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', String)
                ], IconDirective.prototype, "name", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', String)
                ], IconDirective.prototype, "cssClasses", void 0);
                __decorate([
                    core_4.Input('font-size'), 
                    __metadata('design:type', String)
                ], IconDirective.prototype, "fontSize", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', String)
                ], IconDirective.prototype, "backgroundColor", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', String)
                ], IconDirective.prototype, "fontColor", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', String)
                ], IconDirective.prototype, "label", void 0);
                __decorate([
                    core_4.Optional(), 
                    __metadata('design:type', Object)
                ], IconDirective.prototype, "dir", void 0);
                IconDirective = __decorate([
                    core_4.Component({
                        selector: 'sc-icon',
                        host: {
                            'style': ';display:inline-block;white-space:nowrap',
                            '(mouseenter)': 'showLabel()',
                            '(mouseleave)': 'hideLabel()'
                        },
                        styles: ['.rounded{border-radius:50%}'],
                        template: "<i class=\"material-icons {{cssClasses}}\" [style.backgroundColor]=\"backgroundColor\"\n              [style.fontSize]=\"fontSize\" [style.color]=\"fontColor ? fontColor:'inherit'\">\n              {{name}}\n            </i>\n            <span *ngIf=\"labelShown && label\">{{label}}</span>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], IconDirective);
                return IconDirective;
            }());
            exports_4("IconDirective", IconDirective);
        }
    }
});
System.register("ng2-commons/layout", ["ng2-commons/layout/flex", "ng2-commons/layout/layout", "ng2-commons/layout/responsive.service", "ng2-commons/layout/icon.directive"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var flex_1, layout_1;
    var LAYOUT_DIRECTIVES;
    var exportedNames_1 = {
        'LAYOUT_DIRECTIVES': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_5(exports);
    }
    return {
        setters:[
            function (flex_2_1) {
                exportStar_1(flex_2_1);
                flex_1 = flex_2_1;
            },
            function (layout_2_1) {
                exportStar_1(layout_2_1);
                layout_1 = layout_2_1;
            },
            function (responsive_service_1_1) {
                exportStar_1(responsive_service_1_1);
            },
            function (icon_directive_1_1) {
                exportStar_1(icon_directive_1_1);
            }],
        execute: function() {
            exports_5("LAYOUT_DIRECTIVES", LAYOUT_DIRECTIVES = [flex_1.FlexDirective, layout_1.LayoutDirective]);
        }
    }
});
System.register("ng2-commons", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
