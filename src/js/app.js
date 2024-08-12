"use strict";

//  init Fancybox
if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        closeButton: false
    });
}


document.addEventListener('DOMContentLoaded', () => {


    const spinnerBtn = document.querySelector('.main__spinner-btn');
    const spinnerImage = document.querySelector('.main__spinner-wheel');

    spinnerBtn.addEventListener('click', () => {


        const minTurns = 3;
        const maxTurns = 10;
        const minDuration = 2;
        const maxDuration = 5;


        const turns = Math.floor(Math.random() * (maxTurns - minTurns + 1)) + minTurns;
        const extraDegrees = Math.floor(Math.random() * 360);
        const totalDegrees = turns * 360 + extraDegrees;


        const duration = Math.random() * (maxDuration - minDuration) + minDuration;


        spinnerImage.style.setProperty('--rotate-degrees', `${totalDegrees}deg`);
        spinnerImage.style.animation = `spin ${duration}s ease-out forwards`;


        setTimeout(() => {

            Fancybox.show([{
                src: '#congratulations',
                type: 'inline',
            }], {
                on: {
                    "done": (instance, current) => {
                        spinnerImage.style = ""
                    }
                }
            });

        }, duration * 1000);
    });


})
