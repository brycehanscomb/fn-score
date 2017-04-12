import Sound from '../models/sound';

import TONES from '../constants/tones';

import shuffle from 'lodash/shuffle';

export function createWithRandomTone(duration) {
    return Sound.composeFromToneAndDuration(
        shuffle(TONES)[0], // get a random tone
        duration
    );
}