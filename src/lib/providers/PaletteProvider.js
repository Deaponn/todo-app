/**
 * A example palette provider.
 */
export default class PaletteProvider {
    constructor(create, elementFactory, lassoTool, handTool, palette) {
        this._create = create;
        this._elementFactory = elementFactory;
        this._lassoTool = lassoTool;
        this.handTool = handTool;
        this._palette = palette;

        palette.registerProvider(this);
    }

    getPaletteEntries = function () {
        var create = this._create,
            elementFactory = this._elementFactory,
            lassoTool = this._lassoTool;

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
        };
    };
}

PaletteProvider.$inject = ["create", "elementFactory", "lassoTool", "handTool", "palette"];
