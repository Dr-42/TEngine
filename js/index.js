"use strict";
// Author: Dr. Spandan Roy
//
// This file is the entry point of the game.
var game;
window.onload = function () {
    game = new TSE.Engine();
    game.start();
};
window.onresize = function () {
    game.resize();
};
var TSE;
(function (TSE) {
    /**
    * The Engine class is the main entry point for the application.
    * It is in charge of creating the canvas and the WebGL context.
    * It also starts the game loop.
    */
    var Engine = /** @class */ (function () {
        function Engine() {
        }
        /**
         * Initializes the Engine and starts the game loop.
         */
        Engine.prototype.start = function () {
            console.log("Engine started.");
            this._canvas = TSE.GLUtils.getGLContext();
            this.resize();
            TSE.gl.clearColor(0.3, 0.0, 0.3, 1.0);
            this.loadShaders();
            if (this._shader === undefined) {
                throw new Error("Shader failed to load.");
            }
            this._shader.use();
            this.loop();
        };
        /**
         * Resizes the canvas to fit the window.
         */
        Engine.prototype.resize = function () {
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight * 0.99;
                TSE.gl.viewport(0, 0, this._canvas.width, this._canvas.height);
            }
        };
        /**
         * The game loop.
         */
        Engine.prototype.loop = function () {
            TSE.gl.clear(TSE.gl.COLOR_BUFFER_BIT);
            requestAnimationFrame(this.loop.bind(this));
        };
        /**
         * Loads shaders
         */
        Engine.prototype.loadShaders = function () {
            var vertexShaderSource = "\n                attribute vec3 aVertexPosition;\n\n                void main() {\n                    gl_Position = vec4(aVertexPosition, 1.0);\n                }";
            var fragmentShaderSource = "\n                void main() {\n                    gl_FragColor = vec4(1.0);\n                }";
            this._shader = new TSE.Shader("basic", vertexShaderSource, fragmentShaderSource);
        };
        return Engine;
    }());
    TSE.Engine = Engine;
})(TSE || (TSE = {}));
var TSE;
(function (TSE) {
    /**
     * A utility class for working with WebGL.
     */
    var GLUtils = /** @class */ (function () {
        function GLUtils() {
        }
        /**
         * Creates a WebGL canvas(or uses the one provided) and initializes a WebGL context.
         * @param canvasID The id of the canvas element on the page.
         * @returns The WebGL canvas element.
         */
        GLUtils.getGLContext = function (canvasID) {
            var canvas;
            if (canvasID === undefined) {
                canvas = document.createElement("canvas");
                if (canvas === undefined) {
                    throw new Error("Your browser does not support HTML5 canvas.");
                }
                document.body.appendChild(canvas);
            }
            else {
                canvas = document.getElementById(canvasID);
                if (canvas === undefined) {
                    throw new Error("Cannot find a canvas element named: ".concat(canvasID));
                }
            }
            TSE.gl = canvas.getContext("webgl");
            if (TSE.gl === undefined) {
                throw new Error("Unable to initialize WebGL.");
            }
            return canvas;
        };
        return GLUtils;
    }());
    TSE.GLUtils = GLUtils;
})(TSE || (TSE = {}));
var TSE;
(function (TSE) {
    /**
     * Represents a WebGL shader.
     */
    var Shader = /** @class */ (function () {
        /**
         * Creates a new shader.
         * @param name the name of the shader.
         * @param vertexSource the vertex shader source code.
         * @param fragmentSource the fragment shader source code.
         */
        function Shader(name, vertexSource, fragmentSource) {
            this._name = name;
            this._program = this.createShaderProgram(vertexSource, fragmentSource);
        }
        /**
         * Gets the name of the shader.
         * @returns The name of the shader.
         */
        Shader.prototype.get_name = function () {
            return this._name;
        };
        /**
         * Uses the shader program.
         */
        Shader.prototype.use = function () {
            TSE.gl.useProgram(this._program);
        };
        /**
         * Creates a shader program.
         * @param vertexSource the vertex shader source code.
         * @param fragmentSource the fragment shader source code.
         * @returns A WebGL shader program.
         * @throws An error if the shader cannot be compiled or linked.
         */
        Shader.prototype.createShaderProgram = function (vertexSource, fragmentSource) {
            var shaderProgram = TSE.gl.createProgram();
            var vertexShader = this.loadShader(vertexSource, TSE.gl.VERTEX_SHADER);
            var fragmentShader = this.loadShader(fragmentSource, TSE.gl.FRAGMENT_SHADER);
            TSE.gl.attachShader(shaderProgram, vertexShader);
            TSE.gl.attachShader(shaderProgram, fragmentShader);
            TSE.gl.linkProgram(shaderProgram);
            var error = TSE.gl.getProgramInfoLog(shaderProgram);
            if (error !== "") {
                throw new Error("Error linking shader program: ".concat(error));
            }
            return shaderProgram;
        };
        /**
         * Loads a shader.
         * @param shaderSource the shader source code.
         * @param shaderType the type of shader to load.
         * @returns A WebGL shader.
         * @throws An error if the shader cannot be compiled.
         */
        Shader.prototype.loadShader = function (shaderSource, shaderType) {
            var shader = TSE.gl.createShader(shaderType);
            TSE.gl.shaderSource(shader, shaderSource);
            TSE.gl.compileShader(shader);
            var error = TSE.gl.getShaderInfoLog(shader);
            if (error !== "") {
                throw new Error("Error compiling shader: ".concat(error));
            }
            return shader;
        };
        return Shader;
    }());
    TSE.Shader = Shader;
})(TSE || (TSE = {}));
