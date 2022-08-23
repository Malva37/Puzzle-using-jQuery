$(document).ready(() => {

    let rows = 4;
    let colomns = 4;
    let top = 0;

    for (let i = 0, order = 0, left = 0; i < rows; i++, top -= 100) {
        for (let j = 0; j < colomns; j++, order++, left -= 100) {
            let piece = document.createElement('div');
            let pieceInFinalPicture = document.createElement('div');
            $(pieceInFinalPicture).addClass('pieceInFinalPicture');
            $(piece).addClass('piece')
                .css({
                    'background-position': left + "px " + top + "px"
                })
                .attr('data-order', order)
            $('.puzzle').append(piece);
            $('.picture').append(pieceInFinalPicture);
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
        revert: 'invalid',
        start: () => {
            console.log($(this));
            if ($(this).hasClass('droppedPiece')) {
                debugger
                $(this).parent().removeClass('piecePresent');
                $(this).removeClass('droppedPiece');
            }
        }
    })

    $('.pieceInFinalPicture').droppable({
        hoverClass: 'ui-state-highlight',
        drop: function (event, ui) {
            let draggableElement = ui.draggable;
            let droppedOn = $(this);
            if (draggableElement.hasClass('droppedPiece')) {
                $(draggableElement).parent().removeClass('piecePresent');
                droppedOn.addClass('piecePresent');
                $(draggableElement).appendTo(droppedOn)
                    .css({
                        top: 0,
                        left: 0,
                        position: 'relative',
                        width: '100px',
                        height: '100px',
                        zIndex: 1
                    })
                checkIfPuzzleSolved()
            } else if (droppedOn.hasClass('piecePresent')) {
                returnPiece()
            } else {
                droppedOn.addClass('piecePresent');
                $(draggableElement).addClass('droppedPiece')
                    .appendTo(droppedOn)
                    .css({
                        top: 0,
                        left: 0,
                        position: 'relative',
                        width: '100px',
                        height: '100px',
                        zIndex: 1
                    })
                checkIfPuzzleSolved()
            }
        },
        accept: function returnPiece() {
            return !$(this).hasClass('piecePresent')
        }
    })



    function checkIfPuzzleSolved() {
        if ($('.picture .piecePresent').length != 16) {
            return false
        }
        for (let i = 0; i < 16; i++) {
            debugger
            let item = $('.droppedPiece:eq(' + i + ')').data('order');
            if (i != item) {
                $('.puzzle').text('Try again');
                return
            }
        }
        $('.puzzle').text('Good done');
    }

})