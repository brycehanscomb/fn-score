import AbstractExtendable from './abstract-extendable';

/**
 * @typedef {Object} Tone
 * @property {Object.<string, string>} note
 * @property {number} octave
 * @property {boolean} isAccidental
 */
class Tone extends AbstractExtendable {
    toString() {
        return `${this.note}${this.octave}`;
    }
}

export default Tone;