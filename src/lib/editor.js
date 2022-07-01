import Diagram from "diagram-js";

import ConnectModule from "diagram-js/lib/features/connect";
import ContextPadModule from "diagram-js/lib/features/context-pad";
import CreateModule from "diagram-js/lib/features/create";
import LassoToolModule from "diagram-js/lib/features/lasso-tool";
import ModelingModule from "diagram-js/lib/features/modeling";
import MoveCanvasModule from "diagram-js/lib/navigation/movecanvas";
import MoveModule from "diagram-js/lib/features/move";
import OutlineModule from "diagram-js/lib/features/outline";
import PaletteModule from "diagram-js/lib/features/palette";
import ResizeModule from "diagram-js/lib/features/resize";
import RulesModule from "diagram-js/lib/features/rules";
import SelectionModule from "diagram-js/lib/features/selection";
import ZoomScrollModule from "diagram-js/lib/navigation/zoomscroll";

import ExampleContextPadProvider from "./providers/ExampleContextPadProvider";
import ExamplePaletteProvider from "./providers/ExamplePaletteProvider";
import ExampleRuleProvider from "./providers/ExampleRuleProvider";

export function createDiagram({container}) {
    console.log("container", container);
    var ExampleModule = {
        __init__: ["exampleContextPadProvider", "examplePaletteProvider", "exampleRuleProvider"],
        exampleContextPadProvider: ["type", ExampleContextPadProvider],
        examplePaletteProvider: ["type", ExamplePaletteProvider],
        exampleRuleProvider: ["type", ExampleRuleProvider],
    };

    var diagram = new Diagram({
        canvas: {
            container,
        },
        modules: [
            ConnectModule,
            ContextPadModule,
            CreateModule,
            ExampleModule,
            LassoToolModule,
            ModelingModule,
            MoveCanvasModule,
            MoveModule,
            OutlineModule,
            PaletteModule,
            ResizeModule,
            RulesModule,
            SelectionModule,
            ZoomScrollModule,
        ],
    });

    console.log("diagram", diagram);

    var canvas = diagram.get("canvas"),
        defaultRenderer = diagram.get("defaultRenderer"),
        elementFactory = diagram.get("elementFactory"),
        selection = diagram.get("selection");

    // override default styles
    defaultRenderer.CONNECTION_STYLE = {
        fill: "none",
        strokeWidth: 5,
        stroke: "#000",
    };
    defaultRenderer.SHAPE_STYLE = {
        fill: "white",
        stroke: "#000",
        strokeWidth: 2,
    };
    defaultRenderer.FRAME_STYLE = {
        fill: "none",
        stroke: "#000",
        strokeDasharray: 4,
        strokeWidth: 2,
    };

    // add root
    var root = elementFactory.createRoot();

    canvas.setRootElement(root);

    // add shapes
    var shape1 = elementFactory.createShape({
        x: 150,
        y: 100,
        width: 100,
        height: 80,
    });

    canvas.addShape(shape1, root);

    var shape2 = elementFactory.createShape({
        x: 290,
        y: 220,
        width: 100,
        height: 80,
    });

    canvas.addShape(shape2, root);
    console.log(shape2)

    var connection1 = elementFactory.createConnection({
        waypoints: [
            { x: 250, y: 180 },
            { x: 290, y: 220 },
        ],
        source: shape1,
        target: shape2,
    });

    canvas.addConnection(connection1, root);

    var shape3 = elementFactory.createShape({
        x: 450,
        y: 80,
        width: 100,
        height: 80,
    });

    canvas.addShape(shape3, root);

    var shape4 = elementFactory.createShape({
        x: 425,
        y: 50,
        width: 300,
        height: 200,
        isFrame: true,
    });

    canvas.addShape(shape4, root);

    selection.select(shape3);

    return diagram
}
