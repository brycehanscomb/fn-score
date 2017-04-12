import Duration from '../models/duration';

const BASIC_DURATIONS = {
    WHOLE: {
        name: 'whole',
        length: 1,
        dotted: false
    },
    HALF: {
        name: 'half',
        length: 1/2,
        dotted: false
    },
    QUARTER: {
        name: 'quarter',
        length: 1/4,
        dotted: false
    },
    EIGHTH: {
        name: 'eighth',
        length: 1/8,
        dotted: false
    },
    SIXTEENTH: {
        name: 'sixteenth',
        length: 1/16,
        dotted: false
    },
    THIRTY_SECOND: {
        name: 'thirty second',
        length: 1/32,
        dotted: false
    },
};

// created dotted intervals
Object.keys(BASIC_DURATIONS).forEach(key => {
    BASIC_DURATIONS[`DOTTED_${key}`] = {
        dotted: true,
        length: BASIC_DURATIONS[key].length * 1.5,
        name: `dotted ${key}`
    };
});

// convert all to real Duration instances
Object.keys(BASIC_DURATIONS).forEach(key => {
    BASIC_DURATIONS[key] = new Duration(BASIC_DURATIONS[key]);
});

export default BASIC_DURATIONS;