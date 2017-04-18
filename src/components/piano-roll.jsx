import React from 'react';
import pixiPianoRoll from 'pixi-piano-roll';
import PropTypes from 'prop-types';

export default class PianoRoll extends React.Component {

    componentDidMount() {
        this.roll = pixiPianoRoll({
            width: 400,
            height: 200,
            noteColor: 0xdb000f,
            gridLineColor: 0xcdcdcd,
            pianoKeyWidth: 20,
            backgroundColor: 0xffffff,
            bpm: this.props.bpm,
            antialias: true,
            zoom: this.props.bars,
            resolution: 4,
            time: '0:0:0',
            noteFormat: 'String',
            noteData: this.props.noteData
        });

        this.refs.rootNode.appendChild(this.roll.view);
        // this.roll.playback.play();
    }

    render() {
        return (
            <div ref="rootNode" />
        );
    }
}

PianoRoll.propTypes = {
    bpm: PropTypes.number.isRequired,
    noteData: PropTypes.arrayOf(
        PropTypes.array.isRequired
    ).isRequired,
    bars: PropTypes.number.isRequired
};