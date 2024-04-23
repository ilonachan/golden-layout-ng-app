import { ComponentItemConfig, ItemType, LayoutConfig } from "golden-layout";
import { BooleanComponent } from './tabs/boolean.component';
import { ColorComponent } from './tabs/color.component';
import { TextComponent } from './tabs/text.component';

const miniRow: LayoutConfig = {
    root: {
        type: ItemType.row,
        content: [
            {
                type: "component",
                id: "miniRowConfig - Golden",
                title: "Golden",
                header: {
                    show: "top",
                },
                isClosable: false,
                componentType: ColorComponent.componentTypeName,
                width: 30,
                componentState: 'gold',
            } as ComponentItemConfig,
            {
                title: "Layout",
                header: { show: "top", popout: false },
                type: "component",
                componentType: ColorComponent.componentTypeName,
                componentState: undefined,
            } as ComponentItemConfig,
        ],
    },
};

const miniStack: LayoutConfig = {
    root: {
        type: ItemType.stack,
        content: [
            {
                type: "component",
                title: "Golden",
                header: {
                    show: "top",
                },
                isClosable: false,
                componentType: ColorComponent.componentTypeName,
                width: 30,
                componentState: 'white',
            } as ComponentItemConfig,
            {
                title: "Layout",
                header: { show: "top", popout: false },
                type: "component",
                componentType: ColorComponent.componentTypeName,
                componentState: 'green',
            } as ComponentItemConfig,
        ],
    },
};

const standard: LayoutConfig = {
    root: {
        type: "row",
        content: [
            {
                width: 80,
                type: "column",
                content: [
                    {
                        title: "Fnts 100",
                        header: { show: "bottom" },
                        type: "component",
                        componentType: ColorComponent.componentTypeName,
                    },
                    {
                        type: "row",
                        content: [
                            {
                                type: "component",
                                title: "Golden",
                                header: { show: "right" },
                                isClosable: false,
                                componentType: ColorComponent.componentTypeName,
                                width: 30,
                                componentState: {
                                    bg: "golden_layout_spiral.png",
                                },
                            } as ComponentItemConfig,
                            {
                                title: "Layout",
                                header: {
                                    show: "left",
                                    popout: false,
                                },
                                type: "component",
                                componentType: ColorComponent.componentTypeName,
                                componentState: {
                                    bg: "golden_layout_text.png",
                                },
                            } as ComponentItemConfig,
                        ],
                    },
                    {
                        type: "stack",
                        content: [
                            {
                                type: "component",
                                title: "Acme, inc.",
                                componentType: ColorComponent.componentTypeName,
                                componentState: {
                                    companyName: "Stock X",
                                },
                            } as ComponentItemConfig,
                            {
                                type: "component",
                                title: "LexCorp plc.",
                                componentType: ColorComponent.componentTypeName,
                                componentState: {
                                    companyName: "Stock Y",
                                },
                            } as ComponentItemConfig,
                            {
                                type: "component",
                                title: "Springshield plc.",
                                componentType: ColorComponent.componentTypeName,
                                componentState: {
                                    companyName: "Stock Z",
                                },
                            } as ComponentItemConfig,
                        ],
                    },
                ],
            },
            {
                width: 50,
                type: "row",
                title: "test stack",
                content: [
                    {
                        type: "stack",
                        title: "test row",
                        content: [
                            {
                                type: "component",
                                title: "comp 1",
                                componentType: ColorComponent.componentTypeName,
                                componentState: {
                                    companyName: "Stock X",
                                },
                            } as ComponentItemConfig,
                            {
                                type: "component",
                                title: "comp 2",
                                componentType: ColorComponent.componentTypeName,
                                componentState: {
                                    companyName: "Stock Y",
                                },
                            } as ComponentItemConfig,
                            {
                                type: "component",
                                title: "comp 3",
                                componentType: ColorComponent.componentTypeName,
                                componentState: {
                                    companyName: "Stock Z",
                                },
                            } as ComponentItemConfig,
                        ],
                    },
                ],
            },
        ],
    },
};

