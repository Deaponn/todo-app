/**
 * A example palette provider.
 */
export default class PaletteProvider {
    constructor(create, elementFactory, lassoTool, palette, globalConnect, copyPaste, eventBus) {
        this._create = create;
        this._elementFactory = elementFactory;
        this._lassoTool = lassoTool;
        this._palette = palette;
        this._globalConnect = globalConnect;
        this._copyPaste = copyPaste;
        this._eventBus = eventBus;

        palette.registerProvider(this);
    }

    getPaletteEntries = function () {
        var create = this._create,
            elementFactory = this._elementFactory,
            lassoTool = this._lassoTool,
            globalConnect = this._globalConnect,
            copyPaste = this._copyPaste,
            eventBus = this._eventBus

        return {
            "selection-tool": {
                group: "tools",
                className: "palette-icon-lasso-tool",
                title: "Activate Lasso Tool",
                action: {
                    click: function (event) {
                        lassoTool.activateSelection(event);
                    },
                },
            },
            "global-connection-tool": {
                group: "tools",
                className: "palette-icon-global-connection",
                title: "Gobal Connection Tool",
                action: {
                    click: function () {
                        globalConnect.start();
                    },
                },
            },
            "tool-separator": {
                group: "tools",
                separator: true,
            },
            "create-shape": {
                group: "create",
                className: "palette-icon-create-shape",
                title: "Create Shape",
                action: {
                    click: function (e) {
                        var shape = elementFactory.createShape({
                            width: 100,
                            height: 80,
                        });

                        create.start(e, shape);
                    },
                },
            },
            "create-frame": {
                group: "create",
                className: "palette-icon-create-frame",
                title: "Create Frame",
                action: {
                    click: function (e) {
                        var shape = elementFactory.createShape({
                            width: 300,
                            height: 200,
                            isFrame: true,
                        });

                        create.start(e, shape);
                    },
                },
            },
            "create-separator": {
                group: "create",
                separator: true,
            },
            "save-diagram": {
                group: "control",
                className: "palette-icon-save-diagram",
                title: "Save Diagram",
                action: {
                    click: function (e) {
                        const root = eventBus.fire("save.getRoot")
                        copyPaste.copy(root.children);
                        eventBus.fire("save.sendData")
                    },
                },
            },
        };
    };
}

PaletteProvider.$inject = ["create", "elementFactory", "lassoTool", "palette", "globalConnect", "copyPaste", "eventBus"];
