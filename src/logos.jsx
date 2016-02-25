import React from 'react';
import { Image } from 'react-bootstrap';

const Logos = React.createClass({
    render () {
        return (
            <div
                style={{
                    bottom: '25%',
                    left: '60%',
                    position: 'fixed',
                    width: '22%'
                }}
            >
                <a href="http://www.facebook.com">
                    <Image rounded src="/public/facebook.png"
                        style={{
                            height: '30px',
                            width: '30px'
                        }}
                    />
                </a>
                <a href="http://www.youtube.com">
                    <Image rounded src="/public/youtube.png"
                        style={{
                            height: '30px',
                            width: '30px'
                        }}
                    />
                </a>
                <span
                    style={{
                        color: 'white',
                        float: 'right',
                        fontSize: '20px'
                    }}
                >
                    {'Logo Space'}
                </span>
            </div>
        );
    }
});

export default Logos;
