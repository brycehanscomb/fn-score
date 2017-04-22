import AbstractExtendable from './abstract-extendable';

/**
 * @typedef {Object} Sound
 * @property {Tone} tone
 * @property {Duration} duration
 */
class Sound extends AbstractExtendable {
    toString() {
        return `${this.duration.toString()} note ${(this.tone || 'rest').toString()}`;
    }

    /**
     * @param {Tone} tone
     * @param {Duration} duration
     */
    static composeFromToneAndDuration(tone, duration) {
        return new Sound({tone, duration});
    }
}

export default Sound;