/**
 * An example context pad provider.
 */

export default class DescriptionProvider {
    constructor(eventBus, tooltips, modeling) {
        this.eventBus = eventBus;
        this.tooltips = tooltips;
        this.modeling = modeling;
        eventBus.on("element.dblclick", (e) => this.createDescription(e.element));
        eventBus.on(["shape.move.cleanup", "resize.cleanup"], (e) => this.updateDescriptionPosition(e.shape));
    }

    createDescription(target) {
        console.log(target);
        if (target.isFrame || !target.id.includes("shape") || target.tooltipId) return;
        target.tooltipId = this.tooltips.add({
            position: {
                x: target.x + 5,
                y: target.y + target.height / 2 - 11,
            },
            html: `<input type="text" style="width: ${target.width - 18}px" placeholder="Description..." />`,
        });
    }

    updateDescriptionPosition(target) {
        if (!target.tooltipId) return;
        const tooltip = this.tooltips.get(target.tooltipId);
        tooltip.position.x = target.x + 5;
        tooltip.position.y = target.y + target.height / 2 - 11;
        tooltip.htmlContainer.lastChild.style.width = target.width - 18 + "px";
        this.tooltips._updateTooltip(tooltip);
    }
}

DescriptionProvider.$inject = ["eventBus", "tooltips", "modeling"];
