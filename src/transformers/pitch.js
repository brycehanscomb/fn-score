import TONES from '../constants/tones';

import {
    isSameNote,
    isSameOctave
} from '../assertions/pitch';

/**
 * @param {number} noteDelta
 * @param {Tone} tone
 * @return {Tone}
 */
export function transpose(noteDelta, tone) {
    return TONES[
        TONES.indexOf(tone)
        + noteDelta
    ];
}

/**
 * @param {Tone} tone
 * @param {string} newNote - eg: 'G#'
 * @returns {Tone}
 */
export function transposeTo(newNote, tone) {
    return TONES.find(potentialTone => {
        return (
            isSameOctave(potentialTone, tone) &&
            potentialTone.note === newNote
        );
    });
}

/**
 * @param {Tone} tone
 * @return {Tone}
 */
export function raise(tone) {
    return transpose(1, tone);
}

/**
 * @param {Tone} tone
 * @return {Tone}
 */
export function lower(tone) {
    return transpose(-1, tone);
}

/**
 * @param {number} octaveDelta
 * @param {Tone} tone
 * @return {Tone}
 */
export function changeOctave(octaveDelta, tone) {
    return raise(tone, 12 * octaveDelta);
}

/**
 * @param {Tone} tone
 * @param {number} newOctave
 */
export function setOctaveTo(newOctave, tone) {
    return TONES.find(potentialTone => {
        return (
            isSameNote(potentialTone, tone) &&
            potentialTone.octave === newOctave
        );
    });
}