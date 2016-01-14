import _ from 'lodash';
import React from 'react';

const Background = React.createClass({
    propTypes: {
        background: React.PropTypes.string.isRequired,
        car: React.PropTypes.string.isRequired
    },

    componentWillReceiveProps (nextProps) {
        var body = _.first(document.getElementsByTagName('body'));

        body.style.backgroundAttachment = 'fixed';
        body.style.backgroundImage = `url(../public/cars/${nextProps.car}), url(../public/backgrounds/${nextProps.background})`;
        body.style.backgroundPosition = 'center center';
        body.style.backgroundRepeat = ' repeat-x, repeat';
        body.style.backgroundSize = 'cover';
    },

    render () {
        return <div/>;
    }
});

export default Background;
