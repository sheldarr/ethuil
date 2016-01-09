import React from 'react';
import Dropzone from 'react-dropzone';

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
        display: 'inline-block',
        height: '128px',
        margin: '0 1%',
        width: '46%'
    },

    render () {
        return (
            <Dropzone multiple={false} onDrop={this.handleDrop} style={this.dropzoneStyle}>
                <div>{'Try dropping some files here, or click to select files to upload.'}</div>
            </Dropzone>
        );
    }
});

export default ImageDropzone;
