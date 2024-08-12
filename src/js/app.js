"use strict";

//  init Fancybox
if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        closeButton: false
    });
}

// import Swiper from 'swiper';
import * as devFunctions from './modules/functions.js';



document.addEventListener('DOMContentLoaded', () => {

    devFunctions.OS();
    devFunctions.isWebp()
    devFunctions.select();
    devFunctions.tooltip();
    // devFunctions.animation()

    // event handlers
    document.addEventListener('click', (e) => {

        const target = e.target;

        // menu btn
        if (target.closest('.icon-menu') || (target.classList.contains('menu__link') && document.querySelector('.header').classList.contains('open-menu'))) {
            getMenu()
        }

        // fac accordion
        if (target.matches('.faq__item-question')) {
            target.parentNode.classList.toggle('active')
            target.style = "pointer-events: none;"
            target.nextElementSibling.slideToggle(300, () => {
                target.removeAttribute("style");
            });
        }

        // copy btn

        if (target.matches('.btn-copy')) {
            var textToCopy = target.previousElementSibling.textContent;

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy).then(function () {
                    showTooltip(target);
                }).catch(function (err) {
                    console.error('Ошибка при копировании: ', err);
                });
            } else {
                var textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    showTooltip(target);
                } catch (err) {
                    console.error('Ошибка при копировании: ', err);
                }
                document.body.removeChild(textArea);
            }
        }

        // select row in table 
        if (target.matches('.person__items-select')) {
            target.classList.toggle('active');
            target.closest('tr').classList.toggle('selected');
        }


    });

    function getMenu() {
        document.body.classList.toggle('lock');
        document.querySelector('.header').classList.toggle('open-menu');
    }

    function showTooltip(element) {
        var tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = 'Copied';

        element.innerHTML += tooltip.outerHTML;

        setTimeout(function () {
            var tooltips = element.querySelectorAll('.tooltip');
            tooltips.forEach(function (tooltip) {
                tooltip.remove();
            });
        }, 1000);
    }



    // custom select


    // sliders

    if (document.querySelector('.reasons__items')) {
        new Swiper('.reasons__items', {
            slidesPerView: "auto",
            spaceBetween: 5,
            watchOverflow: true,
            breakpoints: {
                1199.98: {
                    slidesPerView: 4,
                }
            }
        })
    }
    if (document.querySelector('.reviews__slider')) {
        new Swiper('.reviews__slider', {
            slidesPerView: "auto",
            spaceBetween: 5,
            watchOverflow: true,
            breakpoints: {
                1199.98: {
                    slidesPerView: 4,
                }
            }
        })
    }

})





// slideToggle

HTMLElement.prototype.slideToggle = function (duration, callback) {
    if (this.clientHeight === 0) {
        _s(this, duration, callback, true);
    } else {
        _s(this, duration, callback);
    }
};

HTMLElement.prototype.slideUp = function (duration, callback) {
    _s(this, duration, callback);
};

HTMLElement.prototype.slideDown = function (duration, callback) {
    _s(this, duration, callback, true);
};

function _s(el, duration, callback, isDown) {

    if (typeof duration === 'undefined') duration = 400;
    if (typeof isDown === 'undefined') isDown = false;

    el.style.overflow = "hidden";
    if (isDown) el.style.display = "block";

    var elStyles = window.getComputedStyle(el);

    var elHeight = parseFloat(elStyles.getPropertyValue('height'));
    var elPaddingTop = parseFloat(elStyles.getPropertyValue('padding-top'));
    var elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
    var elMarginTop = parseFloat(elStyles.getPropertyValue('margin-top'));
    var elMarginBottom = parseFloat(elStyles.getPropertyValue('margin-bottom'));

    var stepHeight = elHeight / duration;
    var stepPaddingTop = elPaddingTop / duration;
    var stepPaddingBottom = elPaddingBottom / duration;
    var stepMarginTop = elMarginTop / duration;
    var stepMarginBottom = elMarginBottom / duration;

    var start;

    function step(timestamp) {

        if (start === undefined) start = timestamp;

        var elapsed = timestamp - start;

        if (isDown) {
            el.style.height = (stepHeight * elapsed) + "px";
            el.style.paddingTop = (stepPaddingTop * elapsed) + "px";
            el.style.paddingBottom = (stepPaddingBottom * elapsed) + "px";
            el.style.marginTop = (stepMarginTop * elapsed) + "px";
            el.style.marginBottom = (stepMarginBottom * elapsed) + "px";
        } else {
            el.style.height = elHeight - (stepHeight * elapsed) + "px";
            el.style.paddingTop = elPaddingTop - (stepPaddingTop * elapsed) + "px";
            el.style.paddingBottom = elPaddingBottom - (stepPaddingBottom * elapsed) + "px";
            el.style.marginTop = elMarginTop - (stepMarginTop * elapsed) + "px";
            el.style.marginBottom = elMarginBottom - (stepMarginBottom * elapsed) + "px";
        }

        if (elapsed >= duration) {
            el.style.height = "";
            el.style.paddingTop = "";
            el.style.paddingBottom = "";
            el.style.marginTop = "";
            el.style.marginBottom = "";
            el.style.overflow = "";
            if (!isDown) el.style.display = "none";
            if (typeof callback === 'function') callback();
        } else {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}
