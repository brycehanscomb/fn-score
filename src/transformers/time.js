import Duration from '../models/duration';
import Sound from '../models/sound';

import DURATIONS from '../constants/durations';

import { isSame as isSamePitch } from '../assertions/pitch';

function getDurationFromLength(length) {
    return Object.values(DURATIONS).find(
        duration => duration.length === length
    );
}

/**
 * @param {(Sound|Duration)} soundOrDuration
 * @return {Array.<(Sound|Duration)>}
 */
export function split(soundOrDuration) {
    function twoOf(a) {
        return [a, a];
    }

    if (soundOrDuration instanceof Duration) {
        return twoOf(
            getDurationFromLength(soundOrDuration.length / 2)
        );
    } else if (soundOrDuration instanceof Sound) {
        return twoOf(
            Sound.composeFromToneAndDuration(
                soundOrDuration.tone,
                getDurationFromLength(soundOrDuration.length * 2)
            )
        );
    } else {
        throw new TypeError('Wrong type');
    }
}

/**
 * @param {(Sound|Duration)} A
 * @param {(Sound|Duration)} B
 * @returns {(Sound|Duration)}
 */
export function join(A, B) {
    if (A.cosntructor !== B.constructor) {
        throw new TypeError('Arguments must be of the same type');
    }

    if (A instanceof Duration) {
        return getDurationFromLength(A.length + B.length)
    } else if (A instanceof Sound) {
        if (!isSamePitch(A.tone, B.tone)) {
            throw new Error('A and B must have the same tone to be joined');
        }

        return Sound.composeFromToneAndDuration(
            A.tone,
            getDurationFromLength(A.duration.length + B.duration.length)
        );
    } else {
        throw new TypeError('Wrong type');
    }
}

/**
 * @param {(Sound|Duration)} A
 * @param {(Sound|Duration)} B
 * @returns {(Sound|Duration)}
 */
export function joinFromTuple([A, B]) {
    return join(A, B);
}