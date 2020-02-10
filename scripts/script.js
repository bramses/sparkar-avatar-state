/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================

// How to load in modules
const Scene = require('Scene');

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');

// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

// To access scene objects
// const directionalLight = Scene.root.find('directionalLight0');

// To access class properties
// const directionalLightIntensity = directionalLight.intensity;

// To log messages to the console
// Diagnostics.log('Console message logged from the script.');

var FaceTracking = require("FaceTracking");
var IrisTracking = require("IrisTracking");
var Reactive = require("Reactive");
var Materials = require("Materials");


var leftIris = Scene.root.find("left iris");
var rightIris = Scene.root.find("right iris");
    
var leftEyeballInfo = IrisTracking.leftEyeball(FaceTracking.face(0));
var rightEyeballInfo = IrisTracking.rightEyeball(FaceTracking.face(0));
    
leftIris.transform.position = leftEyeballInfo.iris;
rightIris.transform.position = rightEyeballInfo.iris;
    
leftIris.transform.rotation = leftEyeballInfo.rotation;
rightIris.transform.rotation = rightEyeballInfo.rotation;

const leftEye = FaceTracking.face(0).leftEye;
const rightEye = FaceTracking.face(0).rightEye;

leftIris.hidden = leftEye.openness.lt(Reactive.val(0.5));
rightIris.hidden = rightEye.openness.lt(Reactive.val(0.5));

const arrow = Materials.get("material0");

leftEye.openness.monitor().subscribe(function (evt) {

})

const leftOpen = leftEye.openness;
const rightOpen = rightEye.openness;

Reactive.monitorMany([leftOpen, rightOpen]).subscribe(function(event) {
    const isLeftOpen = event.newValues["0"] > 0.5;
    const isRightOpen = event.newValues["1"] > 0.5;

    if (isLeftOpen && isRightOpen) arrow.opacity = Reactive.val(1.0);
    else arrow.opacity = Reactive.val(0.0);
}) 
