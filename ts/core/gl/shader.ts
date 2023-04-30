namespace TSE {
    /**
     * Represents a WebGL shader.
     */
    export class Shader {
        private _name: string;
        private _program: WebGLProgram;

        /**
         * Creates a new shader.
         * @param name the name of the shader.
         * @param vertexSource the vertex shader source code.
         * @param fragmentSource the fragment shader source code.
         */
        public constructor(name: string, vertexSource: string, fragmentSource: string) {
            this._name = name;
            this._program = this.createShaderProgram(vertexSource, fragmentSource);
        }

        /**
         * Gets the name of the shader.
         * @returns The name of the shader.
         */
        public get_name(): string {
            return this._name;
        }

        /**
         * Uses the shader program.
         */
        public use(): void {
            gl.useProgram(this._program);
        }

        /**
         * Creates a shader program.
         * @param vertexSource the vertex shader source code.
         * @param fragmentSource the fragment shader source code.
         * @returns A WebGL shader program.
         * @throws An error if the shader cannot be compiled or linked.
         */
        private createShaderProgram(vertexSource: string, fragmentSource: string): WebGLProgram {
            let shaderProgram: WebGLProgram = gl.createProgram() as WebGLProgram;
            let vertexShader: WebGLShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
            let fragmentShader: WebGLShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

            gl.attachShader(shaderProgram, vertexShader);
            gl.attachShader(shaderProgram, fragmentShader);
            gl.linkProgram(shaderProgram);

            let error = gl.getProgramInfoLog(shaderProgram);
            if (error !== "") {
                throw new Error(`Error linking shader program: ${error}`);
            }
            return shaderProgram;
        }

        /**
         * Loads a shader.
         * @param shaderSource the shader source code.
         * @param shaderType the type of shader to load.
         * @returns A WebGL shader.
         * @throws An error if the shader cannot be compiled.
         */
        private loadShader(shaderSource: string, shaderType: number): WebGLShader {
            let shader: WebGLShader = gl.createShader(shaderType) as WebGLShader;

            gl.shaderSource(shader, shaderSource);
            gl.compileShader(shader);

            let error = gl.getShaderInfoLog(shader);
            if (error !== "") {
                throw new Error(`Error compiling shader: ${error}`);
            }
            return shader;
        }
    }
}