import React from 'react';
import Dropzone from 'react-dropzone';

import { Glyphicon } from 'react-bootstrap';

const ImageDropzone = React.createClass({
    getInitialState () {
        return {images: []};
    },

    handleDrop (images) {
        this.setState({images: images});
    },

    dropzoneStyle: {
        borderColor: 'black',
        borderRadius: '5px',
        borderStyle: 'dashed',
        borderWidth: '2px',
        float: 'left',
        height: '128px',
        margin: '1% 1%',
        width: '48%'
    },

    uploadGlyphiconStyle: {
        fontSize: '2.5em',
        position: 'relative',
        textAlign: 'center',
        top: '50%',
        transform: 'translateY(-50%)'
    },

    render () {
        return (
            <Dropzone multiple={false} onDrop={this.handleDrop} style={this.dropzoneStyle}>
                <div style={this.uploadGlyphiconStyle}>
                    <Glyphicon glyph="upload" />
                </div>
            </Dropzone>
        );
    }
});

export default ImageDropzone;
