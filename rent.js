// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}



// Display car details dynamically
document.addEventListener("DOMContentLoaded", function () {
    const carName = document.getElementById("car-name");
    const carImage = document.getElementById("car-image");
    const carPrice = document.getElementById("car-price");
    const carSeats = document.getElementById("car-seats");
    const carFuel = document.getElementById("car-fuel");
    const carTransmission = document.getElementById("car-transmission");
    const carMileage = document.getElementById("car-mileage");
    const carReviews = document.getElementById("car-reviews");
    const carRating = document.getElementById("car-rating");

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const car = getQueryParam("car");
    const price = getQueryParam("price");
    const seats = getQueryParam("seats");
    const fuel = getQueryParam("fuel");
    const image = getQueryParam("image");
    const transmission = getQueryParam("transmission");
    const mileage = getQueryParam("mileage");
    const reviews = getQueryParam("reviews");
    const rating = getQueryParam("rating");

    function renderStars(rating) {
        const fullStar = '<span style="color: gold;">★</span>';
        const emptyStar = '<span style="color: lightgray;">☆</span>';
        const roundedRating = Math.round(rating);
        return fullStar.repeat(roundedRating) + emptyStar.repeat(5 - roundedRating);
    }

    if (car && price && seats && fuel && image && transmission && mileage) {
        carName.textContent = car;
        carPrice.textContent = "Price: ₹" + price + "/hour";
        carSeats.textContent = "Seating Capacity: " + seats + " persons";
        carFuel.textContent = "Fuel Type: " + fuel;
        carTransmission.textContent = "Transmission: " + transmission;
        carMileage.textContent = "Mileage: " + mileage;
        if (carReviews) carReviews.textContent = "Reviews: " + reviews;

        if (carRating && rating) {
            const ratingValue = Number(rating);
            if (!isNaN(ratingValue)) {
                carRating.innerHTML = `Rating: ${renderStars(ratingValue)} (${ratingValue}/5)`;
            } else {
                carRating.textContent = "Rating: N/A";
            }
        }

        const decodedImage = decodeURIComponent(image);
        carImage.src = decodedImage;
    } else {
        carName.textContent = "Car Not Found";
        carPrice.textContent = "";
        carSeats.textContent = "";
        carFuel.textContent = "";
        carTransmission.textContent = "";
        carMileage.textContent = "";
        carReviews.textContent = "";
        carRating.textContent = "";
        carImage.style.display = "none";
    }
});





// Booking confirmation alert
function confirmBooking() {
    alert("Booking Confirmed for " + getQueryParam("car"));
}


