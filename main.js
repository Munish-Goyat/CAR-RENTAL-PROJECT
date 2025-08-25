const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 700,
});
ScrollReveal().reveal(".header__content .section__description", {
  ...scrollRevealOption,
  delay: 900,
});

ScrollReveal().reveal(".header__form form", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".about__card", {
  ...scrollRevealOption,
  interval: 500,
});

const tabs = document.querySelector(".deals__tabs");

tabs.addEventListener("click", (e) => {
  const tabContents = document.querySelectorAll(
    ".deals__container .tab__content"
  );
  Array.from(tabs.children).forEach((item) => {
    if (item.dataset.id === e.target.dataset.id) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
  tabContents.forEach((item) => {
    if (item.id === e.target.dataset.id) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
});

ScrollReveal().reveal(".choose__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".choose__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".choose__content .section__description", {
  ...scrollRevealOption,
  delay: 800,
});
ScrollReveal().reveal(".choose__card", {
  duration: 1000,
  delay: 1000,
  interval: 500,
});

ScrollReveal().reveal(".subscribe__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".subscribe__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".subscribe__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".subscribe__content form", {
  ...scrollRevealOption,
  delay: 1500,
});

const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
});


const slider = document.querySelector('.card-slider');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const scrollAmount = 220; // Adjust scrolling distance

nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});






// document.getElementById("openLogin").addEventListener("click", function () {
//   document.body.classList.add("blurred");  // Apply blur effect
//   document.getElementById("overlay").style.display = "block";  // Show overlay
//   document.body.classList.add("no-scroll"); //disable scrolling

//   // Load login.html content dynamically
//   fetch("login.html")
//       .then(response => response.text())
//       .then(data => { 
//           document.getElementById("loginContainer").innerHTML = data;
          
//           // Wait for content to load, then add event listener to close button
//           document.getElementById("closeLogin").addEventListener("click", function () {
//               document.body.classList.remove("blurred");  // Remove blur
//               document.getElementById("overlay").style.display = "none";  // Hide overlay
//               document.body.classList.remove("no-scroll");  // Enable scrolling
//               document.getElementById("loginContainer").innerHTML = ""; // Remove login form from DOM
//           });
//       }).catch(error => console.error("Error loading login form:", error));
// });

document.addEventListener("DOMContentLoaded", function () {
  const subscribeForm = document.getElementById("subscribeForm");
  const emailInput = document.getElementById("emailInput");
  const errorMsg = document.getElementById("errorMsg");
  const thankYouCard = document.getElementById("thankYouCard");
  const closeThankYou = document.getElementById("closeThankYou");
  const overlay = document.getElementById("overlay");
  const body = document.body;

  subscribeForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent page reload

      let email = emailInput.value.trim();

      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          errorMsg.textContent = ""; // Clear error message

          // ✅ Show the Thank You Card and Overlay
          thankYouCard.classList.add("show");
          overlay.classList.add("show");

          // ✅ Disable Scrolling
          body.classList.add("no-scroll");

      } else {
          errorMsg.textContent = "Please enter a valid email address.";
      }
      emailInput.value = "";
  });

  // Close Thank You Card
  closeThankYou.addEventListener("click", function () {
      thankYouCard.classList.remove("show");
      overlay.classList.remove("show");
      body.classList.remove("no-scroll"); // Re-enable scrolling
  });
});

// Date Picker using Flatpickr
document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#start", {
      enableTime: true,
      dateFormat: "M d, h:i K", // Format: Aug 16, 10:00 AM
      minDate: "today",
  });

  flatpickr("#stop", {
      enableTime: true,
      dateFormat: "M d, h:i K",
      minDate: "today",
  });
});

// function initAutocomplete() {
//   let locationInput = document.getElementById("location");

//   if (!locationInput) {
//       console.error("Location input field not found!");
//       return;
//   }

  // let autocomplete = new google.maps.places.Autocomplete(locationInput, {
  //     types: ["geocode"], // Suggests locations
  //     componentRestrictions: { country: "IN" }, // Restrict to India
  // });

  // Store user input to allow manual editing
  // let userTypedText = "";

  // // Listen to input changes and store manually entered text
  // locationInput.addEventListener("input", function () {
  //     userTypedText = locationInput.value;
  // });

  // // When a place is selected, update the field
  // autocomplete.addListener("place_changed", function () {
  //     let place = autocomplete.getPlace();
      
  //     if (!place.geometry) {
  //         console.warn("Invalid location selected!");
  //         return;
  //     }

//       // Set selected address if valid
//       locationInput.value = place.formatted_address;
//       userTypedText = place.formatted_address;
//   });

//   // Fix: Allow full manual editing by restoring user input on keypress
//   locationInput.addEventListener("keydown", function (e) {
//       if (e.key !== "Enter") {
//           locationInput.value = userTypedText;
//       }
//   });
// }

// Ensure script is loaded before calling initAutocomplete
// window.onload = function () {
//   initAutocomplete();
// };



document.getElementById("buyCar").addEventListener("click", function () {
  window.location.href = "host.html";
});


