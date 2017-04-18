/* eslint-disable */

import React, {Component} from 'react';
import './App.css';

var Markdown2HTML = require('react-markdown-to-html');

import README from '../README.md';

import PianoRoll from './components/piano-roll';

import partial from 'lodash/partial';
import flatten from 'lodash/flatten';
import shuffle from 'lodash/shuffle';
import zip from 'lodash/zip';
import toFraction from 'num2fraction';

import * as generalAssertions from './assertions/general';
import * as pitchAssertions from './assertions/pitch';

import * as pitchTransformers from './transformers/pitch';
import * as soundTransformers from './transformers/sound';
import * as timeTransformers from './transformers/time';

import {
    xmlCompatibleProperty,
    buildScoreJson
} from './utils/index';

import * as soundFactories from './factories/sound';
import * as durationFactories from './factories/duration';

import DURATIONS from './constants/durations';
//
// import TONES from './constants/tones';
//
// import Score from './components/score';
//
// global.TONES = TONES;

// global.EXAMPLE_SOUNDS = global.TONES
//     .map(t => durationFactories.createDurationOfRandomLength())
//     .map(soundFactories.buildFromTonesList(TONES.slice().reverse()))
// ;
//
// const sampleScore = buildScoreJson(
//     global.EXAMPLE_SOUNDS
// );

const CARRY_ON_NOTE_LENGTHS = [
    1/8,
    1/8,
    1/8,
    (1/4) * 1.5,
    1/8,
    1/8,
    /////////////////
    1/16,
    1/16, // rest
    (1/4) * 1.5,
    1/8,
    1/8,
    1/16,
    1/16,
    1/8,
    /////////////////
    1/8,
    (1/4) * 1.5,
    1/8,
    (1/4) * 1.5
];

function toDurationString(input) {
    switch(input) {
        case 1/16:
            return '16n';
        case 1/8:
            return '8n';
        case 1/4:
            return '4n';
        case (1/4)*1.5:
            return '4nd';
        case 1/2:
            return '2n';
        case 1:
            return '1n';
        default:
            throw 'unimplemented mapping';
    }
}

// keep only the digits after the decimal point
function removeIntFromFloat(input) {
    return input % 1;
}

function proportionOfWholeNoteToNumberOfQuarterNotes(input) {
    return input / (1/4);
}

/**
 * @param {number} input
 * @returns {string}
 */
function convertToTransportTime(input) {
    const bar = parseInt(input, 10);
    const quarters = proportionOfWholeNoteToNumberOfQuarterNotes(
        removeIntFromFloat(input)
    );
    const sixteenths = 0;

    return `${bar}:${quarters}:${sixteenths}`;
}

function sum(a, b) {
    return a + b;
}

function addAllBefore(numbersList, beforeIndex) {
    return numbersList.slice(0, beforeIndex).reduce(sum, 0);
}

const CARRY_ON_NOTE_START_TIMES = CARRY_ON_NOTE_LENGTHS.map((noteLength, index, arr) => {
    return addAllBefore(arr, index);
});

const CARRY_ON_NOTE_PITCHES = [
    'A2',
    'G2',
    'A2',
    'C3',
    'A2',
    'G2',
    'A2',
    null,
    'D3',
    'E3',
    'G3',
    'E3',
    'D3',
    'C3',
    'D3',
    'G2',
    'D3',
    'F#2'
];

const CARRY_ON_NOTE_DATA = zip(
    CARRY_ON_NOTE_START_TIMES.map(convertToTransportTime),
    CARRY_ON_NOTE_PITCHES,
    CARRY_ON_NOTE_LENGTHS.map(toDurationString)
).filter(([transportTime, pitch, duration]) => pitch !== null);

console.log(CARRY_ON_NOTE_DATA);

class App extends Component {
    render() {
        return (
            <div className="App">
                <Markdown2HTML src={README} />
                <PianoRoll
                    noteData={CARRY_ON_NOTE_DATA}
                    bpm={127}
                    bars={3}
                />
            </div>
        );
    }
}

export default App;