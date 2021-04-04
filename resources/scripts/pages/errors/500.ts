const stackContainer: HTMLElement = document.querySelector(
    ".stack-container"
) as HTMLElement;
const cardNodes: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".card-container"
);
const perspecNodes: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".perspec"
);
const perspec: HTMLElement = document.querySelector(".perspec") as HTMLElement;
const card: HTMLElement = document.querySelector(".card") as HTMLElement;

let counter = stackContainer.children.length;

/**
 * Function to generate random number
 * @param min {number}
 * @param max {number}
 * @returns {number}
 */
function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * After tilt animation, fire the explode animation
 */
card.addEventListener("animationend", function() {
    perspecNodes.forEach(function(elem: Element, index: number) {
        elem.classList.add("explode");
    });
});

/**
 * After explode animation do a bunch of stuff
 */
perspec.addEventListener("animationend", function(e: any) {
    if (e.animationName === "explode") {
        cardNodes.forEach(function(elem: any, index: number) {
            //add hover animation class
            elem.classList.add("pokeup");

            //add event listner to throw card on click
            elem.addEventListener("click", function() {
                let updown = [800, -800];
                let randomY = updown[Math.floor(Math.random() * updown.length)];
                let randomX = Math.floor(Math.random() * 1000) - 1000;

                elem.style.transform = `translate(${randomX}px, ${randomY}px) rotate(-540deg)`;
                elem.style.transition = "transform 1s ease, opacity 2s";
                elem.style.opacity = "0";
                counter--;

                if (counter === 0) {
                    stackContainer.style.width = "0";
                    stackContainer.style.height = "0";
                }
            });

            //generate random number of lines of code between 4 and 10 and add to each card
            let numLines = randomIntFromInterval(5, 10);

            //loop through the lines and add them to the DOM
            for (let index = 0; index < numLines; index++) {
                let lineLength = randomIntFromInterval(25, 97);
                var node = document.createElement("li");
                node.classList.add("node-" + index);
                elem.querySelector(".code ul")
                    .appendChild(node)
                    .setAttribute(
                        "style",
                        "--linelength: " + lineLength + "%;"
                    );

                //draw lines of code 1 by 1
                if (index == 0) {
                    elem.querySelector(".code ul .node-" + index).classList.add(
                        "writeLine"
                    );
                } else {
                    elem.querySelector(
                        ".code ul .node-" + (index - 1)
                    ).addEventListener("animationend", function(e: any) {
                        elem.querySelector(
                            ".code ul .node-" + index
                        ).classList.add("writeLine");
                    });
                }
            }
        });
    }
});
