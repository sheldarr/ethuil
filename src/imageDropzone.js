const React = require('react');
const Dropzone = require('react-dropzone');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            files: []
        };
    },

    handleDrop: function (files) {
        this.setState({
            files: files
        });
    },

    handleOpenClick: function () {
        this.refs.dropzone.open();
    },

    render: function () {
        return (
            <div>
                <Dropzone onDrop={this.handleDrop} ref="dropzone">
                    <div>{'Try dropping some files here, or click to select files to upload.'}</div>
                </Dropzone>
                <button onClick = {this.handleOpenClick} type="button">
                    {'Open Dropzone'}
                </button>
                {
                    this.state.files.length > 0 ? (
                        <div>
                            <h2> {'Uploading'} {this.state.files.length} {'files...'} </h2>
                            <div>
                            {this.state.files.map((file) => <img key={1} src={file.preview}/>)}
                            </div>
                        </div>
                    ) : null
                }
            </div>
        );
    }
});
