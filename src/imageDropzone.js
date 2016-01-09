import React from 'react';
import Dropzone from 'react-dropzone';

const ImageDropzone = React.createClass({
    getInitialState () {
        return {files: []};
    },

    handleDrop (files) {
        this.setState({files: files});
    },

    render () {
        return (
            <div>
                <Dropzone onDrop={this.handleDrop}>
                    <div>{'Try dropping some files here, or click to select files to upload.'}</div>
                </Dropzone>
                {this.state.files.length > 0
                    ? (
                        <div>
                            <h2>
                                {'Uploading'}
                                {this.state.files.length}
                                {'files...'}
                            </h2>
                            <div>
                                {this.state.files.map((file) => <img key={1} src={file.preview}/>)}
                            </div>
                        </div>
                    )
                    : null
                }
            </div>
        );
    }
});

export default ImageDropzone;
