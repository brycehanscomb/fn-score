import Sound from '../models/sound';

import TONES from '../constants/tones';

import {
    createDurationOfRandomLength
} from './duration';

import shuffle from 'lodash/shuffle';

export function createFromToneAndDuration(tone, duration) {
    return Sound.composeFromToneAndDuration(tone, duration);
}

export function createFromDurationAndTone(duration, tone) {
    return Sound.composeFromToneAndDuration(tone, duration);
}

export function createWithRandomTone(duration) {
    return Sound.composeFromToneAndDuration(
        shuffle(TONES)[0], // get a random tone
        duration
    );
}

export function createWithRandomDuration(tone) {
    return Sound.composeFromToneAndDuration(
        tone,
        createDurationOfRandomLength()
    );
}

export function buildFromTonesList(tonesList) {
    return function applyDurationToTonesList(duration, index) {
        return Sound.composeFromToneAndDuration(
            tonesList[index],
            duration
        );
    };
}

export function buildFromDurationsList(durationsList) {
    return function applyToneToDurationsList(tone, index) {
        return Sound.composeFromToneAndDuration(
            tone,
            durationsList[index]
        );
    };
}