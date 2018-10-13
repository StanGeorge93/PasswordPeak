let GLOBAL_COUNT = 0;

const inputs =  $("input[type='password']:visible");

const SRC = {
    SHOW: chrome.extension.getURL("assets/icon-show.png"),
    HIDE: chrome.extension.getURL("assets/icon-hide.png")
}
const updateDefaults = (config) => {
    defaults.input = config.input || null;
    defaults.button = config.button || null;
    defaults.image = config.image || null;
}
let defaults = {
    input: null,
    button: null,
    image: null
}

const setup = () => {
    for (let i = 0; i < inputs.length; i++) { 
        const input = inputs[i];
        let elId;

        if ($(input).attr("id")) {
            elId = $(input).attr("id");
        } else {
            $(input).attr("id", generateNextId())
            elId = $(input).attr("id");
        }

        let rect = input.getBoundingClientRect();       
        const inptHeight = $(input).innerHeight();
        const height = `height: ${inptHeight - inptHeight/8}px;`;
        let img = `<img id='${elId}-image'  src=${SRC.SHOW} style='height: 100%'/>`;
        let heightOfs = inptHeight - inptHeight/8;
        const topPos = `top: ${rect.top + input.offsetHeight / 2 - heightOfs / 2}px;`;
        const leftPos = `left: ${rect.left + input.offsetWidth - heightOfs - 10}px;`;
        const btnStyle = height + topPos + topPos + leftPos;
        const btnTemplate = `<div class="ext-btn-wrapper" id="${elId}-target" style='${btnStyle}'>${img}</div>`

        $("body").append(btnTemplate);

        updateDefaults({
            input: input,
            image: "#" + elId + "-image",
            button:  $(`#${elId}-ext-wrapper-div`)
        })

        $("#" + elId + "-target").on("click", function () {
            if (input.type === "password") {
                input.type = "text";
                $(`#${elId}-image`).attr("src", SRC.HIDE);
            } else {
                input.type = "password";
                $(`#${elId}-image`).attr("src", SRC.SHOW);
            }
        });
    }
}

const generateNextId = () => {
    let id = GLOBAL_COUNT + "-generated-id"
    GLOBAL_COUNT++;

    return id;
}

const updatePos = () => {
    for (let i = 0; i < inputs.length; i++) { 
        const input = inputs[i];
        const elId = $(input).attr("id");
        let rect = input.getBoundingClientRect();       
        const inputHeight = $(input).innerHeight();
        let heightOfs = inputHeight - inputHeight/8;

        $(`#${elId}-target`).css({
            top: rect.top + input.offsetHeight / 2 - heightOfs / 2,
            left: rect.left + input.offsetWidth - heightOfs - 10
        })
    }
}

setup();

$(window).on("resize", function () {
    updatePos();
})