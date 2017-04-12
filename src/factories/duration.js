import Duration from '../models/duration';
import DURATIONS from '../constants/durations';

import shuffle from 'lodash/shuffle';

export function createDurationOfRandomLength() {
    return new Duration(shuffle(Object.values(DURATIONS))[0]);
}