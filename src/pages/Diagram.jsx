import { createDiagram } from "../lib/editor";
import { useEffect, useRef } from "react";
import "../lib/diagram-js.css";

export default function Diagram() {
    const root = useRef(null);
    useEffect(() => {
        const diagramRoot = root.current;

        const setCurrentDimensions = () => {
            diagramRoot.style.width = `${window.innerWidth}px`;
            diagramRoot.style.height = `${window.innerHeight}px`;
        };
        setCurrentDimensions();
        window.addEventListener("resize", setCurrentDimensions);

        let diagram;
        if (diagramRoot) diagram = createDiagram({ container: diagramRoot });
        return () => {
            window.removeEventListener("resize", setCurrentDimensions)
            diagram.destroy();
        };
    }, []);
    // const editor = new Editor({ container: root.current });

    return <div ref={root} id="diagram"></div>;
}
