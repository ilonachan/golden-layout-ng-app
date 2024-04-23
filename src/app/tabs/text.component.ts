import { Component } from '@angular/core';
import { ComponentContainer, JsonValue } from 'golden-layout';

@Component({
  selector: 'app-text-component',
  template: `
    <input #input id="input" type="text" [value]="initialValue" [(ngModel)]="_value">
  `,
  styles: [`
    #input {
      display: block;
    }
  `]
})
export class TextComponent {
  public static readonly componentTypeName = 'Text';

  protected _value: string;
  public initialValue: string;

  constructor(private container: ComponentContainer) {
    this.container.stateRequestEvent = () => this.handleContainerStateRequestEvent();

    const state = this.container.initialState;
    let textValue: string;
    if (state === undefined) {
      textValue = TextComponent.undefinedTextValue;
    } else {
      if (!JsonValue.isJson(state)) {
        textValue = '<Unexpect type>';
      } else {
        const textState: TextComponent.State = state as TextComponent.State;
        textValue = textState.text;
      }
      this._value = textValue;
      this.initialValue = textValue;
    }
  }

  setInitialValue(value: string) {
    this.initialValue = value;
    this._value = value;
  }

  handleContainerStateRequestEvent(): TextComponent.State | undefined {
    if (this._value === TextComponent.undefinedTextValue) {
      return undefined;
    } else {
      return {
        text: this._value,
      };
    }
  }
}

export namespace TextComponent {
  export const undefinedTextValue = '<undefined>';

  type TextPropertyName = 'text';
  export type State = { [propertyName in TextPropertyName]: string }
}
