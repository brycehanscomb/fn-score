import AbstractExtendable from './abstract-extendable';
import { getDurationDivision, xmlCompatibleProperty } from '../utils';

/**
 * @typedef {Object} MusicJSONNote
 * @property {string} noteName
 * @property {number} noteAlteration 1 for sharp or -1 for flat
 * @property {number} octave
 * @property {number} duration - represents a note’s duration in terms of divisions per quarter note
 */
export default class MusicJSONNote extends AbstractExtendable {

    /**
     * @this {MusicJSONNote}
     */
    toMusicJSON() {
        return {
            pitch: {
                step: xmlCompatibleProperty(this.noteName),
                alter: xmlCompatibleProperty(this.noteAlteration),
                octave: xmlCompatibleProperty(this.octave),
            },
            duration: xmlCompatibleProperty(this.duration),
            voice: xmlCompatibleProperty(1),
        };
    }

    /**
     * @param {Sound} sound
     */
    static createFromSound(sound) {
        return new MusicJSONNote({
            noteName: sound.tone.note.replace('_SHARP', '').replace('#', ''),
            noteAlteration: sound.tone.isAccidental ? 1 : 0, // assumes all are sharps, no flats
            octave: sound.tone.octave,
            duration: getDurationDivision(24, sound.duration.length)
        });
    }
}