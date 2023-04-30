namespace TSE {
    /**
    * The Engine class is the main entry point for the application.
    * It is in charge of creating the canvas and the WebGL context.
    * It also starts the game loop.
    */
    export class Engine {
        private _canvas: HTMLCanvasElement | undefined;
        private _shader: Shader | undefined;
        private _triangleVertexBuffer: WebGLBuffer | undefined;

        public constructor() { }
        /**
         * Initializes the Engine and starts the game loop.
         */
        public start(): void {
            console.log("Engine started.")
            this._canvas = GLUtils.getGLContext();
            this.resize();
            gl.clearColor(0.3, 0.0, 0.3, 1.0);

            this.loadShaders();
            if (this._shader === undefined) {
                throw new Error("Shader failed to load.");
            }
            this._shader.use();
            this.loadBuffers();
            if (this._triangleVertexBuffer === undefined) {
                throw new Error("Failed to create buffer.");
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this._triangleVertexBuffer);
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);

            this.loop();
        }

        /**
         * Resizes the canvas to fit the window.
         */
        public resize(): void {
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight * 0.99;
                gl.viewport(0, 0, this._canvas.width, this._canvas.height);
            }
        }

        /**
         * The game loop.
         */
        private loop(): void {
            gl.clear(gl.COLOR_BUFFER_BIT);
            if (this._shader === undefined) {
                throw new Error("Shader failed to load.");
            }
            this._shader.use();
            if (this._triangleVertexBuffer === undefined) {
                throw new Error("Failed to create buffer.");
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this._triangleVertexBuffer);
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);

            gl.drawArrays(gl.TRIANGLES, 0, 6);

            requestAnimationFrame(this.loop.bind(this));
        }

        /**
         * Create buffers and load data into them.
         */
        private loadBuffers(): void {
            let triangleVertices: number[] = [
                0.0, 0.0, 0.0,
                0.0, 0.5, 0.0,
                0.5, 0.5, 0.0,
                -0.1, -0.1, 0.0,
                0.0, 0.6, 0.0,
                -0.5, -0.5, 0.0
            ];

            this._triangleVertexBuffer = gl.createBuffer() as WebGLBuffer;
            gl.bindBuffer(gl.ARRAY_BUFFER, this._triangleVertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);
        }

        /**
         * Loads shaders
         */
        private loadShaders(): void {
            let vertexShaderSource: string = `
                attribute vec3 aVertexPosition;

                void main() {
                    gl_Position = vec4(aVertexPosition, 1.0);
                }`;
            let fragmentShaderSource: string = `
                precision mediump float;

                void main() {
                    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
                }`;

            this._shader = new Shader("basic", vertexShaderSource, fragmentShaderSource);
        }
    }
}