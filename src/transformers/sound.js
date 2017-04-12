import Sound from '../models/sound';

export function mapTonesToDurations(durationsList) {
    return function(tone, index) {
        return Sound.composeFromToneAndDuration(tone, durationsList[index]);
    }
}