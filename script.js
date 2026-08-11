/* =========================================================
   KHAN ABDUL KALAM — PORTFOLIO
   INTERACTIONS / ANIMATIONS
========================================================= */


/* =========================================================
   SELECTORS
========================================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);


/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

    const preloader = $("#preloader");

    setTimeout(() => {

        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";

    }, 1700);

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const year = $("#year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   MATRIX BACKGROUND
========================================================= */

const canvas = $("#matrix");

if (canvas) {

    const ctx =
        canvas.getContext("2d");

    let width =
        canvas.width =
        window.innerWidth;

    let height =
        canvas.height =
        window.innerHeight;

    const characters =
        "01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]$#@";

    const fontSize = 13;

    let columns =
        Math.floor(width / fontSize);

    let drops =
        new Array(columns).fill(1);


    function resizeMatrix() {

        width =
            canvas.width =
            window.innerWidth;

        height =
            canvas.height =
            window.innerHeight;

        columns =
            Math.floor(width / fontSize);

        drops =
            new Array(columns).fill(1);

    }


    window.addEventListener(
        "resize",
        resizeMatrix
    );


    function drawMatrix() {

        /*
         * Slight transparent black layer
         * creates the fading trail.
         */

        ctx.fillStyle =
            "rgba(5, 5, 5, 0.075)";

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        ctx.fillStyle =
            "#c8ff3d";

        ctx.font =
            `${fontSize}px monospace`;


        for (
            let i = 0;
            i < drops.length;
            i++
        ) {

            const character =
                characters[
                    Math.floor(
                        Math.random() *
                        characters.length
                    )
                ];


            ctx.fillText(
                character,
                i * fontSize,
                drops[i] * fontSize
            );


            /*
             * Random reset gives the matrix
             * a natural coding-screen effect.
             */

            if (
                drops[i] * fontSize >
                    height &&
                Math.random() > 0.975
            ) {

                drops[i] = 0;

            }


            drops[i]++;

        }

    }


    setInterval(
        drawMatrix,
        55
    );

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const scrollProgress =
    $("#scrollProgress");


function updateScrollProgress() {

    if (!scrollProgress) return;


    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const percentage =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;


    scrollProgress.style.width =
        `${percentage}%`;

}


window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);

updateScrollProgress();


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuButton =
    $("#menuButton");

const navMenu =
    $("#navMenu");


if (menuButton && navMenu) {

    menuButton.addEventListener(
        "click",
        () => {

            navMenu.classList.toggle(
                "mobile-open"
            );

        }
    );


    /*
     * Close mobile menu when
     * a navigation link is clicked.
     */

    navMenu
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    navMenu.classList.remove(
                        "mobile-open"
                    );

                }
            );

        });

}


/* =========================================================
   TYPING COMMAND
========================================================= */

const typingCommand =
    $("#typingCommand");


const commands = [

    "build --something-great",

    "git push origin future",

    "npm run create",

    "ship --with-intent",

    "code --solve-problems"

];


let commandIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeCommand() {

    if (!typingCommand) return;


    const currentCommand =
        commands[commandIndex];


    if (!deleting) {

        typingCommand.textContent =
            currentCommand.substring(
                0,
                characterIndex
            );

        characterIndex++;


        if (
            characterIndex >
            currentCommand.length
        ) {

            deleting = true;

            setTimeout(
                typeCommand,
                1100
            );

            return;

        }


    } else {

        typingCommand.textContent =
            currentCommand.substring(
                0,
                characterIndex
            );

        characterIndex--;


        if (characterIndex < 0) {

            deleting = false;

            characterIndex = 0;

            commandIndex =
                (commandIndex + 1) %
                commands.length;

        }

    }


    setTimeout(
        typeCommand,
        deleting ? 35 : 65
    );

}


setTimeout(
    typeCommand,
    1900
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    $$(".section, .project-card, .skill-card, .timeline-item");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    (element) => {

        element.classList.add(
            "reveal"
        );

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   ADD REVEAL CSS
========================================================= */

const revealStyle =
    document.createElement("style");


revealStyle.textContent = `

    .reveal {

        opacity: 0;

        transform:
            translateY(35px);

        transition:
            opacity 0.8s ease,
            transform 0.8s ease;

    }


    .revealed {

        opacity: 1;

        transform:
            translateY(0);

    }

`;


document.head.appendChild(
    revealStyle
);


/* =========================================================
   PROJECT 3D TILT
========================================================= */

const projectCards =
    $$(".project-card");


projectCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                /*
                 * Don't apply the heavy effect
                 * on small screens.
                 */

                if (
                    window.innerWidth < 800
                ) return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -2.5;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    2.5;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-7px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   PROFILE PARALLAX
========================================================= */

const profileCard =
    $(".profile-card");


window.addEventListener(
    "mousemove",
    (event) => {

        if (
            !profileCard ||
            window.innerWidth < 900
        ) return;


        const x =
            (event.clientX /
                window.innerWidth -
                0.5);


        const y =
            (event.clientY /
                window.innerHeight -
                0.5);


        profileCard.style.transform =
            `translate(
                ${x * 7}px,
                ${y * 7}px
            )`;

    }
);


/* =========================================================
   SMOOTH ANCHOR LINKS
========================================================= */

$$('a[href^="#"]').forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetID =
                    link.getAttribute("href");


                if (
                    !targetID ||
                    targetID === "#"
                ) return;


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }
);


/* =========================================================
   FLOATING CONTACT BUTTON
========================================================= */

const floatingContact =
    $("#floatingContact");


if (floatingContact) {

    floatingContact.addEventListener(
        "click",
        () => {

            const contact =
                $("#contact");


            if (contact) {

                contact.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}


/* =========================================================
   BUTTON CLICK EFFECT
========================================================= */

$$(".button, .project-button, .nav-button").forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                button.style.transform =
                    "scale(0.97)";


                setTimeout(
                    () => {

                        button.style.transform =
                            "";

                    },
                    120
                );

            }
        );

    }
);


/* =========================================================
   MAGNETIC HERO BUTTONS
========================================================= */

$$(".hero-buttons .button").forEach(
    (button) => {

        button.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth < 800
                ) return;


                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `translate(
                        ${x * 0.08}px,
                        ${y * 0.08}px
                    )`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    $("#contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        () => {

            const button =
                contactForm.querySelector(
                    ".send-button"
                );


            if (button) {

                button.innerHTML =
                    `SENDING <span>↗</span>`;

            }

        }
    );

}


/* =========================================================
   CONSOLE SIGNATURE
========================================================= */

console.log(
    "%cKhan Abdul Kalam",
    `
        color: #c8ff3d;
        font-size: 20px;
        font-weight: bold;
    `
);

console.log(
    "%cDeveloper Portfolio",
    `
        color: #888;
        font-size: 12px;
    `
);

console.log(
    "%cBuilt with HTML • CSS • JavaScript",
    `
        color: #555;
        font-size: 10px;
    `
);


/* =========================================================
   PAGE READY
========================================================= */

document.body.classList.add(
    "page-ready"
);