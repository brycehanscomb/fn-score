/* eslint-disable */

import React, {Component} from 'react';
import './App.css';
var Markdown2HTML = require('react-markdown-to-html');

import README from '../README.md';


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

class App extends Component {
    render() {
        return (
            <div className="App">
                <Markdown2HTML src={README} />
            </div>
        );
    }
}

export default App;