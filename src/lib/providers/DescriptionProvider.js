/**
 * An example context pad provider.
 */

export default class DescriptionProvider {
    constructor(eventBus, modeling, overlays) {
        this._eventBus = eventBus;
        this._modeling = modeling;
        this._overlays = overlays;
        eventBus.on("element.dblclick", (e) => this.createDescription(e.element));
        eventBus.on("resize.ended", (e) => this.updateDescriptionSize(e.shape));
    }

    createDescription(target) {
        console.log(target);
        if (target.isFrame || !target.id.includes("shape") || target.overlayId) return;
        target.overlayId = this._overlays.add(target, {
            position: {
                top: target.height / 2 - 11,
                left: 5,
            },
            html: `<input type="text" style="width: ${target.width - 18}px" placeholder="Description..." />`,
        });
    }

    updateDescriptionSize(target) {
        if (!target.overlayId) return;
        const overlay = this._overlays.get(target.overlayId);
        overlay.htmlContainer.lastChild.style.width = target.width - 18 + "px";
        overlay.position.top = target.height / 2 - 11;
        this._overlays._updateOverlay(overlay);
    }
}

DescriptionProvider.$inject = ["eventBus", "modeling", "overlays"];
