"use strict";

import gsap from "gsap";

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

        const turns = 2.375;
        const duration = 3;

        const totalDegrees = turns * 360;


        spinnerImage.style.setProperty('--rotate-degrees', `${totalDegrees}deg`);
        spinnerImage.style.animation = `spin ${duration}s ease-out forwards`;

        setTimeout(() => {

            Fancybox.show([{
                src: '#congratulations',
                type: 'inline',
            }], {
                on: {
                    "done": (instance, current) => {
                        setTimeout(() => {
                            spinnerImage.style = ""
                        }, 1000)
                    }
                }
            });

        }, duration * 1000);
    });

    const dotAnimation = gsap.timeline();


    dotAnimation.to(".dot-even", {
        opacity: 0,
        scale: 1.2,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "none"
    });


    dotAnimation.to(".dot-odd", {
        opacity: 0,
        scale: 1.2,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "none"
    });


})

