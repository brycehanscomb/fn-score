import React from 'react';
import { OSMD } from "opensheetmusicdisplay";

import music from 'musicjson3';

function getMusicXmlFromMusicJson(musicJson) {
    return new Promise((resolve, reject) => {
        music.musicXML(musicJson, function(err, xml) {
            if (err) {
                reject(err);
                return;
            }

            resolve(xml);
        })
    });
}

// function getMusicJsonFromMusicXML(musicXml) {
//     return new Promise((resolve, reject) => {
//         music.musicJSON(musicXml, function(err, json) {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//
//             resolve(json);
//         })
//     });
// }

export default class Score extends React.Component {

    componentDidMount() {
        this.osmd = new OSMD(this.refs.renderPoint);

        getMusicXmlFromMusicJson(this.props.musicJSON)
            .then(xml => {
                return this.osmd.load(xml);
            })
            .then(
                () => {
                    this.osmd.render();
                },
                (err) => console.error(err)
            )
            .then(
                null,
                (err) => console.error(err)
            );

        // getMusicXmlFromMusicJson(this.props.musicJSON).then(
        //     toBase64,
        //     console.error.bind(console),
        // ).then(console.log.bind(console));
        //
        // this.osmd.load(this.props.musicXML)
        //     .then(
        //         () => {
        //             this.osmd.render();
        //             console.log("WHAT UP");
        //         },
        //         (err) => console.error(err)
        //     )
        //     .then(
        //         () => console.log("Sheet music displayed."),
        //         (err) => console.error(err)
        //     );

    }

    render() {
        return <div ref="renderPoint" />
    }
}

Score.propTypes = {
    musicXML: React.PropTypes.any,
    musicJSON: React.PropTypes.any
};