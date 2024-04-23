import { Component, Input, Optional } from '@angular/core';
import { ComponentContainer } from 'golden-layout';

@Component({
  selector: 'app-boolean-component',
  template: `
    <input #input id="input" type="checkbox" [checked]="initialValue" [(ngModel)]="value">
    <label for="input">{{label}}</label>
  `,
  styles: [`
    #input {
      display: block;
    }
  `]
})
export class BooleanComponent {
  public static readonly componentTypeName = 'Boolean';

  @Input() label: string = '';

  protected value: boolean;
  public initialValue: boolean;

  constructor(@Optional() private container: ComponentContainer) {
    let state;
    if(!!container) {
      this.container.stateRequestEvent = () => this.handleContainerStateRequestEvent();
      state = this.container.initialState;
    } else {
      state = false;
    }

    this.value = state as boolean;
    this.initialValue = this.value;
  }

  handleContainerStateRequestEvent(): boolean {
    return this.value;
  }
}