const responsive: LayoutConfig = {
    settings: {
        responsiveMode: "always",
    },
    dimensions: {
        minItemWidth: 250,
    },
    root: {
        type: "row",
        content: [
            {
                width: 30,
                type: "column",
                content: [
                    {
                        title: "Fnts 100",
                        type: "component",
                        componentType: ColorComponent.componentTypeName,
                    },
                    {
                        type: "row",
                        content: [
                            {
                                type: "component",
                                title: "Golden",
                                componentType: ColorComponent.componentTypeName,
                                width: 30,
                                componentState: 'Gold',
                            } as ComponentItemConfig,
                        ],
                    },
                    {
                        type: "stack",
                        content: [
                            {
                                type: "component",
                                title: "Acme, inc.",
                                componentType: ColorComponent.componentTypeName,
                                componentState: 'red',
                            } as ComponentItemConfig,
                            {
                                type: "component",
                                title: "LexCorp plc.",
                                componentType: ColorComponent.componentTypeName,
                                componentState: {
                                    companyName: "Stock Y",
                                },
                            } as ComponentItemConfig,
                            {
                                type: "component",
                                title: "Springshield plc.",
                                componentType: ColorComponent.componentTypeName,
                                componentState: {
                                    companyName: "Stock Z",
                                },
                            } as ComponentItemConfig,
                        ],
                    },
                ],
            },
            {
                width: 30,
                title: "Layout",
                type: "component",
                componentType: ColorComponent.componentTypeName,
                componentState: 'green',
            } as ComponentItemConfig,
            {
                width: 20,
                type: "component",
                title: "Market",
                componentType: ColorComponent.componentTypeName,
                componentState: 'white',
            } as ComponentItemConfig,
            {
                width: 20,
                type: "column",
                content: [
                    {
                        height: 20,
                        type: "component",
                        title: "Performance",
                        componentType: ColorComponent.componentTypeName,
                    },
                    {
                        height: 80,
                        type: "component",
                        title: "Profile",
                        componentType: ColorComponent.componentTypeName,
                    },
                ],
            },
        ],
    },
};

const tabDropdown: LayoutConfig = {
    settings: {
        tabOverlapAllowance: 25,
        reorderOnTabMenuClick: false,
        tabControlOffset: 5,
    },
    root: {
        type: "row",
        content: [
            {
                width: 30,
                type: "column",
                content: [
                    {
                        title: "Fnts 100",
                        type: "component",
                        componentType: TextComponent.componentTypeName,
                    },
                    {
                        type: "row",
                        content: [
                            {
                                type: "component",
                                title: "Golden",
                                componentType: TextComponent.componentTypeName,
                                width: 30,
                                componentState: {
                                    text: 'hello',
                                },
                            } as ComponentItemConfig,
                        ],
                    },
                    {
                        type: "stack",
                        content: [
                            {
                                type: "component",
                                title: "Acme, inc.",
                                componentType: ColorComponent.componentTypeName,
                                componentState: {
                                    companyName: "Stock X",
                                },
                            } as ComponentItemConfig,
                            {
                                type: "component",
                                title: "LexCorp plc.",
                                componentType: ColorComponent.componentTypeName,
                                componentState: {
                                    companyName: "Stock Y",
                                },
                            } as ComponentItemConfig,
                            {
                                type: "component",
                                title: "Springshield plc.",
                                componentType: ColorComponent.componentTypeName,
                                componentState: {
                                    companyName: "Stock Z",
                                },
                            } as ComponentItemConfig,
                        ],
                    },
                ],
            },
            {
                width: 20,
                type: "stack",
                content: [
                    {
                        type: "component",
                        title: "Market",
                        componentType: ColorComponent.componentTypeName,
                    },
                    {
                        type: "component",
                        title: "Performance",
                        componentType: ColorComponent.componentTypeName,
                    },
                    {
                        type: "component",
                        title: "Trend",
                        componentType: ColorComponent.componentTypeName,
                    },
                    {
                        type: "component",
                        title: "Balance",
                        componentType: ColorComponent.componentTypeName,
                    },
                    {
                        type: "component",
                        title: "Budget",
                        componentType: ColorComponent.componentTypeName,
                    },
                    {
                        type: "component",
                        title: "Curve",
                        componentType: ColorComponent.componentTypeName,
                    },
                    {
                        type: "component",
                        title: "Standing",
                        componentType: ColorComponent.componentTypeName,
                    },
                    {
                        type: "component",
                        title: "Lasting",
                        componentType: ColorComponent.componentTypeName,
                        componentState: {
                            bg: "golden_layout_spiral.png",
                        },
                    } as ComponentItemConfig,
                    {
                        type: "component",
                        title: "Profile",
                        componentType: ColorComponent.componentTypeName,
                    },
                ],
            },
            {
                width: 30,
                title: "Layout",
                type: "component",
                componentType: BooleanComponent.componentTypeName,
                componentState: true,
            } as ComponentItemConfig,
        ],
    },
};

export const predefinedLayouts: {[key: string]: LayoutConfig} = {
    miniRow, miniStack, responsive, standard, tabDropdown
}
// export const predefinedLayouts: readonly Layout[] = [miniRowLayout, miniStackLayout, responsiveLayout, standardLayout, tabDropdownLayout];
// export const predefinedLayoutNames: readonly string[] = predefinedLayouts.map((layout) => layout.name);
