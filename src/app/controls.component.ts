import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from "@angular/core";
import {
  ComponentItemConfig,
  DragSource,
  GoldenLayout,
  LayoutConfig,
  ResolvedLayoutConfig,
} from "golden-layout";
import { ColorComponent } from "./tabs/color.component";
import { GoldenLayoutComponentService } from "./golden-layout-component.service";
import { GoldenLayoutHostComponent } from "./golden-layout-host.component";
import { predefinedLayouts } from "./predefined-layouts";
import { TextComponent } from "./tabs/text.component";

@Component({
  selector: "app-controls",
  template: `
    <section id="virtualOrEmbeddedSection">
      <section id="embeddedSection">
        <section id="embeddedRadioSection">
          <input
            id="embeddedRadio"
            type="radio"
            name="virtualOrEmbedded"
            [(ngModel)]="useVirtual"
            [value]="false"
            (change)="handleVirtualRadioClick()"
          />
          <label for="embeddedRadio">Embedded</label>
        </section>
      </section>
      <section id="virtualSection">
        <section id="virtualRadioSection">
          <input
            id="virtualRadio"
            type="radio"
            name="virtualOrEmbedded"
            [(ngModel)]="useVirtual"
            [value]="true"
            (change)="handleVirtualRadioClick()"
          />
          <label for="virtualRadio">Virtual</label>
        </section>
        <section id="viewComponentRefOrAppRefSection">
          <section id="viewComponentRefRadioSection">
            <input
              id="viewComponentRefRadio"
              type="radio"
              name="viewComponentRefOrAppRef"
              [(ngModel)]="useViewContainerRef"
              [value]="true"
              [disabled]="!useVirtual"
              (change)="handleAppRefRadioClick()"
            />
            <label for="viewComponentRefRadio">View Comp Ref</label>
          </section>
          <section id="appRefRadioSection">
            <input
              id="appRefRadio"
              type="radio"
              name="viewComponentRefOrAppRef"
              [(ngModel)]="useViewContainerRef"
              [value]="false"
              [disabled]="!useVirtual"
              (change)="handleAppRefRadioClick()"
            />
            <label for="appRefRadio">App Ref</label>
          </section>
        </section>
      </section>
    </section>
    <section id="addComponentSection">
      <select
        id="registeredComponentTypeSelect"
        class="control"
        [value]="initialRegisteredComponentTypeName"
        [(ngModel)]="_selectedRegisteredComponentTypeName"
      >
        <option *ngFor="let name of registeredComponentTypeNames">
          {{ name }}
        </option>
      </select>
      <button
        id="addComponentButton"
        class="control"
        (click)="handleAddComponentButtonClick()"
      >
        Add Component
      </button>
    </section>
    <section id="addTextComponentSection">
      <input
        id="componentTextInput"
        class="control"
        size="8"
        [value]="initialComponentTextValue"
        [(ngModel)]="_componentTextValue"
      />
      <button
        id="addTextComponentButton"
        class="control"
        (click)="handleAddTextComponentButtonClick()"
      >
        Add Text Component
      </button>
    </section>
    <section id="predefinedLayoutsSection">
      <select
        id="layoutSelect"
        class="control"
        [value]="initialLayoutName"
        [(ngModel)]="_selectedLayoutName"
      >
        <option *ngFor="let name of layoutNames">{{ name }}</option>
      </select>
      <button
        id="loadLayoutButton"
        class="control"
        (click)="handleLoadLayoutButtonClick()"
      >
        Load Layout
      </button>
    </section>
    <section id="saveAndReloadLayoutSection">
      <button
        id="saveLayoutButton"
        class="control"
        (click)="handleSaveLayoutButtonClick()"
      >
        Save Layout
      </button>
      <button
        id="reloadSavedLayoutButton"
        class="control"
        [disabled]="saveLayoutButtonDisabled === true ? true : null"
        (click)="handleReloadSavedLayoutClick()"
      >
        Reload saved Layout
      </button>
    </section>
    <section id="dragSection">
      <button class="draggable control" #dragMe>Drag me !</button>
    </section>
    <hr />
    <p>
      There shouldn't be any restrictions on what components can be placed in
      the GoldenLayout, and obviously you can also use those same components
      outside (if you tell them how to handle the absence of the
      <code>ComponentContainer</code>).
    </p>
    <app-color-component title="<used outside of tab>" color="yellow" />
    <hr />
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        white-space: nowrap;
        width: 25%;
      }

      app-color-component {
        border: 1px solid black;
        background-color: #222;
        padding: 5px;
        margin: 5px;
      }

      p {
        white-space: break-spaces;
      }

      .control {
        margin: 2px;
      }

      .draggable {
        cursor: move;
      }

      #viewComponentRefOrAppRefSection {
        display: flex;
        margin-left: 1em;
      }

      #addComponentSection {
        display: flex;
        flex-direction: row;
      }

      #addTextComponentSection {
        display: flex;
        flex-direction: row;
      }

      #predefinedLayoutsSection {
        display: flex;
        flex-direction: row;
      }

      #saveAndReloadLayoutSection {
        display: flex;
        flex-direction: row;
      }

      #dragSection {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class ControlsComponent implements OnDestroy {
  @Input("glHost") public _goldenLayoutHostComponent: GoldenLayoutHostComponent;

  private _goldenLayout: GoldenLayout;
  private _savedLayout: ResolvedLayoutConfig | undefined;

  protected useVirtual: boolean;
  protected useViewContainerRef: boolean;
  protected _selectedRegisteredComponentTypeName: string;
  protected _componentTextValue: string;
  protected _selectedLayoutName: string;
  private _dragSources: Array<DragSource | undefined> = [];

  @ViewChild("dragMe") private _dragMeElementRef: ElementRef;

  public registeredComponentTypeNames: readonly string[];
  public initialRegisteredComponentTypeName: string;
  public initialComponentTextValue = "Water";
  public layoutNames: readonly string[];
  public initialLayoutName: string;
  public saveLayoutButtonDisabled = true;

  get element() {
    return this._elRef.nativeElement;
  }

  constructor(
    private _elRef: ElementRef<HTMLElement>,
    private _goldenLayoutComponentService: GoldenLayoutComponentService
  ) {}

  ngOnInit() {
    this._goldenLayoutHostComponent.initialised.subscribe(() => {
      this.initialise();
    });
  }

  ngOnDestroy() {
    for (const dragSource of this._dragSources) {
      if (dragSource) {
        this._goldenLayout.removeDragSource(dragSource);
      }
    }
  }

  initialise() {
    this._goldenLayout = this._goldenLayoutHostComponent.goldenLayout;

    this.useVirtual = this._goldenLayoutHostComponent.virtualActive;
    this.useViewContainerRef =
      this._goldenLayoutHostComponent.viewContainerRefActive;

    this.registeredComponentTypeNames = Array.from(
      this._goldenLayoutComponentService.componentTypes.keys()
    );
    this._selectedRegisteredComponentTypeName =
      this.registeredComponentTypeNames[0];
    this.initialRegisteredComponentTypeName =
      this._selectedRegisteredComponentTypeName;
    this._componentTextValue = this.initialComponentTextValue;
    this.layoutNames = Object.keys(predefinedLayouts);
    this._selectedLayoutName = this.layoutNames[0];
    this.initialLayoutName = this._selectedLayoutName;

    this.initialiseDragSources();
  }

  handleVirtualRadioClick() {
    this._goldenLayoutHostComponent.setVirtualActive(this.useVirtual);

    this.useViewContainerRef =
      this._goldenLayoutHostComponent.viewContainerRefActive;
    this.useVirtual = this._goldenLayoutHostComponent.virtualActive;
  }

  handleAppRefRadioClick() {
    this._goldenLayoutHostComponent.setViewContainerRefActive(
      this.useViewContainerRef
    );
  }

  handleRegisteredComponentTypeSelectChange(value: string) {
    this._selectedRegisteredComponentTypeName = value;
  }

  handleAddComponentButtonClick() {
    const componentType = this._selectedRegisteredComponentTypeName;
    this._goldenLayout.addComponent(componentType);
  }

  handleAddTextComponentButtonClick() {
    // this demonstrates how to access created Angular component
    const goldenLayoutComponent = this._goldenLayout.newComponent(
      TextComponent.componentTypeName
    ); // do not set state here
    const componentRef = this._goldenLayoutHostComponent.getComponentRef(
      goldenLayoutComponent.container
    );
    if (componentRef === undefined) {
      throw new Error("Unexpected error getting ComponentRef");
    }

    const textComponent = componentRef.instance as TextComponent;
    textComponent.setInitialValue(this._componentTextValue);
  }

  handleLoadLayoutButtonClick() {
    const selectedLayout = predefinedLayouts[this._selectedLayoutName];
    if (selectedLayout === undefined) {
      throw new Error("handleLoadLayoutButtonClick Error");
    }

    this._goldenLayout.loadLayout(selectedLayout);
  }

  handleSaveLayoutButtonClick() {
    this._savedLayout = this._goldenLayout.saveLayout();
    this.saveLayoutButtonDisabled = false;
  }

  handleReloadSavedLayoutClick() {
    if (this._savedLayout === undefined) {
      throw new Error("No saved layout");
    } else {
      const layoutConfig = LayoutConfig.fromResolved(this._savedLayout);
      this._goldenLayout.loadLayout(layoutConfig);
    }
  }

  private initialiseDragSources() {
    this.loadDragSource(
      {
        type: "component",
        title: "Drag me !",
        componentState: {color: "yellow"},
        componentType: ColorComponent.componentTypeName,
      },
      this._dragMeElementRef
    );
  }

  private loadDragSource(
    item: ComponentItemConfig,
    element: ElementRef | undefined
  ): void {
    if (!this._goldenLayout) {
      return;
    }

    this._dragSources.push(
      this._goldenLayout.newDragSource(element?.nativeElement, () => item)
    );
  }
}
