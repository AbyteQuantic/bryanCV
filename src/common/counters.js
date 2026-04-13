import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export const countersAnimation = () => {

    gsap.registerPlugin(ScrollTrigger)

    // counters
    const number = document.querySelectorAll('.mil-counter');

    number.forEach( (element) => {
        const count = element,
            zero = {
                val: 0
            },
            num = count.dataset.number,
            split = (num + "").split("."),
            decimals = split.length > 1 ? split[1].length : 0;

        gsap.to(zero, {
            val: num,
            duration: 2,
            scrollTrigger: {
                trigger: count,
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
            onUpdate: function () {
                count.innerHTML = zero.val.toFixed(decimals);
            }
        });
    });

    // progressbar type 1 (circular)
    const progGo = document.querySelectorAll(".mil-circular-progress");

    progGo.forEach((section) => {
        var value = section.dataset.value;
        gsap.fromTo(section, {
            "--p": '0',
            ease: 'sine',
        }, {
            "--p": value,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                toggleActions: 'play none none none',
            }
        });
    });

    // progressbars type 2 (horizontal bars)
    const width = document.querySelectorAll(".mil-bar");

    width.forEach((section) => {
        var value = section.dataset.value;
        gsap.fromTo(section, {
            width: 0,
            duration: 5000,
            ease: 'sine',
        }, {
            width: value,
            scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                toggleClass: 'mil-active',
                toggleActions: 'play none none none',
            }
        });
    });
}