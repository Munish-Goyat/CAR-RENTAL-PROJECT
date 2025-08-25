let currentUpdate = null;
const updateForm = document.getElementById("updateCarForm");
const updateFormContainer = document.getElementById("updateFormContainer");

function renderCars(brandId, cars) {
  const container = document.getElementById(brandId);
  container.innerHTML = "";

  cars.forEach((car) => {
    const card = document.createElement("div");
    card.className = "deals__card";

    let stars = "";
    for (let i = 0; i < 5; i++) {
      stars += `<span><i class="ri-${i < car.rating ? "star-fill" : "star-line"}"></i></span>`;
    }
    stars += `<span>(${car.reviews})</span>`;

    card.innerHTML = `
      <img src="${car.image}" alt="${car.name}" />
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
          <h3>&#8377;${car.price}<span>/Per Hour</span></h3>
          <div class="admin-buttons">
              <button onclick='showUpdateForm(${JSON.stringify(car)})' class="update-btn">Update Car</button>
              <button onclick="deleteCar(${car.id}, '${brandId}') "class="delete-btn">Delete Car</button>
          </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function loadCars() {
  fetch("get_car.php")
    .then((res) => res.text())
    .then((text) => {
      try {
        const data = JSON.parse(text);
        let totalCars = 0;

        for (const brand in data) {
          if (document.getElementById(brand)) {
            renderCars(brand, data[brand]);
            totalCars += data[brand].length;
          }
        }
        const addCarBtn = document.getElementById("addCarBtn");
        if (totalCars < 18) {
          addCarBtn.style.display = "inline-block";
        } else {
          addCarBtn.style.display = "none";
        }
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        console.log("Response was:", text);
      }
    })
    .catch((err) => {
      console.error("Error loading cars:", err);
    });
}
const addForm = document.getElementById("addCarForm");
const addFormContainer = document.getElementById("addFormContainer");

window.showAddCarForm = function () {
  addForm.reset();
  addFormContainer.style.display = "flex";
  document.body.style.overflow = "hidden";
};

window.cancelAdd = function () {
  addFormContainer.style.display = "none";
  document.body.style.overflow = "auto";
};

addForm.onsubmit = function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("brand", document.getElementById("addBrand").value);
  formData.append("name", document.getElementById("addName").value);
  formData.append("image", document.getElementById("addImage").files[0]);
  formData.append("rating", document.getElementById("addRating").value);
  formData.append("reviews", document.getElementById("addReviews").value);
  formData.append("seats", document.getElementById("addSeats").value);
  formData.append("transmission", document.getElementById("addTransmission").value);
  formData.append("mileage", document.getElementById("addMileage").value);
  formData.append("fuel", document.getElementById("addFuel").value);
  formData.append("price", document.getElementById("addPrice").value);

  fetch("add_car.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((msg) => {
      if (msg === "success") {
        alert("Car added successfully");
        addFormContainer.style.display = "none";
        document.body.style.overflow = "auto";
        loadCars();
      } else {
        alert("Failed to add car: " + msg);
      }
    });
};


window.showUpdateForm = function (car) {
  currentUpdate = car;

  document.getElementById("carModel").value = car.name;
  document.getElementById("mileage").value = car.mileage;
  document.getElementById("fuelType").value = car.fuel;
  document.getElementById("seats").value = car.seats;
  document.getElementById("carImage").value = ""; // File input can't be prefilled

  updateFormContainer.style.display = "flex";
  document.body.style.overflow = "hidden";
};

updateForm.onsubmit = function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("id", currentUpdate.id);
  formData.append("name", document.getElementById("carModel").value);
  formData.append("mileage", document.getElementById("mileage").value);
  formData.append("fuel", document.getElementById("fuelType").value);
  formData.append("seats", document.getElementById("seats").value);

  const imageInput = document.getElementById("carImage");
  if (imageInput.files.length > 0) {
    formData.append("carImage", imageInput.files[0]);
  }

  fetch("update_car.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((msg) => {
      if (msg === "success") {
        alert("Car updated successfully");
        updateFormContainer.style.display = "none";
        document.body.style.overflow = "auto";
        loadCars();
      } else {
        alert("Failed to update car: " + msg);
      }
    });
};


window.cancelUpdate = function () {
  updateFormContainer.style.display = "none";
  document.body.style.overflow = "auto";
};

window.deleteCar = function (id, brandId) {
  if (!confirm("Are you sure you want to delete this car?")) return;

  const formData = new FormData();
  formData.append("id", id);

  fetch("delete_car.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((msg) => {
      if (msg === "success") {
        alert("Car deleted successfully");
        loadCars();
      } else {
        alert("Failed to delete car");
      }
    });
};

document.addEventListener("DOMContentLoaded", loadCars);


