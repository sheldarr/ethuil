import _ from 'lodash';
import Dropzone from 'react-dropzone';
import React from 'react';
var Spinner = require('react-spinkit');
import { Glyphicon } from 'react-bootstrap';

const ImageDropzone = React.createClass({
    propTypes: {
        onDrop: React.PropTypes.func.isRequired,
        uploading: React.PropTypes.bool.isRequired
    },

    handleDrop (images) {
        this.props.onDrop(_.first(images));
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
                    {this.props.uploading
                        ? <Spinner spinnerName="three-bounce"/>
                        : <Glyphicon glyph="upload" />
                    }
                </div>
            </Dropzone>
        );
    }
});

export default ImageDropzone;
