import Diagram from "diagram-js";

import ConnectModule from "diagram-js/lib/features/connect";
import ConnectPreview from "diagram-js/lib/features/connection-preview";
import ContextPadModule from "diagram-js/lib/features/context-pad";
import CopyPaste from "diagram-js/lib/features/copy-paste";
import CreateModule from "diagram-js/lib/features/create";
import LassoToolModule from "diagram-js/lib/features/lasso-tool";
import ModelingModule from "diagram-js/lib/features/modeling";
import MoveCanvasModule from "diagram-js/lib/navigation/movecanvas";
import KeyboardMoveCanvasModule from "diagram-js/lib/navigation/keyboard-move";
import MoveModule from "diagram-js/lib/features/move";
import OutlineModule from "diagram-js/lib/features/outline";
import PaletteModule from "diagram-js/lib/features/palette";
import ResizeModule from "diagram-js/lib/features/resize";
import RulesModule from "diagram-js/lib/features/rules";
import SelectionModule from "diagram-js/lib/features/selection";
import ZoomScrollModule from "diagram-js/lib/navigation/zoomscroll";
import GridSnapping from "diagram-js/lib/features/grid-snapping";
import InteractionEvents from "diagram-js/lib/features/interaction-events";
import HandTool from "diagram-js/lib/features/hand-tool";
import Tooltips from "diagram-js/lib/features/tooltips";
import AutoPlace from "diagram-js/lib/features/auto-place";
import AutoScroll from "diagram-js/lib/features/auto-scroll";
import Keyboard from "diagram-js/lib/features/keyboard"
import EditorActions from "diagram-js/lib/features/editor-actions"

import MyCustomModules from "./providers";

export function createDiagram({ container }) {
    // console.log("container", container);

    var diagram = new Diagram({
        canvas: {
            container,
        },
        modules: [
            ConnectModule,
            ConnectPreview,
            KeyboardMoveCanvasModule,
            CopyPaste,
            ContextPadModule,
            CreateModule,
            LassoToolModule,
            ModelingModule,
            MoveCanvasModule,
            MoveModule,
            OutlineModule,
            Keyboard,
            EditorActions,
            PaletteModule,
            ResizeModule,
            RulesModule,
            MyCustomModules,
            SelectionModule,
            ZoomScrollModule,
            InteractionEvents,
            Tooltips,
            HandTool,
            GridSnapping,
            AutoPlace,
            AutoScroll,
        ],
    });

    console.log("diagram", diagram);

    var canvas = diagram.get("canvas"),
        defaultRenderer = diagram.get("defaultRenderer"),
        elementFactory = diagram.get("elementFactory"),
        selection = diagram.get("selection"),
        copyPaste = diagram.get("copyPaste"),
        eventBus = diagram.get("eventBus")

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
        x: 600,
        y: 300,
        width: 100,
        height: 80,
    });

    eventBus.on("copyPaste.elementsCopied", (e) => console.log("copied", e))

    canvas.addShape(shape3, root);

    console.log(root, copyPaste.createTree(root.id));
    console.log(copyPaste)

    copyPaste.paste(root, {x: 600, y: 100});
    var shape4 = elementFactory.createShape({
        x: 425,
        y: 50,
        width: 300,
        height: 200,
        isFrame: true,
    });

    canvas.addShape(shape4, root);

    selection.select(shape3);

    return diagram;
}
