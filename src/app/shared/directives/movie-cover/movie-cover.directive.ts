import { MovieCoverComponent } from './movie-cover.component';
import { ComponentFactoryResolver, Directive, Injector, Input, ViewContainerRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CONFIGURATION, Configuration } from './configuration';
import { MOVIEFLATDATA } from '../../models/movie.data';

@Directive({
  selector: '[appMovieCover]',
})
export class MovieCoverDirective implements OnInit {
  @Input() filmUrl: string;
  @Input() class: string;

  constructor(
    private container: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    protected sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        MovieCoverComponent
      );

    this.container.clear();

    this.container.createComponent(
      componentFactory,
      0,
      Injector.create({
        providers: [
          {
            provide: CONFIGURATION,
            useValue: this.getConfiguration(),
          },
        ],
      })
    );
  }

  private getConfiguration(): Configuration {
    return {
      ...this.getTextValues(),
    };
  }

  private getTextValues() {
    return {
      url: this.getCover(),
      class: this.class,
    };
  }

  getCover() {
    return MOVIEFLATDATA[
      Number(this.filmUrl.slice(this.filmUrl.length - 2, -1)) - 1
    ].coverUrl;
  }
}
