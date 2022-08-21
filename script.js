$(document).ready(() => {

    let rows = 4;
    let colomns = 4;
    let top = 0;

    for (let i = 0; i < rows; i++) {

        top -= 100;
        let left = 0;

        for (let j = 0; j < colomns; j++) {
            let piece = document.createElement('div');
            $(piece).addClass('piece');
            left -= 100;
            $(piece).css({
                'background-position': left + "px " + top + "px"
            })
            $('.puzzle').append(piece)
        }
    }
    let pieces = $('.piece');
    console.log(pieces.length);

    let j;
    for (let i = 0; i < pieces.length; i++) {
        j = Math.floor(Math.random() * pieces.length);
        $(pieces[i]).before($(pieces[j]));
    }
    // return pieces;


    $('.piece').draggable({
        grid: [100, 100],
        drag: (() => {

            $(this).css('z-index', 2);
        })
    })

    $('.picture').droppable({
        accept: ".piece"
    });

})