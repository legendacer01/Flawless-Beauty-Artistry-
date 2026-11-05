// ========================================
// MULTI-STEP BOOKING FORM
// ========================================

const bookingForm = document.getElementById("booking-form");

if (bookingForm) {

    const bookingSteps = document.querySelectorAll(".booking-step");
    const nextButtons = document.querySelectorAll(".next-step");
    const previousButtons = document.querySelectorAll(".previous-step");

    const stepCounter = document.getElementById("step-counter");
    const progressSegments = document.querySelectorAll(".progress-segment");

    let currentStep = 1;


    // SHOW THE CURRENT BOOKING STEP

    function showStep(stepNumber) {

        bookingSteps.forEach(function (step) {

            step.hidden = step.id !== `step-${stepNumber}`;

        });

        currentStep = stepNumber;

        // Update step counter

        stepCounter.textContent =
            `STEP 0${currentStep} OF 03`;

        // Update progress indicator

        progressSegments.forEach(function (segment, index) {

            segment.classList.toggle(
                "active",
                index < currentStep
            );

        });

    }


    // VALIDATE THE CURRENT STEP

    function validateCurrentStep() {

        const currentStepElement =
            document.getElementById(`step-${currentStep}`);

        const fields =
            currentStepElement.querySelectorAll("input, select, textarea");

        for (const field of fields) {

            if (!field.checkValidity()) {

                field.reportValidity();

                return false;

            }

        }

        return true;

    }


    // NEXT BUTTONS

    nextButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            if (!validateCurrentStep()) {
                return;
            }

            if (currentStep < 3) {

                currentStep++;

                if (currentStep === 3) {

                    generateBookingSummary();

                }

                showStep(currentStep);

            }

        });

    });


    // PREVIOUS BUTTONS

    previousButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            if (currentStep > 1) {

                showStep(currentStep - 1);

            }

        });

    });


   // GENERATE BOOKING SUMMARY

function generateBookingSummary() {

    const summary = document.getElementById("booking-summary");

    // Collect booking information
    const bookingDetails = [

        ["Full Name", document.getElementById("client-name").value.trim()],

        ["WhatsApp Phone", document.getElementById("client-phone").value.trim()],

        ["Makeup Service", document.getElementById("makeup-service").value],

        ["Preferred Date", formatBookingDate(
            document.getElementById("appointment-date").value
        )],

        ["Preferred Time", document.getElementById("appointment-time").value],

        ["Makeup Location", document.getElementById("appointment-location").value.trim()],

        ["Additional Notes", document.getElementById("additional-notes").value.trim() || "None"]

    ];

    // Clear previous summary
    summary.innerHTML = "";

    // Create summary rows
    bookingDetails.forEach(function (detail) {

        const item = document.createElement("div");
        item.className = "summary-item";

        const label = document.createElement("span");
        label.className = "summary-label";
        label.textContent = detail[0];

        const value = document.createElement("span");
        value.className = "summary-value";
        value.textContent = detail[1];

        item.appendChild(label);
        item.appendChild(value);

        summary.appendChild(item);

    });

}


// FORMAT APPOINTMENT DATE

function formatBookingDate(dateValue) {

    if (!dateValue) return "Not provided";

    const [year, month, day] = dateValue.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(date);

}



    // SUBMIT BOOKING TO WHATSAPP

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!validateCurrentStep()) {
            return;
        }


        // Collect client information

        const clientName =
            document.getElementById("client-name").value.trim();

        const clientPhone =
            document.getElementById("client-phone").value.trim();

        const makeupService =
            document.getElementById("makeup-service").value;


        // Collect appointment information

        const preferredDate =
            document.getElementById("appointment-date").value;

        const preferredTime =
            document.getElementById("appointment-time").value;

        const makeupLocation =
            document.getElementById("appointment-location").value.trim();

        const additionalNotes =
            document.getElementById("additional-notes").value.trim();


        // Build WhatsApp message

        const message = `Hello Flawless Beauty Artistry!

I would like to request a makeup appointment.

Full Name: ${clientName}
Phone Number: ${clientPhone}
Makeup Service: ${makeupService}
Preferred Date: ${preferredDate}
Preferred Time: ${preferredTime}
Makeup Location: ${makeupLocation}
Additional Notes: ${additionalNotes || "None"}

Please let me know if my preferred date and time are available. Thank you!`;


        // Artist's WhatsApp number

        const artistWhatsAppNumber = "2349033944737";


        // Generate WhatsApp URL

        const whatsappURL =
            `https://wa.me/${artistWhatsAppNumber}?text=${encodeURIComponent(message)}`;


        // Open WhatsApp

        window.open(whatsappURL, "_blank");

    });


    // INITIALISE FORM

    showStep(1);

}


// ========================================
// MOBILE NAVIGATION MENU
// ========================================

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {

        menuToggle.classList.toggle("active");

        mainNav.classList.toggle("active");

        const isOpen = mainNav.classList.contains("active");

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });

}