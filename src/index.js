"use strict";
// Author: Dr. Spandan Roy
//
// This file is the entry point of the game.
window.onload = function () {
    var game = new TSE.Engine();
    game.start();
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
            var canvas = TSE.GLUtils.getGLContext();
            TSE.gl.clearColor(0.3, 0.0, 0.3, 1.0);
            this.loop();
        };
        /**
         * The game loop.
         */
        Engine.prototype.loop = function () {
            TSE.gl.clear(TSE.gl.COLOR_BUFFER_BIT);
            requestAnimationFrame(this.loop.bind(this));
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
