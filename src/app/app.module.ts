import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BooleanComponent } from './tabs/boolean.component';
import { ColorComponent } from './tabs/color.component';
import { ControlsComponent } from './controls.component';
import { GL_COMPONENTS, GoldenLayoutComponentService } from './golden-layout-component.service';
import { GoldenLayoutHostComponent } from './golden-layout-host.component';
import { TextComponent } from './tabs/text.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    GoldenLayoutHostComponent,
    TextComponent,
    ColorComponent,
    BooleanComponent,
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [GoldenLayoutComponentService, { provide: GL_COMPONENTS, useValue: {
    [ColorComponent.componentTypeName]: ColorComponent,
    [TextComponent.componentTypeName]: TextComponent,
    [BooleanComponent.componentTypeName]: BooleanComponent
  }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
