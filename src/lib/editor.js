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
import Keyboard from "diagram-js/lib/features/keyboard";
import EditorActions from "diagram-js/lib/features/editor-actions";
import Clipboard from "diagram-js/lib/features/clipboard";
import GlobalConnect from "diagram-js/lib/features/global-connect";
import Dragging from "diagram-js/lib/features/dragging";
import Connect from "diagram-js/lib/features/connect";
import Mouse from "diagram-js/lib/features/mouse";
import CommandStack from "diagram-js/lib/command";

import MyCustomModules from "./providers";

export function createDiagram({ container, saveDiagram }) {
    var diagram = new Diagram({
        canvas: {
            container,
        },
        modules: [
            ConnectModule,
            ConnectPreview,
            KeyboardMoveCanvasModule,
            Clipboard,
            GlobalConnect,
            CopyPaste,
            Dragging,
            CommandStack,
            Mouse,
            Connect,
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
        keyboard: { bindTo: document.body },
    });

    var canvas = diagram.get("canvas"),
        defaultRenderer = diagram.get("defaultRenderer"),
        elementFactory = diagram.get("elementFactory"),
        clipboard = diagram.get("clipboard"),
        copyPaste = diagram.get("copyPaste"),
        eventBus = diagram.get("eventBus");

    eventBus.fire("attach");

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

    eventBus.on("save.getRoot", () => root);
    eventBus.on("save.sendData", () => saveDiagram(clipboard.get()));
    eventBus.on("save.loadData", ({ data: { diagram: data } }) => {
        clipboard.set(data);
        copyPaste.paste({ element: root, point: { x: 400, y: 200 } });
    });

    canvas.setRootElement(root);

    return diagram;
}