// load cars in html page using php and js

document.addEventListener("DOMContentLoaded", () => {
  const brands = ["Maruti", "Hyundai", "Mazda", "Toyota", "Honda", "Tata"];

  const renderCars = (brandId, cars) => {
    const container = document.getElementById(brandId);
    container.innerHTML = "";

    cars.forEach(car => {
      const card = document.createElement("div");
      card.className = "deals__card";

      let stars = "";
      for (let i = 0; i < 5; i++) {
        stars += `<span><i class="ri-${i < car.rating ? 'star-fill' : 'star-line'}"></i></span>`;
      }
      stars += `<span>(${car.reviews})</span>`;

      card.innerHTML = `
        <img src="${car.image}" alt="deals" />
        <div class="deals__rating">${stars}</div>
        <h4>${car.name}</h4>
        <div class="deals__card__grid">
          <div><span><i class="ri-group-line"></i></span> ${car.seats} People</div>
          <div><span><i class="ri-steering-2-line"></i></span> ${car.transmission}</div>
          <div><span><i class="ri-speed-up-line"></i></span> ${car.mileage}</div>
          <div><span><i class="ri-car-line"></i></span> ${car.fuel}</div>
        </div>
        <hr />
        <div class="deals__card__footer">
          <h3>₹${car.price}<span>/Per Hour</span></h3>
          <a href="rent.html?car=${encodeURIComponent(car.name)}&price=${car.price}&seats=${car.seats}&fuel=${car.fuel}&image=${encodeURIComponent(car.image)}&transmission=${encodeURIComponent(car.transmission)}&mileage=${encodeURIComponent(car.mileage)}&reviews=${car.reviews}&rating=${car.rating}&id=${car.id}" class="rent-btn">
            Rent Now <span><i class="ri-arrow-right-line"></i></span>
          </a>
        </div>
      `;

      container.appendChild(card);
    });
  };

  brands.forEach(brand => {
    fetch(`getCars.php?brand=${brand}`)
      .then(res => res.json())
      .then(data => renderCars(brand, data))
      .catch(err => console.error("Error loading cars:", err));
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const isLoggedIn = localStorage.getItem('loggedIn');
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  const loginBtn = document.getElementById('loginBtn');
  const userIcon = document.getElementById('userIcon');
  const sidePanel = document.getElementById('sidePanel');
  const sideUsername = document.getElementById('sideUsername');
  const sideEmail = document.getElementById('sideEmail');

  if (isLoggedIn === 'true') {
      if (loginBtn) {
          loginBtn.style.display = 'none';
      }
      if (userIcon) {
          userIcon.style.display = 'block';
      }
      if (sideUsername) sideUsername.innerText = username;
      if (sideEmail) sideEmail.innerText = email;
  } else {
      if (userIcon) {
          userIcon.style.display = 'none';
      }
  }

  if (userIcon) {
      userIcon.addEventListener('click', function() {
          sidePanel.style.right = "0";
      });
  }

  window.addEventListener('click', function(event) {
      if (!sidePanel.contains(event.target) && event.target !== userIcon) {
          sidePanel.style.right = "-300px";
      }
  });
});

function logout() {
  // Clear localStorage
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('username');
  localStorage.removeItem('email');

  // Redirect to logout.php to clear PHP session
  window.location.href = 'http://localhost/car_project/logout.php';
}
window.onload = function () {
  const isLoggedIn = localStorage.getItem('loggedIn');
  const loginBtn = document.getElementById('loginBtn');
  const userIcon = document.getElementById('userIcon');
  const logoutBtn = document.getElementById('logOutBtn');

  if (isLoggedIn) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (userIcon) userIcon.style.display = 'block';
    if (logoutBtn) logoutBtn.style.display = 'block';
  } else {
    if (loginBtn) loginBtn.style.display = 'block';
    if (userIcon) userIcon.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
};


function togglePanel() {
  const sidePanel = document.getElementById('sidePanel');
  if (sidePanel.style.right === '0px') {
    sidePanel.style.right = '-300px'; // Hide panel
  } else {
    sidePanel.style.right = '0px'; // Show panel
  }
}

//overlay login js
const loginBtn = document.getElementById("loginBtn");
const modalOverlay = document.getElementById("modalOverlay");
const registerFrame = document.getElementById("registerFrame");
const closeModal = document.getElementById("closeModal");

loginBtn.addEventListener("click", function () {
  modalOverlay.style.display = "block";
  registerFrame.src = "http://localhost/car_project/register.php";
  document.body.classList.add("no-scroll"); 
});

closeModal.addEventListener("click", function () {
  modalOverlay.style.display = "none";
  registerFrame.src = "";
  document.body.classList.remove("no-scroll"); 
});


window.onload = function () {
  const paymentDone = sessionStorage.getItem('paymentDone') === 'true';
  const bookingBtn = document.getElementById('yourBookingBtn');
  if (paymentDone && bookingBtn) {
    bookingBtn.style.display = 'block';
  }
};