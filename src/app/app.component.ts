import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GoldenLayoutHostComponent } from './golden-layout-host.component';
import { predefinedLayouts } from './predefined-layouts';

@Component({
  selector: 'app-root',
  template: `
      <app-controls [glHost]="goldenLayoutHost"  *ngIf="!this.isSubWindow"></app-controls>
      <app-golden-layout-host #goldenLayoutHost></app-golden-layout-host>   
  `,
  styles: [
    `
      :host {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
      }
    `
  ]
})
export class AppComponent implements AfterViewInit {
  title = 'golden-layout-ng-app';

  protected isSubWindow: boolean = false;

  @ViewChild('goldenLayoutHost') private _goldenLayoutHostComponent: GoldenLayoutHostComponent;

  ngAfterViewInit() {
    this._goldenLayoutHostComponent.initialised.subscribe(() => {
      this._goldenLayoutHostComponent.goldenLayout.loadLayout(predefinedLayouts['responsive']);
      this.isSubWindow = this._goldenLayoutHostComponent.isGoldenLayoutSubWindow
    })
  }
}
