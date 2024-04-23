import { Component, Input, Optional } from '@angular/core';
import { ComponentContainer } from 'golden-layout';

/**
 * Demonstration on how to access data from the `ComponentContainer`.
 * 
 * Also demonstrates the ability to use a component both inside and outside the GoldenLayout,
 * by providing two separate non-interfering APIs with either container state or regular
 * Angular `@Input` injections. Simply determine whether the `ComponentContainer` could be `@Optional`ly
 * injected, and proceed based on that.
 */
@Component({
  selector: 'app-color-component',
  template: `
    <p id="title" [style.color]="color">{{title}}</p>
    <input #input type="text" [value]="initialColor" (input)="updateColor(input.value)">
    <p [style.color]="color">id: "{{id}}"</p>
  `,
  styles: [`
    #title {
      textAlign: left;
    }
  `
  ]
})
export class ColorComponent {
  public static readonly componentTypeName = 'Color';
  public static readonly undefinedColor = 'MediumVioletRed';

  @Input() public title: string;
  @Input() public color: string;
  public initialColor: string;
  public id: string;

  constructor(@Optional() private container: ComponentContainer) {
    let state;
    if(!!container) {
      this.title = this.container.title;
      this.id = this.container.parent.id;
      this.container.stateRequestEvent = () => this.handleContainerStateRequestEvent();
      state = this.container.initialState;
    } else {
      this.id = '';
    }

    let color: string;
    if (state === undefined) {
        color = ColorComponent.undefinedColor;
    } else {
        if (typeof state !== 'string') {
            color = 'IndianRed';
        } else {
            color = state;
        }
    }
    this.color = color;
    this.initialColor = color;

  }

  updateColor(value: string) {
    this.color = value ?? ColorComponent.undefinedColor;
  }

  handleContainerStateRequestEvent(): string | undefined {
    return this.color === ColorComponent.undefinedColor ? undefined : this.color;
  }
}
