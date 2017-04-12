/* eslint-disable */

import React, {Component} from 'react';
import './App.css';


import partial from 'lodash/partial';
import flatten from 'lodash/flatten';
import shuffle from 'lodash/shuffle';

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

import TONES from './constants/tones';

import Score from './components/score';

global.TONES = TONES;

global.EXAMPLE_SOUNDS = shuffle(TONES).slice(0, 12)
    .map(durationFactories.createDurationOfRandomLength)
    .map(soundFactories.createWithRandomTone)
;

const sampleScore = buildScoreJson(
    global.EXAMPLE_SOUNDS
        .filter(s => {
            return (
                pitchAssertions.isOctave(4, s.tone) ||
                pitchAssertions.isOctave(5, s.tone)
            );
        })
);

// console.log(
//     EXAMPLE_DURATIONS.filter(sound => pitchAssertions.isNatural(sound.tone))
//         .map(a => a.toString())
// )

// console.log(
//     TONES
//         .map(soundTransformers.mapTonesToDurations(global.EXAMPLE_DURATIONS))
//         .map(a => a.toString())
// );

// const NOTES = {
//     A: 'A',
//     A_SHARP: 'A#',
//     B: 'B',
//     C: 'C',
//     C_SHARP: 'C#',
//     D: 'D',
//     D_SHARP: 'D#',
//     E: 'E',
//     F: 'F',
//     F_SHARP: 'F#',
//     G: 'G',
//     G_SHARP: 'G#',
//     REST: '·'
// };
//
// const INTERVALS = {
//     WHOLE: 'WHOLE',
//     HALF: 'HALF',
//     QUARTER: 'QUARTER',
//     EIGHTH: 'EIGHTH',
//     SIXTEENTH: 'SIXTEENTH',
//     THIRTY_SECOND: 'THIRTY_SECOND'
// };
//
// let sampleBeat = [];
// let sampleMelody = [];
//
// // sampleBeat = [
// //     INTERVALS.QUARTER,
// //     INTERVALS.EIGHTH,
// //     INTERVALS.EIGHTH,
// //     INTERVALS.EIGHTH,
// //     INTERVALS.EIGHTH,
// //     INTERVALS.EIGHTH,
// //     INTERVALS.HALF,
// //     INTERVALS.HALF
// // ];
// //
// // sampleMelody = [
// //     NOTES.E,
// //     NOTES.REST,
// //     NOTES.E,
// //     NOTES.G,
// //     NOTES.E,
// //     NOTES.D,
// //     NOTES.C,
// //     NOTES.B
// // ];
//
// sampleBeat = [
//     INTERVALS.EIGHTH,
//     INTERVALS.EIGHTH,
//     INTERVALS.EIGHTH,
//     INTERVALS.EIGHTH,
//     INTERVALS.EIGHTH,
//     INTERVALS.EIGHTH,
//     INTERVALS.EIGHTH,
//     INTERVALS.EIGHTH,
//
//     INTERVALS.EIGHTH,
//     INTERVALS.EIGHTH,
//     INTERVALS.EIGHTH,
//     INTERVALS.EIGHTH,
//     INTERVALS.QUARTER,
//     INTERVALS.QUARTER,
// ];
//
// sampleMelody = [
//     NOTES.D,
//     NOTES.D,
//     NOTES.C,
//     NOTES.D,
//     NOTES.REST,
//     NOTES.A,
//     NOTES.REST,
//     NOTES.G_SHARP,
//     NOTES.REST,
//     NOTES.G,
//     NOTES.REST,
//     NOTES.D,
//     NOTES.F,
//     NOTES.D
// ];
//
// function XNote({note, length}) {
//     return <span className="note" data-note={note} data-length={length}>{note}</span>
// }
//
// function halve(interval) {
//     switch(interval) {
//         case INTERVALS.WHOLE:
//             return INTERVALS.HALF;
//         case INTERVALS.HALF:
//             return INTERVALS.QUARTER;
//         case INTERVALS.QUARTER:
//             return INTERVALS.EIGHTH;
//         case INTERVALS.EIGHTH:
//             return INTERVALS.SIXTEENTH;
//         case INTERVALS.SIXTEENTH:
//             return INTERVALS.THIRTY_SECOND;
//     }
// }
//
// function double(interval) {
//     switch(interval) {
//         case INTERVALS.HALF:
//             return INTERVALS.WHOLE;
//         case INTERVALS.QUARTER:
//             return INTERVALS.HALF;
//         case INTERVALS.EIGHTH:
//             return INTERVALS.QUARTER;
//         case INTERVALS.SIXTEENTH:
//             return INTERVALS.EIGHTH;
//         case INTERVALS.THIRTY_SECOND:
//             return INTERVALS.SIXTEENTH;
//     }
// }
//
// function raise(pitch) {
//     switch(pitch) {
//         case NOTES.A:
//             return NOTES.A_SHARP;
//         case NOTES.A_SHARP:
//             return NOTES.B;
//         case NOTES.B:
//             return NOTES.C;
//         case NOTES.C:
//             return NOTES.C_SHARP;
//         case NOTES.C_SHARP:
//             return NOTES.D;
//         case NOTES.D:
//             return NOTES.D_SHARP;
//         case NOTES.D_SHARP:
//             return NOTES.E;
//         case NOTES.E:
//             return NOTES.F;
//         case NOTES.F:
//             return NOTES.F_SHARP;
//         case NOTES.F_SHARP:
//             return NOTES.G;
//         case NOTES.G:
//             return NOTES.G_SHARP;
//         case NOTES.G_SHARP:
//             return NOTES.A;
//         case NOTES.REST:
//             return NOTES.REST;
//     }
// }
//
// function applyToBeat(beat) {
//     return function(note, index) {
//         return {
//             note,
//             length: beat[index]
//         };
//     }
// }
//
class App extends Component {
    render() {
        return (
            <div className="App">
                <Score
                    musicJSON={sampleScore}
                />
            </div>
        );
    }
}

