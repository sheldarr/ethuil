import React from 'react';
import _ from 'lodash';

const Background = React.createClass({
    propTypes: {
        url: React.PropTypes.string.isRequired
    },

    getInitialState () {
        return {
            html: _.first(document.getElementsByTagName('html'))
        };
    },

    componentDidMount () {
        var html = _.first(document.getElementsByTagName('html'));

        html.style.background = 'url(../public/inside_1.jpg) no-repeat center center fixed';
        html.style.backgroundSize = 'cover';
    },

    render () {
        return <div></div>;
    }
});

export default Background;
