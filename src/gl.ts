namespace TSE {
    /**
     * The global WebGL rendering context.
     */
    export var gl: WebGLRenderingContext;

    /**
     * A utility class for working with WebGL.
     */
    export class GLUtils {
        /**
         * Creates a WebGL canvas(or uses the one provided) and initializes a WebGL context.
         * @param canvasID The id of the canvas element on the page.
         * @returns The WebGL canvas element.
         */
        public static getGLContext(canvasID?: string): HTMLCanvasElement {
            let canvas : HTMLCanvasElement;
            
            if(canvasID === undefined) {
                canvas = document.createElement("canvas");
                if (canvas === undefined) {
                    throw new Error("Your browser does not support HTML5 canvas.");
                }
                document.body.appendChild(canvas);
            } else {
                canvas = document.getElementById(canvasID) as HTMLCanvasElement;
                if(canvas === undefined) {
                    throw new Error(`Cannot find a canvas element named: ${canvasID}`);
                }
            }

            gl = canvas.getContext("webgl") as WebGLRenderingContext;
            if(gl === undefined) {
                throw new Error("Unable to initialize WebGL.");
            }

            return canvas;
        }
    }
}