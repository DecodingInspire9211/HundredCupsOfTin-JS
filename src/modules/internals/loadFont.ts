function loadFont(name: string, path: string)
{
    let font = new FontFace(name, `url(${path})`);
    font.load().then(function(font) {
        // with canvas, if this is ommited won't work
        document.fonts.add(font);
        console.log('Font loaded');
    }).catch(function (error) {
        console.error('Error loading font: ', error);
    });
}

export {loadFont};