import { MovieCoverComponent } from './movie-cover.component';
import { ComponentFactoryResolver, Directive, Injector, Input, ViewContainerRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CONFIGURATION, Configuration } from './configuration';

@Directive({
  selector: '[appMovieCover]',
})
export class MovieCoverDirective implements OnInit {
  @Input() episodeID: string;
  @Input() class: string;
  covers = [
    'assets/images/covers/star-wars-episode-iv-a-new-hope.jpg',
    'assets/images/covers/star-wars-episode-v-the-empire-strikes-back.jpg',
    'assets/images/covers/star-wars-episode-vi-return-of-the-jedi.jpg',
    'assets/images/covers/star-wars-episode-i-the-phantom-menace.jpg',
    'assets/images/covers/star-wars-episode-ii-attack-of-the-clones.jpg',
    'assets/images/covers/star-wars-episode-iii-revenge-of-the-sith.jpg',
  ];

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
    return this.covers[Number(this.episodeID.slice(this.episodeID.length - 2, -1)) - 1];
  }
}
