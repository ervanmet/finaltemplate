/* MOBILE MENU */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle) {
  menuToggle.addEventListener("click", function () {
    nav.classList.toggle("show");
  });
}

/* HOME LOCATION CAROUSEL */

const slides = document.querySelectorAll(".location-slide");
const dots = document.querySelectorAll(".dot");
const nextButton = document.querySelector(".next");
const previousButton = document.querySelector(".previous");

let currentSlide = 0;

function showSlide(number) {
  if (slides.length === 0) {
    return;
  }

  slides.forEach(function (slide) {
    slide.classList.remove("active");
  });

  dots.forEach(function (dot) {
    dot.classList.remove("active");
  });

  slides[number].classList.add("active");

  if (dots[number]) {
    dots[number].classList.add("active");
  }
}

if (nextButton) {
  nextButton.addEventListener("click", function () {
    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    showSlide(currentSlide);
  });
}

if (previousButton) {
  previousButton.addEventListener("click", function () {
    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
  });
}

dots.forEach(function (dot, index) {
  dot.addEventListener("click", function () {
    currentSlide = index;

    showSlide(currentSlide);
  });
});

/* MENU LOCATION SWITCHER */

const menuButtons = document.querySelectorAll(".menu-location-button");
const menus = document.querySelectorAll(".location-menu");

menuButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const location = button.dataset.location;

    menuButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    menus.forEach(function (menu) {
      menu.classList.remove("active");
    });

    button.classList.add("active");

    const selectedMenu = document.getElementById(location + "-menu");

    if (selectedMenu) {
      selectedMenu.classList.add("active");
    }
  });
});

/* OPEN MENU FROM HOME PAGE */

const urlParams = new URLSearchParams(window.location.search);
const selectedLocation = urlParams.get("location");

if (selectedLocation && menuButtons.length > 0) {
  menuButtons.forEach(function (button) {
    if (button.dataset.location === selectedLocation) {
      button.click();
    }
  });
}

/* BOOKING LOCATION BUTTONS */

const bookingButtons = document.querySelectorAll(".booking-choice");
const bookingLocation = document.getElementById("selectedLocation");

bookingButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const location = button.dataset.booking;

    if (bookingLocation) {
      if (location === "waterway") {
        bookingLocation.value = "Waterway";
      }

      if (location === "pennsylvania") {
        bookingLocation.value = "Pennsylvania";
      }

      bookingLocation.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

/* BOOKING FORM */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    alert("Thank you! Your event inquiry has been submitted.");

    bookingForm.reset();
  });
}

/* EVENT FILTER */

const filterButtons = document.querySelectorAll(".event-filter-button");
const eventCards = document.querySelectorAll(".event-card");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const filter = button.dataset.filter;

    filterButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");

    eventCards.forEach(function (card) {
      if (filter === "all" || card.dataset.location === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* CALENDAR */

const calendarDays = document.getElementById("calendarDays");
const monthYear = document.getElementById("monthYear");
const previousMonth = document.getElementById("previousMonth");
const nextMonth = document.getElementById("nextMonth");

let calendarDate = new Date();

const calendarEvents = {
  "2026-10-24": {
    title: "Live Music",
    location: "Waterway",
  },

  "2026-10-31": {
    title: "Special Evening",
    location: "Pennsylvania",
  },

  "2026-11-07": {
    title: "Cocktail Night",
    location: "Waterway",
  },

  "2026-11-14": {
    title: "Wine Evening",
    location: "Pennsylvania",
  },
};

function createCalendar() {
  if (!calendarDays || !monthYear) {
    return;
  }

  calendarDays.innerHTML = "";

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const monthName = calendarDate.toLocaleString("default", {
    month: "long",
  });

  monthYear.textContent = monthName + " " + year;

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");

    calendarDays.appendChild(emptyDay);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");

    dayElement.textContent = day;

    const monthNumber = String(month + 1).padStart(2, "0");
    const dayNumber = String(day).padStart(2, "0");

    const dateKey = year + "-" + monthNumber + "-" + dayNumber;

    if (calendarEvents[dateKey]) {
      dayElement.classList.add("event-day");

      dayElement.addEventListener("click", function () {
        const event = calendarEvents[dateKey];

        alert(event.title + " - " + event.location);
      });
    }

    calendarDays.appendChild(dayElement);
  }
}

if (previousMonth) {
  previousMonth.addEventListener("click", function () {
    calendarDate.setMonth(calendarDate.getMonth() - 1);

    createCalendar();
  });
}

if (nextMonth) {
  nextMonth.addEventListener("click", function () {
    calendarDate.setMonth(calendarDate.getMonth() + 1);

    createCalendar();
  });
}

createCalendar();
