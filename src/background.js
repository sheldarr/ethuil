const React = require('react')
const _ = require('lodash')

module.exports = React.createClass({
    propTypes: {
        url: React.PropTypes.string.isRequired
    },

    getInitialState () {
        return {
            html: _.first(document.getElementsByTagName('html'))
        }
    },

    componentDidMount () {
        var html = _.first(document.getElementsByTagName('html'))
        
        html.style.background = 'url(../public/inside_1.jpg) no-repeat center center fixed'
        html.style.backgroundSize = 'cover'
    },

    render () {
        return <div></div>
    }
})
