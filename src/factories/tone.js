import TONES from '../constants/tones';

export function createFromNoteName(noteName) {
    if (!noteName) {
        return null;
    }

    const octave = parseInt(noteName.slice(-1));
    const isAccidental = noteName.includes('#');
    const pitch = noteName
        .replace(String(octave), '')
        .replace('#', '');

    return TONES.find(
        tone => (
            tone.isAccidental === isAccidental &&
            tone.octave === octave &&
            tone.note[0] === pitch
        )
    );
}