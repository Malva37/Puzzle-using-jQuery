$(document).ready(() => {

    let rows = 4;
    let colomns = 4;
    let top = 0;

    for (let i = 0; i < rows; i++) {
        top -= 100;
        let left = 0;
        for (let j = 0; j < colomns; j++) {
            let piece = document.createElement('div');
            let pieceInFinalPicture = document.createElement('div');
            $(pieceInFinalPicture).addClass('pieceInFinalPicture');
            $(piece).addClass('piece');
            left -= 100;
            $(piece).addClass('piece')
                    .css({
                'background-position': left + "px " + top + "px"
                //,
                // position:'absolute'
            })
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
        revert:'invalid',
        grid: [100, 100],
        drag: (() => {
            $(this).css('z-index', 2);
        }),
        start:()=>{
            console.log($(this))

            if($(this).hasClass('droppedPiece')){
                debugger
                $(this).parent().removeClass('piecePresent');
            console.log(this)
                
                $(this).removeClass('droppedPiece');


            }
        }
    })

    // $('.picture').droppable({
    //     accept: ".piece"
    // });
    $('.pieceInFinalPicture').droppable({
        // classes:{
        //     'ui-droppable':'highlight'
        // },
hoverClass:'ui-state-highlight',
accept:function(){
    return !$(this).hasClass('piecePresent')
},
        drop: function(event, ui){
            console.log(event);
            console.log(ui);
            let draggableElement = ui.draggable;
            let droppedOn = $(this);
            droppedOn.addClass('piecePresent');
            $(draggableElement).addClass('droppedPiece')
                               .appendTo(droppedOn)
                               .css({
                top:0,
                left:0,
                position:'relative',
                width:'100px',
                height:'100px',
                zIndex:1
            })

        }
    })



    

})