/**
 * An example context pad provider.
 */
export default class ContextPadProvider {
    constructor(connect, contextPad, modeling, autoPlace, elementFactory) {
        this._connect = connect;
        this._modeling = modeling;
        this._autoPlace = autoPlace;
        this._elementFactory = elementFactory;

        contextPad.registerProvider(this);
    }
    getContextPadEntries = function (element) {
        var connect = this._connect,
            modeling = this._modeling,
            autoPlace = this._autoPlace,
            elementFactory = this._elementFactory;

        function removeElement() {
            modeling.removeElements([element]);
        }

        function startConnect(event, element, autoActivate) {
            connect.start(event, element, autoActivate);
        }

        function addBlock(event, element) {
            const newBox = elementFactory.createShape({
                width: 100,
                height: 80,
            });
            autoPlace.append(element, newBox);
        }

        if (!element.id.includes("shape"))
            return {
                delete: {
                    group: "edit",
                    className: "context-pad-icon-remove",
                    title: "Remove",
                    action: {
                        click: removeElement,
                        dragstart: removeElement,
                    },
                },
            };

        return {
            delete: {
                group: "edit",
                className: "context-pad-icon-remove",
                title: "Remove",
                action: {
                    click: removeElement,
                    dragstart: removeElement,
                },
            },
            connect: {
                group: "edit",
                className: "context-pad-icon-connect",
                title: "Connect",
                action: {
                    click: startConnect,
                    dragstart: startConnect,
                },
            },
            newBlock: {
                group: "create",
                className: "context-pad-icon-new-block",
                title: "New block",
                action: {
                    click: addBlock,
                },
            },
        };
    };
}

ContextPadProvider.$inject = ["connect", "contextPad", "modeling", "autoPlace", "elementFactory"];
