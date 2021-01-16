const emailForm = document.querySelector("#email");
const submitBtn = document.querySelector("#submit-btn");
const resultText = document.querySelector(".result-text");

const ctaBtn = document.querySelector("#get-started");

ctaBtn.addEventListener("click", () => {
    smoothScroll();
})

submitBtn.addEventListener("click", e => {
    e.preventDefault();

    validateEmail(emailForm.value);
})

function validateEmail(userEmail) {
    const emailPattern = /^([a-zA-Z]{1,})([\w \. \-]+)(\@[\w]{3,8})(\.[a-zA-Z]{2,4})(\.[a-zA-Z]{2,3})?$/;

    if (userEmail) {
        if (userEmail.match(emailPattern)) {
            showSuccess();
        } else {
            showError("invalid");
        }
    } else showError("empty")
}

const showError = (err) => {
    resultText.classList.remove("valid");
    resultText.classList.add("error");

    switch (err) {
        case "invalid":
            resultText.textContent = "Please enter a valid email address"
            break;
        case "empty":
            resultText.textContent = "Please enter your email address"
            break;
    }
}

const showSuccess = () => {
    resultText.classList.remove("error");
    resultText.classList.add("valid");

    resultText.textContent = "Valid email address"
}

function smoothScroll() {
    let targetSection = document.querySelector(".banner");
    let targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let startTime = null;
    let duration = 300;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        
        let timeElapsed = currentTime - startTime;
        let animate = ease(timeElapsed,startPosition,distance, duration);
        window.scrollTo(0,animate);

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d;
        return -c * t*(t-2) + b;
    };

    requestAnimationFrame(animation)
}