document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggleFeatures");
    const featuresContainer = document.getElementById("featuresContainer");

    // Function to add dynamic features
    function loadCarFeatures(car) {
        const carFeatures = {
            "Maruti Swift VXi": [
            "✔ Power Steering", "✔ ABS with EBD", "✔ Dual Airbags",
            "✔ Fuel: Petrol", "✔ Reverse Parking Sensors", "✔ Touchscreen Infotainment",
            "✔ Automatic Climate Control", "✔ Cruise Control"
        ],
        "Maruti Ertiga": [
            "✔ 7-Seater MPV", "✔ Automatic Climate Control", "✔ ABS with EBD",
            "✔ Fuel: Petrol/CNG", "✔ Touchscreen Infotainment", "✔ Keyless Entry",
            "✔ Rear AC Vents", "✔ Adjustable Steering"
        ],
        "Maruti Dzire": [
            "✔ Best-in-Class Mileage", "✔ Reverse Parking Sensors", "✔ Bluetooth Connectivity",
            "✔ Cruise Control", "✔ Push Start Button", "✔ Dual Front Airbags",
            "✔ ABS with EBD", "✔ Fog Lamps"
        ],
        "Hyundai Creta": [
            "✔ Sunroof", "✔ BlueLink Connected Tech", "✔ Ventilated Front Seats",
            "✔ Fuel: Petrol/Diesel", "✔ Bose Sound System", "✔ Wireless Charging",
            "✔ 6 Airbags", "✔ 360-degree Camera"
        ],
        "Hyundai i20": [
            "✔ Sporty Design", "✔ Turbocharged Engine Option", "✔ Wireless Android Auto & CarPlay",
            "✔ Digital Instrument Cluster", "✔ Bose Sound System", "✔ Air Purifier",
            "✔ Sunroof", "✔ Rear AC Vents"
        ],
        "Hyundai Verna": [
            "✔ ADAS (Advanced Driver Assistance Systems)", "✔ Ventilated Front Seats", "✔ Bose Premium Audio",
            "✔ Turbocharged Engine", "✔ Electric Sunroof", "✔ Wireless Charging",
            "✔ 6 Airbags", "✔ Digital Cluster with Navigation"
        ],
        "Scorpio Classic": [
            "✔ Rugged Build", "✔ 7-Seater", "✔ Diesel Engine",
            "✔ ABS with EBD", "✔ Touchscreen Infotainment", "✔ Reverse Camera",
            "✔ Hill Assist", "✔ Dual Airbags"
        ],
        "Mahindra Thar": [
            "✔ 4x4 Drivetrain", "✔ Convertible Roof Option", "✔ Touchscreen Infotainment",
            "✔ Fuel: Petrol/Diesel", "✔ Off-Roading Capabilities", "✔ High Ground Clearance",
            "✔ Cruise Control", "✔ Rollover Protection"
        ],
        "Mahindra Bolero": [
            "✔ Rugged & Reliable", "✔ High Ground Clearance", "✔ 7-Seater",
            "✔ Diesel Engine", "✔ ABS with EBD", "✔ Power Windows",
            "✔ Keyless Entry", "✔ Digital Instrument Cluster"
        ],
        "Corolla": [
            "✔ Premium Sedan", "✔ Smooth CVT Transmission", "✔ LED Headlamps",
            "✔ Fuel: Petrol/Hybrid", "✔ Spacious Interior", "✔ 6 Airbags",
            "✔ Cruise Control", "✔ Wireless Charging"
        ],
        "Innova": [
            "✔ 7-Seater Comfort", "✔ Captain Seats", "✔ Diesel & Hybrid Options",
            "✔ Touchscreen Infotainment", "✔ ABS with EBD", "✔ Rear AC Vents",
            "✔ Push Start Button", "✔ LED Headlamps"
        ],
        "Fortuner": [
            "✔ Bold SUV Design", "✔ Powerful Diesel Engine", "✔ 4x4 Drivetrain",
            "✔ Touchscreen Infotainment", "✔ 7-Seater", "✔ Hill Descent Control",
            "✔ Ventilated Seats", "✔ Sunroof"
        ],
        "Amaze": [
            "✔ Compact Sedan", "✔ CVT Automatic Option", "✔ Fuel Efficient",
            "✔ Touchscreen Infotainment", "✔ Rear Parking Sensors", "✔ Keyless Entry",
            "✔ Dual Airbags", "✔ Cruise Control"
        ],
        "Elevate": [
            "✔ SUV Styling", "✔ 10.25-inch Infotainment", "✔ Honda Sensing (ADAS)",
            "✔ Fuel: Petrol", "✔ 6 Airbags", "✔ Wireless Charging",
            "✔ Sunroof", "✔ Lane-Keep Assist"
        ],
        "Honda City": [
            "✔ Premium Sedan", "✔ Fuel: Petrol/Hybrid", "✔ ADAS (Honda Sensing)",
            "✔ Wireless Android Auto & Apple CarPlay", "✔ Sunroof", "✔ Ventilated Seats",
            "✔ Cruise Control", "✔ 6 Airbags"
        ],
        "Tata Tiago": [
            "✔ Compact Hatchback", "✔ Best-in-Class Safety", "✔ Fuel: Petrol/CNG",
            "✔ ABS with EBD", "✔ 7-inch Infotainment", "✔ Rear Parking Sensors",
            "✔ Dual Airbags", "✔ Sporty Styling"
        ],
        "Tata Safari": [
            "✔ 6/7-Seater SUV", "✔ Panoramic Sunroof", "✔ Wireless Charging",
            "✔ Ventilated Front Seats", "✔ Diesel Engine", "✔ ADAS Safety Features",
            "✔ JBL Sound System", "✔ 360-degree Camera"
        ],
        "Tata Punch": [
            "✔ Micro-SUV Design", "✔ 5-Star Global NCAP Safety", "✔ Fuel: Petrol/CNG",
            "✔ Digital Driver Display", "✔ ABS with EBD", "✔ Touchscreen Infotainment",
            "✔ Cruise Control", "✔ Rear AC Vents"
        ]
        };

        // Clear previous content
        featuresContainer.innerHTML = "";

        // Check if car has features
        if (carFeatures[car]) {
            const ul = document.createElement("ul");
            ul.classList.add("features-list");

            carFeatures[car].forEach(feature => {
                const li = document.createElement("li");
                li.textContent = feature;
                ul.appendChild(li);
            });

            featuresContainer.appendChild(ul);
        } else {
            featuresContainer.innerHTML = "<p>No features available</p>";
        }
    }

    // Toggle feature visibility
    toggleBtn.addEventListener("click", function (event) {
        event.preventDefault();
        
        const featureList = featuresContainer.querySelector(".features-list");

        if (featureList.style.maxHeight) {
            featureList.style.maxHeight = null; // Collapse the list
            toggleBtn.innerHTML = "View More ▼";
        } else {
            featureList.style.maxHeight = featureList.scrollHeight + "px"; // Expand the list
            toggleBtn.innerHTML = "View Less ▲";
        }
    });

    // Get car name from URL and load features
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const car = getQueryParam("car"); // Fetch car from URL
    if (car) {
        loadCarFeatures(car);
    }
});

  const taglines = [
    "Engineered for Thrill, Designed for Comfort",
    "Power Meets Elegance on Every Drive",
    "Your Everyday Adventure Machine",
    "Built Tough, Runs Smooth",
    "Where Style Meets Performance",
    "Redefining the Joy of Driving",
    "More Than Just a Car — It's an Experience",
    "Innovation in Every Turn",
    "Luxury You Can Feel, Performance You Can Trust",
    "Smart. Safe. Stylish.",
    "Drive Confident. Drive Bold.",
    "Where Every Journey Begins Right",
    "Born to Perform, Built to Last",
    "Turning Roads into Runways",
    "Sleek Outside, Beast Inside",
    "Class Meets Capability",
    "Make Every Mile Count",
    "The Drive You Deserve"
  ];

  const taglineElement = document.getElementById("dynamic-tagline");
  let index = 0;

  function showTagline() {
    taglineElement.style.opacity = 0;
    setTimeout(() => {
      taglineElement.textContent = taglines[index];
      taglineElement.style.opacity = 1;
      index = (index + 1) % taglines.length;
    }, 500);
  }

  showTagline();
  setInterval(showTagline, 3000);

  const questions = document.querySelectorAll(".faq-question");

  questions.forEach(q => {
    q.addEventListener("click", () => {
      const answer = q.nextElementSibling;
      const isOpen = q.classList.contains("active");

      document.querySelectorAll(".faq-answer").forEach(a => a.style.display = "none");
      document.querySelectorAll(".faq-question").forEach(qs => qs.classList.remove("active"));

      if (!isOpen) {
        answer.style.display = "block";
        q.classList.add("active");
      }
    });
  });

  document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const pickupInput = document.getElementById('pickup-date');
    const returnInput = document.getElementById('return-date');
    const pickupDate = new Date(pickupInput.value);
    const returnDate = new Date(returnInput.value);
    const now = new Date();

    const diffFromNow = (pickupDate - now) / (1000 * 60); // in minutes

    if (diffFromNow < 30) {
        alert("Pickup time must be at least 30 minutes from now.");
        return;
    }

    if (isNaN(pickupDate) || isNaN(returnDate) || returnDate <= pickupDate) {
        alert('Please select a valid pickup and return time.');
        return;
    }

    const hours = (returnDate - pickupDate) / (1000 * 60 * 60);
    const pricePerHour = getQueryParam("price");
    const carId = getQueryParam("id"); // You forgot this!
    const baseFare = parseFloat((hours * pricePerHour).toFixed(2));
    const tax = parseFloat((baseFare * 0.18).toFixed(2));
    const total = parseFloat((baseFare + tax).toFixed(2));

    // Update payment summary
    document.getElementById('baseFare').textContent = `₹${baseFare}`;
    document.getElementById('taxAmt').textContent = `₹${tax}`;
    document.getElementById('totlAmt').textContent = `₹${total}`;

    // Save in sessionStorage
    sessionStorage.setItem("baseFare", baseFare);
    sessionStorage.setItem("tax", tax);
    sessionStorage.setItem("total", total);

    // Update button states
    const confirmBtn = document.getElementById('confirmBtn');
    const changeBtn = document.getElementById('changeBtn');

    confirmBtn.textContent = "Confirmed";
    confirmBtn.disabled = true;
    changeBtn.style.display = "inline-block";
});

  document.getElementById('changeBtn').addEventListener('click', () => {
    document.getElementById('booking-form').reset();
  
    // Reset payment values
    const summaryLines = document.querySelectorAll('.payment-box .summary-line span:last-child');
    summaryLines[0].textContent = `₹-/`;
    summaryLines[1].textContent = `₹0`;
    summaryLines[2].textContent = `₹-/`;
  
    // Reset buttons
    const confirmBtn = document.getElementById('confirmBtn');
    const changeBtn = document.getElementById('changeBtn');

    confirmBtn.textContent = "Confirm Booking";
    confirmBtn.disabled = false;
    changeBtn.style.display = "none";
  }); 

document.getElementById('paymentButton').addEventListener('click', () => {
  const pickup = document.getElementById('pickup-date').value;
  const ret = document.getElementById('return-date').value;

  if (!pickup || !ret) {
    alert("Please confirm booking details first.");
    return;
  }

  // Get carId from current page URL
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get('id');

  if (!carId) {
    alert("Car ID is missing.");
    return;
  }

  // Save dates in sessionStorage
  sessionStorage.setItem('pickup', pickup);
  sessionStorage.setItem('return', ret);

  // Redirect with car ID
  window.location.href = `payment.php?id=${carId}`;
});

    const todayDate = document.querySelector('.today-date');
    const clock = document.querySelector('.current-time');

    todayDate.innerHTML = `<span>Today Date: ${new Date().toLocaleDateString()}</span>`;

    setInterval(function () {
      const now = new Date();
      clock.innerHTML = `<span>Current Time: ${now.toLocaleTimeString()}</span>`;
    }, 1000);
