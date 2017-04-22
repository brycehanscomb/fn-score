/* eslint-disable */

import React, {Component} from 'react';
import './App.css';
import Score from "./components/score";

import Markdown2HTML from 'react-markdown-to-html';

import chapter1 from './writings/chapter-1.md';
import chapter2 from './writings/chapter-2.md';
import chapter3 from './writings/chapter-3.md';
import chapter4_1 from './writings/chapter-4_1.md';
import chapter4_2 from './writings/chapter-4_2.md';
import chapter4_3 from './writings/chapter-4_3.md';

import median from 'median';
import tonal from 'tonal';

import PlayablePianoRoll from './components/playable-piano-roll';

import Sound from './models/sound';

import partial from 'lodash/partial';
import flatten from 'lodash/flatten';
import shuffle from 'lodash/shuffle';
import toFraction from 'num2fraction';

import * as generalAssertions from './assertions/general';
import * as pitchAssertions from './assertions/pitch';
import * as durationAssertions from './assertions/duration';

import * as pitchTransformers from './transformers/pitch';
import * as soundTransformers from './transformers/sound';
import * as timeTransformers from './transformers/time';

import {
    xmlCompatibleProperty,
    buildScoreJson
} from './utils/index';

import * as soundFactories from './factories/sound';
import * as durationFactories from './factories/duration';
import * as toneFactories from './factories/tone';

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
    1/8,
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

const CARRY_ON_NOTE_PITCHES = [
    'A4',
    'G4',
    'A4',
    'C5',
    'A4',
    'G4',
    'A4',
    'D5',
    'E5',
    'G5',
    'E5',
    'D5',
    'C5',
    'D5',
    'G4',
    'D5',
    'F#4'
];

function getMedianPitch(pitchesList) {
    const pitchesInOrder = tonal.sort(pitchesList);
    const midiNumbersFromPitches = pitchesInOrder.map(tonal.midi.toMidi);
    const medianMidiNumber = median(midiNumbersFromPitches);
    const medianPitch = tonal.midi.note(medianMidiNumber, true);
    return medianPitch;
}

const CARRY_ON_TONES = CARRY_ON_NOTE_PITCHES.map(toneFactories.createFromNoteName);
const CARRY_ON_DURATIONS = CARRY_ON_NOTE_LENGTHS.map(durationFactories.createDurationOfLength);
const CARRY_ON_SOUNDS = CARRY_ON_DURATIONS.map(soundFactories.buildFromTonesList(CARRY_ON_TONES));

// console.log(CARRY_ON_NOTE_DATA);

const CarryOnComparison = (Props) => {
    const props = {
        newBpm: 127,
        newBars: 3,
        ...Props
    };

    return (
        <div className="roll-comparison-container">
            {props.name && <h4 className="name">{props.name}</h4>}
            <div className="roll-comparison">
                <PlayablePianoRoll soundsList={CARRY_ON_SOUNDS} bpm={127} bars={3} />
                <div className="middle-section">{props.children}</div>
                <PlayablePianoRoll soundsList={props.newSoundsList} bpm={props.newBpm} bars={props.newBars} />
            </div>
        </div>

    );
};

function filterToRestsIf(soundsList, predicate) {
    return soundsList.map(
        (sound, index, array) => predicate(sound, index, array)
            ? sound
            : soundFactories.createFromDurationAsRest(sound.duration)
    );
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>FnScore - Music is Data</h1>
                <Markdown2HTML src={chapter1} />
                <Markdown2HTML src={chapter2} />
                <Markdown2HTML src={chapter3} />
                <Markdown2HTML src={chapter4_1} />
                <PlayablePianoRoll soundsList={CARRY_ON_SOUNDS} bpm={127} bars={3} />
                <Markdown2HTML src={chapter4_2} />
                <CarryOnComparison newSoundsList={CARRY_ON_SOUNDS.slice().reverse()} name="A Simple Reversal">
                    <code>notes.reverse()</code>
                </CarryOnComparison>
                <CarryOnComparison name="Only Notes Higher Than A4" newSoundsList={
                    filterToRestsIf(CARRY_ON_SOUNDS, a => pitchAssertions.isHigher(
                        toneFactories.createFromNoteName('A4'),
                        a.tone
                    ))
                }><pre><code>{`notes.filter(\n  isHigherThan(A4)\n)`}</code></pre>
                </CarryOnComparison>
                <CarryOnComparison name="Only Notes Longer Than Quavers" newSoundsList={
                    filterToRestsIf(CARRY_ON_SOUNDS, a =>  durationAssertions.isLonger(
                        durationFactories.createDurationOfLength(1/8),
                        a.duration
                    ))
                }><pre><code>{`notes.filter(\n  isLongerThan(`}<note>e</note>{`)\n)`}</code></pre>
                </CarryOnComparison>
                <CarryOnComparison name="Only Notes That Are Quavers" newSoundsList={
                    filterToRestsIf(CARRY_ON_SOUNDS, a =>  durationAssertions.isSame(
                        durationFactories.createDurationOfLength(1/8),
                        a.duration
                    ))
                }><pre><code>{`notes.filter(\n  isLengthEqualTo(`}<note>e</note>{`)\n)`}</code></pre>
                </CarryOnComparison>
                <Markdown2HTML src={chapter4_3} />
                <CarryOnComparison name="Transpose All Notes Up 3 Semitones" newSoundsList={
                    CARRY_ON_SOUNDS.map(s => Sound.composeFromToneAndDuration(
                        pitchTransformers.transpose(3, s.tone),
                        s.duration
                    ))
                }><pre><code>{`notes.map(\n  transposeUp(3)\n)`}</code></pre>
                </CarryOnComparison>
                <CarryOnComparison name="Split Each Note And Raise Every Other Note By An Octave" newSoundsList={
                    flatten(CARRY_ON_SOUNDS.map(s => [
                        Sound.composeFromToneAndDuration(
                            s.tone,
                            durationFactories.createDurationOfLength(s.duration.length / 2)
                        ),
                        Sound.composeFromToneAndDuration(
                            pitchTransformers.transpose(12, s.tone),
                            durationFactories.createDurationOfLength(s.duration.length / 2)
                        )
                    ]))
                }><pre><code>{`notes.map(\n  splitAndRaiseByOctave\n)`}</code></pre>
                </CarryOnComparison>
                <CarryOnComparison name="Transpose Each Note 2 Semitones Closer To The Median Pitch" newSoundsList={
                    CARRY_ON_SOUNDS.map((s, index, arr) => {
                        const distanceFromMedianPitch = tonal.semitones(
                            getMedianPitch(arr.map(x => x.tone.toString())),
                            s.tone.toString()
                        );

                        console.log(distanceFromMedianPitch);

                        if (distanceFromMedianPitch === 0) {
                            return s;
                        }

                        if (distanceFromMedianPitch < -2) {
                            return Sound.composeFromToneAndDuration(
                                pitchTransformers.transpose(2, s.tone),
                                s.duration
                            );
                        } else if (distanceFromMedianPitch > 2) {
                            return Sound.composeFromToneAndDuration(
                                pitchTransformers.transpose(-2, s.tone),
                                s.duration
                            );
                        }

                        return s;
                    })
                }><pre><code>{`notes.map(\n  transpose(\n    closerToMedian(2)\n  )\n)`}</code></pre>
                </CarryOnComparison>
            </div>
        );
    }
}

export default App;