import _ from 'lodash';

const Background = {
    set (url) {
        var body = _.first(document.getElementsByTagName('body'));

        body.style.backgroundAttachment = 'fixed';
        body.style.backgroundImage = 'url(../public/cars/insidetransparent_1.png), url(../public/backgrounds/outside_1.jpg)';
        body.style.backgroundPosition = 'center center';
        body.style.backgroundRepeat = ' repeat-x, repeat';
        body.style.backgroundSize = 'cover';
    }
};

export default Background;
