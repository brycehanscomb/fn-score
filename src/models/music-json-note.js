import AbstractExtendable from './abstract-extendable';
import { getDurationDivision, xmlCompatibleProperty } from '../utils';

/**
 * @typedef {Object} MusicJSONNote
 * @property {string} noteName
 * @property {number} noteAlteration 1 for sharp or -1 for flat
 * @property {number} octave
 * @property {number} duration - represents a note’s duration in terms of divisions per quarter note
 * @property {boolean} isRest
 */
export default class MusicJSONNote extends AbstractExtendable {

    /**
     * @this {MusicJSONNote}
     */
    toMusicJSON() {
        const result = {
            pitch: {
                step: xmlCompatibleProperty(this.noteName),
                alter: xmlCompatibleProperty(this.noteAlteration),
                octave: xmlCompatibleProperty(this.octave),
            },
            duration: xmlCompatibleProperty(this.duration),
            voice: xmlCompatibleProperty(1)
        };

        if (this.isRest) {
            result.rest = xmlCompatibleProperty(true);
        }

        return result;
    }

    /**
     * @param {Sound} sound
     */
    static createFromSound(sound) {
        if (!sound.tone) {
            return new MusicJSONNote({
                noteName: 'C',
                noteAlteration: 0,
                octave: 5,
                duration: getDurationDivision(24, sound.duration.length),
                isRest: true
            })
            // build a rest note
        }

        return new MusicJSONNote({
            noteName: sound.tone.note.replace('_SHARP', '').replace('#', ''),
            noteAlteration: sound.tone.isAccidental ? 1 : 0, // assumes all are sharps, no flats
            octave: sound.tone.octave,
            duration: getDurationDivision(24, sound.duration.length),
            isRest: false
        });
    }
}