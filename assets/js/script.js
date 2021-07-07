'use strict'

$(document).ready(function () {

    let changeBackgroundEl = $('.hero');
    let modal = $('modal');

    const imgs = ['assets/img/Alaska.jpg', 'assets/img/GrandCanyon.jpg',
        'assets/img/nPark.jpg', 'assets/img/Rockies.jpg', 'assets/img/Yosemite.jpg'];

    changeBackgroundEl.attr('src', `${imgs[0]}`);

    let i = 1;

    // fades out first image
    var timerOut = setTimeout(() => {
        changeBackgroundEl.fadeOut(1000, $);

    }, 6000)

    // call recallTimer every 7 sec


    const recallTimer = () => {
        console.log(`index before change ${i}`);
        if (i < 5 ) {
            // fades in new image
            changeBackgroundEl.attr('src', `${imgs[i]}`).fadeIn(1000, $);


            i++;
            console.log(`index after change ${i}`);

            //  fades out the new image after 6 secs
            var timerOut = setTimeout(() => {
                changeBackgroundEl.fadeOut(1000, $);

            }, 6000)
            // else to resets index value.
        } else{ i = 1 
            changeBackgroundEl.attr('src', `${imgs[0]}`).fadeIn(1000, $);
            var timerOut = setTimeout(() => {
                changeBackgroundEl.fadeOut(1000, $);

            }, 6000)
        };
        console.log(i);
    }
    let internalTimer = setInterval(recallTimer, 7000);

    function revealModal(){
        modal.removeClass('.hidden');
        modal.addClass('modal-open');


    }







    modal.click(revealModal());

});