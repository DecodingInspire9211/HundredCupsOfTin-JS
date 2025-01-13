function loadFont(name, path)
{
    let font = new FontFace(name, `url(${path})`);
    font.load().then(function (loadedFont) {
        document.fonts.add(loadedFont);
    }).catch(function (error) {
        console.log(error);
    });
}

export { loadFont };