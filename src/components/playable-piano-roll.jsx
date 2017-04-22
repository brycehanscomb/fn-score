import React from 'react';
import PropTypes from 'prop-types';
import zip from 'lodash/zip';
import last from 'lodash/last';
import PianoRoll from './piano-roll';
import Tone, { FMSynth } from 'tone';

function filterRests([, pitch, ]) {
    return pitch !== null;
}

global.t = Tone;


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
            return Tone.Time(input * 2).toNotation();
            // throw new Error('unimplemented mapping ' + input);
    }
}

export default class PlayablePianoRoll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playbackState: 'stopped'
        };

        const NOTE_START_TIMES = this.props.soundsList.map(sound => sound.duration).map(duration => duration.length).map((noteLength, index, arr) => {
            return addAllBefore(arr, index);
        });
        const NOTE_PITCHES = this.props.soundsList.map(sound => sound.tone).map(tone => (tone && tone.toString()) || null);
        const NOTE_LENGTHS = this.props.soundsList.map(sound => sound.duration).map(duration => duration.length);

        this.noteData = zip(
            NOTE_START_TIMES.map(convertToTransportTime),
            NOTE_PITCHES,
            NOTE_LENGTHS.map(toDurationString)
        );

        this.handlePlayButtonPress = this.handlePlayButtonPress.bind(this);
        this.handleStopButtonPress = this.handleStopButtonPress.bind(this);
    }

    componentDidMount() {
        // this.synth = new FMSynth().toMaster();
    }

    handlePlayButtonPress() {
        this.synth = new FMSynth().toMaster();

        /**
         * Tone.js can't handle notes that are dotted in string format (eg: '4nd'
         * or '1wd') so we need to do that *1.5 duration on the base note for it.
         *
         * @param input
         * @return {Tone.Timebase}
         */
        function normalizeDottedNotes(input) {
            if (input.endsWith('d')) {
                return Tone.Time(input.replace('d', '')).mult(1.5);
            } else {
                return Tone.Time(input);
            }
        }

        const synthNotes = this.noteData.filter(filterRests).map(([transportStartTime, pitch, duration]) => {
            return {
                time: transportStartTime,
                note: pitch,
                dur: normalizeDottedNotes(duration)
            };
        });

        const lastNote = last(synthNotes);

        function isLastNote(synthNote) {
            return lastNote === synthNote;
        }

        this.setState({
            playbackState: 'playing'
        }, () => {
            this.part = new Tone.Part((time, synthNote) => {
                //the events will be given to the callback with the time they occur
                this.synth.triggerAttackRelease(synthNote.note, synthNote.dur, time)

                if (isLastNote(synthNote)) {
                    this.removeSynthFromMasterChain();
                }
            }, synthNotes);

            this.part.mute = false;
            this.part.start(0);
            Tone.Transport.seconds = 0;
            Tone.Transport.bpm.value = this.props.bpm;
            Tone.Transport.start();

            Tone.Transport.schedule(this.handleStopButtonPress, `${this.props.bars}:0:0`);
        });
    }

    handleStopButtonPress() {
        Tone.Transport.stop();
        this.removeSynthFromMasterChain();

        this.setState({
            playbackState: 'paused'
        });
    }

    removeSynthFromMasterChain() {
        this.part.mute = true;
    }

    render() {
        const notesExceptRests = this.noteData.filter(filterRests);

        return (
            <article className="playable-piano-roll" style={{width: 350, display: 'inline-block'}}>
                <PianoRoll bpm={this.props.bpm} noteData={notesExceptRests} play={this.state.playbackState === 'playing'} bars={this.props.bars} />
                <div style={{textAlign: 'center'}}>
                    {this.state.playbackState !== 'playing' ?
                        <button onClick={this.handlePlayButtonPress}>
                            Play Sequence
                        </button>
                        :
                        <button onClick={this.handleStopButtonPress}>
                            Stop Sequence
                        </button>
                    }
                </div>
            </article>
        );
    }
}

PlayablePianoRoll.propTypes = {
    bpm: PropTypes.number.isRequired,
    soundsList: PropTypes.array.isRequired,
    // noteData: PropTypes.array.isRequired,
    bars: PropTypes.number.isRequired
};