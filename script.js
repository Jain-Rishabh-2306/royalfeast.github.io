// Loader
window.addEventListener("load", function() {
    document.querySelector(".loader-wrapper").classList.add("hidden");
});

setTimeout(function() {
    const loader = document.querySelector(".loader-wrapper");
    if(loader) loader.classList.add("hidden");
}, 2000);

// Navbar shadow on scroll
window.addEventListener("scroll", function() {
    document.querySelector(".navbar")
        .classList.toggle("scrolled", window.scrollY > 50);
    revealOnScroll();
});

// Mobile menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// Smooth Scroll
document.querySelectorAll("a").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            document.querySelector(this.hash)
                .scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Scroll Reveal
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("DOMContentLoaded", revealOnScroll);

// Active Nav Highlight
const currentLocation = location.href;
const menuItems = document.querySelectorAll(".nav-links a");
menuItems.forEach(link => {
    if (link.href === currentLocation) {
        link.classList.add("active");
    }
});

// Contact Form Validation
const contactForm = document.getElementById("contactForm");

if(contactForm){
    contactForm.addEventListener("submit", function(e){
        e.preventDefault();
        const name = contactForm.querySelector("input[type='text']").value.trim();
        const email = contactForm.querySelector("input[type='email']").value.trim();
        const message = contactForm.querySelector("textarea").value.trim();
        if(name === "" || email === "" || message === ""){
            alert("Please fill in all fields ☕");
        } else {
            alert("Thank you for contacting Royal Feast! We'll get back to you soon 🍽️");
            contactForm.reset();
        }
    });
}

// Reservation Form with EmailJS
const reservationForm = document.getElementById("reservationForm");

if (reservationForm) {

    emailjs.init("NeUue__k7rbn7JL5e");

    reservationForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("resName").value.trim();
        const phone = document.getElementById("resPhone").value.trim();
        const date = document.getElementById("resDate").value;
        const time = document.getElementById("resTime").value;
        const guests = document.getElementById("resGuests").value;
        const email = document.getElementById("email").value.trim();

        if (!name || !phone || !date || !time || !guests || !email) {
            alert("Please fill all reservation details ☕");
            return;
        }

        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0,0,0,0);

        if (selectedDate < today) {
            alert("Please select a valid future date 📅");
            return;
        }

        emailjs.send("service_99k4iig", "template_xeiac2b", {
            from_name: name,
            from_phone: phone,
            reservation_date: date,
            reservation_time: time,
            guests: guests,
            email: email
        })
        .then(function() {
            return emailjs.send("service_99k4iig", "template_n1ogb2r", {
                from_name: name,
                reservation_date: date,
                reservation_time: time,
                guests: guests,
                email: email
            });
        })
        .then(function() {
            const formSection = document.querySelector(".reservation-section");
            formSection.innerHTML = `
                <div style="text-align:center; padding: 60px 20px;">
                    <h2 style="color: var(--primary); margin-bottom: 20px;">🎉 Reservation Confirmed!</h2>
                    <p style="font-size: 1.1rem; margin-bottom: 10px;">Thank you <strong>${name}</strong>! Your table has been booked.</p>
                    <p style="margin-bottom: 10px;">📅 Date: <strong>${date}</strong></p>
                    <p style="margin-bottom: 10px;">⏰ Time: <strong>${time}</strong></p>
                    <p style="margin-bottom: 30px;">👥 Guests: <strong>${guests}</strong></p>
                    <p style="margin-bottom: 40px; color: #666;">A confirmation email has been sent to <strong>${email}</strong></p>
                    <p style="color: var(--primary); font-weight: 500;">We look forward to welcoming you at Royal Feast 🍽️</p>
                </div>
            `;
        })
        .catch(function(error) {
            alert("Something went wrong. Please try again.");
            console.log("Email failed...", error);
        });

    });
}