export default App;

// function getTimeFromInterval(interval) {
//     // in seconds
//     const wholeNoteDuration = 2.75;
//
//     switch(interval) {
//         case INTERVALS.WHOLE:
//             return wholeNoteDuration;
//         case INTERVALS.HALF:
//             return wholeNoteDuration / 2;
//         case INTERVALS.QUARTER:
//             return wholeNoteDuration / 4;
//         case INTERVALS.EIGHTH:
//             return wholeNoteDuration / 8;
//         case INTERVALS.SIXTEENTH:
//             return wholeNoteDuration / 16;
//         case INTERVALS.THIRTY_SECOND:
//             return wholeNoteDuration / 32;
//     }
// }
//
// function buildSynthLine(notes) {
//     const synthParams = notes.map(({note, length}, index) => {
//         return [
//             note === NOTES.REST ? null : note,
//             (index === notes.length - 1) && (note === NOTES.B) ? 3 : 4, // allows the last B to be lower in S.N.A
//             getTimeFromInterval(length)
//         ];
//     });
//
//     return synthParams;
// }
//
// function getWaitTime(synthLine, index) {
//     return synthLine.reduce(
//         (acc, cur, __index) => {
//             if (__index >= index) {
//                 return acc;
//             }
//
//             return acc + cur[2]
//         },
//         0
//     );
// }
//
// function playSynthLine(synthLine) {
//     synthLine.forEach((item, index) => {
//         setTimeout(
//             () => {
//                 if (item[0] !== null) {
//                     Synth.play(2, ...item);
//                 }
//             },
//             getWaitTime(synthLine, index) * 1000
//         );
//     });
// }
//
// function Player({notesList}) {
//     return <div>
//         {notesList.map(({note, length}, index) =>
//             <XNote key={index} note={note} length={length} />
//         )}
//         <br/>
//         <button onClick={() => {
//             playSynthLine(
//                 buildSynthLine(
//                     notesList
//                 )
//             )
//         }}>Play</button>
//     </div>;
// }