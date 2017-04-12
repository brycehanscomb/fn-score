import TONES from '../constants/tones';

/**
 * @param {Tone} tone1
 * @param {Tone} tone2
 * @return {Tone}
 */
export function isSameNote(tone1, tone2) {
    return tone1.note === tone2.note;
}

/**
 * @param {Tone} tone1
 * @param {Tone} tone2
 * @return {Tone}
 */
export function isSameOctave(tone1, tone2) {
    return tone1.octave === tone2.octave;
}

/**
 * @param {Tone} tone1
 * @param {Tone} tone2
 * @return {boolean}
 */
export function isSame(tone1, tone2) {
    return tone1 === tone2;
}

/**
 * @param {Tone} tone
 * @return {boolean}
 */
export function isAccidental(tone) {
    return tone.isAccidental;
}

/**
 * @param {Tone} tone
 * @return {boolean}
 */
export function isNatural(tone) {
    return !isAccidental(tone);
}

/**
 * @param {string} note - eg: 'C#'
 * @param {Tone} tone
 * @return {boolean}
 */
export function isNote(note, tone) {
    return tone.note === note;
}

/**
 * @param {string} note - eg: 'C#'
 * @param {Tone} tone
 * @return {boolean}
 */
export function isNotNote(note, tone) {
    return tone.note !== note;
}


/**
 * @param {number} octave
 * @param {Tone} tone
 * @return {boolean}
 */
export function isOctave(octave, tone) {
    return tone.octave === octave;
}

/**
 * @param {number} octave
 * @param {Tone} tone
 * @return {boolean}
 */
export function isNotOctave(octave, tone) {
    return tone.octave !== octave;
}

/**
 * Is the second tone higher than the first one?
 *
 * @param {Tone} tone1
 * @param {Tone} tone2
 * @return {boolean}
 */
export function isHigher(tone1, tone2) {
    return TONES.indexOf(tone1) > TONES.indexOf(tone2);
}

/**
 * Is the second tone lower than the first one?
 *
 * @param {Tone} tone1
 * @param {Tone} tone2
 * @return {boolean}
 */
export function isLower(tone1, tone2) {
    return TONES.indexOf(tone1) < TONES.indexOf(tone2);
}

/**
 * Is the second tone at least `n` semitones higher than the first one?
 *
 * @param {number} semitones
 * @param {Tone} tone1
 * @param {Tone} tone2
 * @return {boolean}
 */
export function isDistanceHigher(semitones, tone1, tone2) {
    return (TONES.indexOf(tone2) - TONES.indexOf(tone1)) > semitones;
}


/**
 * Is the second tone at least `n` semitones lower than the first one?
 *
 * @param {number} semitones
 * @param {Tone} tone1
 * @param {Tone} tone2
 * @return {boolean}
 */
export function isDistanceLower(semitones, tone1, tone2) {
    return (TONES.indexOf(tone1) - TONES.indexOf(tone2)) > semitones;
}
