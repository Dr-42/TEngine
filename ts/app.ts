// Author: Dr. Spandan Roy
//
// This file is the entry point of the game.

var game: TSE.Engine;

window.onload = function () {
    game = new TSE.Engine();
    game.start();
}

window.onresize = function () {
    game.resize();
}