/**
 * An example context pad provider.
 */
export default class ExampleContextPadProvider {
    constructor(connect, contextPad, modeling) {
        this._connect = connect;
        this._modeling = modeling;

        contextPad.registerProvider(this);
    }
    getContextPadEntries = function (element) {
        var connect = this._connect,
            modeling = this._modeling;

        function removeElement() {
            modeling.removeElements([element]);
        }

        function startConnect(event, element, autoActivate) {
            connect.start(event, element, autoActivate);
        }

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
        };
    };
}

ExampleContextPadProvider.$inject = ["connect", "contextPad", "modeling"];