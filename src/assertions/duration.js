export function isLonger(duration1, duration2) {
    return duration2.length > duration1.length;
}

export function isShorter(duration1, duration2) {
    return duration2.length < duration1.length;
}

export function isSame(duration1, duration2) {
    return duration2.length === duration1.length;
}