import MusicJSONNote from '../models/music-json-note';

/**
 * @param {number} divisionsPerQuarterNote
 * @param {number} proportionOfWholeNote
 */
export function getDurationDivision(divisionsPerQuarterNote = 24, proportionOfWholeNote = 0.25) {
    /**
     * 1/8 = 12
     * 1/4 = 24
     * 1/2 = 48
     * 1/1 = 96
     */

    const divisionsPerWholeNote = divisionsPerQuarterNote * 4;

    return proportionOfWholeNote * divisionsPerWholeNote;
}

/**
 * MusicXML nodes converted from MusicXML to MusicJSON have a weird syntax.
 *
 * @param {*} value
 * @return {{_: *}}
 */
export function xmlCompatibleProperty(value) {
    return { '_': value };
}

/**
 * @param {Array.<Sound>} soundsList
 * @returns {Object} - a MusicJSON object
 */
export function buildScoreJson(soundsList = []) {
    return ({
        "score-partwise": {
            "work": {
                "work-title": xmlCompatibleProperty('Sample Score'),
            },
            "part-list": {
                "score-part": [{
                    "$": {"id": "P1"},
                    "part-name": xmlCompatibleProperty("Piano"),
                    "score-instrument": {
                        "$": {"id": "P1-I3"},
                        "instrument-name": xmlCompatibleProperty("Piano (right)")
                    },
                }],
            },
            "part": [{
                "$": {"id": "P1"},
                "measure": [{
                    "attributes": {
                        "divisions": xmlCompatibleProperty(24),
                        "key": {
                            "fifths": xmlCompatibleProperty(0),
                            "mode": xmlCompatibleProperty("major"),
                        },
                        "time": {
                            "beats": xmlCompatibleProperty(4),
                            "beat-type": xmlCompatibleProperty(4)
                        },
                        "clef": {
                            "sign": xmlCompatibleProperty("G"),
                            "line": xmlCompatibleProperty(2),
                        },
                    },
                    "direction": [{
                        "$": {"placement": "above"},
                        "direction-type": {
                            "metronome": {
                                "$": {"parentheses": "no"},
                                "beat-unit": xmlCompatibleProperty("quarter"),
                                "per-minute": xmlCompatibleProperty(156)
                            },
                        },
                        "sound": {
                            "$": {"tempo": "156"},
                        },
                    }],
                    "note": soundsList
                        .map(MusicJSONNote.createFromSound)
                        .map(n => n.toMusicJSON())
                }]
            }]
        }
    })
}