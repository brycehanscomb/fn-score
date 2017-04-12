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