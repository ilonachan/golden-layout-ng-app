import { Component, ComponentFactoryResolver, Injectable, InjectionToken, Injector, Type, inject } from '@angular/core';
import { ComponentContainer, JsonValue } from "golden-layout"

export const GL_COMPONENTS = new InjectionToken<{[key: string]: Type<Component>}>('GoldenLayoutComponents');

@Injectable({
  providedIn: 'root'
})
export class GoldenLayoutComponentService {
  private _componentTypes = new Map<string, Type<Component>>()

  public get componentTypes(): ReadonlyMap<string, Type<Component>> {
    return this._componentTypes;
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    let components = inject(GL_COMPONENTS);
    for(let name in components) {
      this.registerComponentType(name, components[name])
    }
  }

  registerComponentType(name: string, componentType: Type<Component>) {
    this._componentTypes.set(name, componentType);
  }

  createComponent(componentTypeJsonValue: JsonValue, container: ComponentContainer, parentInjector: Injector) {
    const componentType = this._componentTypes.get(componentTypeJsonValue as string);
    if (componentType === undefined) {
      throw new Error('Unknown component type')
    } else {
      const injector = Injector.create({
        providers: [{ provide: ComponentContainer, useValue: container }],
        parent: parentInjector
      });
      const componentFactoryRef = this.componentFactoryResolver.resolveComponentFactory<Component>(componentType);
      return componentFactoryRef.create(injector);
    }
  }
}
