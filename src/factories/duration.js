import Duration from '../models/duration';
import DURATIONS from '../constants/durations';

import shuffle from 'lodash/shuffle';

export function createDurationOfRandomLength() {
    return shuffle(Object.values(DURATIONS))[0];
}

export function createDurationOfLength(length = 1/4) {
    return Object.values(DURATIONS).find(d => d.length === length);
}