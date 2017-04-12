import Tone from '../models/tone';

const BASIC_NOTES = {
    C: 'C',
    C_SHARP: 'C#',
    D: 'D',
    D_SHARP: 'D#',
    E: 'E',
    F: 'F',
    F_SHARP: 'F#',
    G: 'G',
    G_SHARP: 'G#',
    A: 'A',
    A_SHARP: 'A#',
    B: 'B'
};

const basicNoteKeys = Object.keys(BASIC_NOTES);

const lowestOctave = 3;
const highestOctave = 6;

/**
 * @type {Array.<Tone>}
 */
const TONES = [];

for (let ii = lowestOctave; ii < highestOctave; ii++) {
    basicNoteKeys.forEach(noteName => {
        TONES.push(
            new Tone({
                note: BASIC_NOTES[noteName],
                octave: ii,
                isAccidental: noteName.includes('_SHARP')
            })
        )
    });
}

export default TONES;