namespace TSE {
    /**
    * The Engine class is the main entry point for the application.
    * It is in charge of creating the canvas and the WebGL context.
    * It also starts the game loop.
    */
    export class Engine {
        public constructor() {}
        /**
         * Initializes the Engine and starts the game loop.
         */
        public start(): void {
            console.log("Engine started.")
            let canvas = GLUtils.getGLContext();
            gl.clearColor(0.3, 0.0, 0.3, 1.0);
            this.loop();
        }
        /**
         * The game loop.
         */
        private loop(): void {
            gl.clear(gl.COLOR_BUFFER_BIT);
            requestAnimationFrame(this.loop.bind(this));
        }
    }
}