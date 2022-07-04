import { createDiagram } from "../lib/editor";
import { useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import "../lib/diagram-js.css";

export default function Diagram() {
    const root = useRef(null);
    const [searchParams] = useSearchParams();

    const saveDiagram = useCallback(
        (data) => {
            fetch("http://localhost:8080/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: searchParams.get("todo_id"), data }),
            });
        },
        [searchParams]
    );

    const setDiagramData = useCallback(
        async (eventBus) => {
            const response = await fetch(`http://localhost:8080/diagram?id=${searchParams.get("todo_id")}`);
            const data = await response.json();
            eventBus.fire("save.loadData", data);
        },
        [searchParams]
    );

    useEffect(() => {
        const diagramRoot = root.current;

        const setCurrentDimensions = () => {
            diagramRoot.style.width = `${window.innerWidth}px`;
            diagramRoot.style.height = `${window.innerHeight}px`;
        };
        setCurrentDimensions();
        window.addEventListener("resize", setCurrentDimensions);

        let diagram;
        if (diagramRoot) diagram = createDiagram({ container: diagramRoot, saveDiagram });
        const eventBus = diagram.get("eventBus");

        setDiagramData(eventBus);

        return () => {
            window.removeEventListener("resize", setCurrentDimensions);
            diagram.destroy();
        };
    }, [saveDiagram, setDiagramData]);

    return <div ref={root} id="diagram" style={{ backgroundColor: "white" }}></div>;
}
