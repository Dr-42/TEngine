namespace TSE {
    /**
    * The Engine class is the main entry point for the application.
    * It is in charge of creating the canvas and the WebGL context.
    * It also starts the game loop.
    */
    export class Engine {
        private canvas: HTMLCanvasElement | undefined;

        public constructor() {}
        /**
         * Initializes the Engine and starts the game loop.
         */
        public start(): void {
            console.log("Engine started.")
            this.canvas = GLUtils.getGLContext();
            gl.clearColor(0.3, 0.0, 0.3, 1.0);
            this.resize();
            this.loop();
        }

        /**
         * Resizes the canvas to fit the window.
         */
        public resize(): void {
            if(this.canvas !== undefined) {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight * 0.99;
                gl.viewport(0, 0, this.canvas.width, this.canvas.height);
            }
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