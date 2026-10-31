const bookingForm = document.getElementById("booking-form");

if (bookingForm) {
bookingForm.addEventListener("submit", function (event) {
event.preventDefault();


// Collect the client's information
const clientName = document.getElementById("client-name").value.trim();
const clientPhone = document.getElementById("client-phone").value.trim();
const makeupService = document.getElementById("makeup-service").value;

// Collect the remaining appointment details
const preferredDate = document.getElementById("appointment-date").value;
const preferredTime = document.getElementById("appointment-time").value;
const makeupLocation = document.getElementById("appointment-location").value.trim();
const additionalNotes = document.getElementById("additional-notes").value.trim();

// Build the WhatsApp message
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


// Replace this placeholder with the artist's WhatsApp number
const artistWhatsAppNumber = "2349033944737";

// Encode the message so it works in a WhatsApp URL
const whatsappURL =
    `https://wa.me/${artistWhatsAppNumber}?text=${encodeURIComponent(message)}`;

// Open WhatsApp with the appointment request
window.open(whatsappURL, "_blank");


});

}


// MOBILE NAVIGATION MENU 

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
