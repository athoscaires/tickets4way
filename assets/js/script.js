(function() {
  "use strict";

  /**
  * Easy selector helper function
  */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
  * Easy event listener function
  */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
  * Easy on scroll event listener 
  */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
  * Navbar links active state on scroll
  */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
  * Scrolls to an element with header offset
  */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
  * Toggle .header-scrolled class to #header when page is scrolled
  */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
  * Back to top button
  */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
  * Mobile nav toggle
  */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
  * Mobile nav dropdowns activate
  */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
  * Scroll with offset on links with a class name .scrollto
  */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
  * Scroll with offset on page load with hash links in the url
  */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
  * Preloader
  */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  };

  /**
  * Input stepper
  */
  class Spinner {
    constructor(container) {
      this.counter = 0;
      this.container = container;
      this.decrementButton = container.querySelector('.spinner-decrement');
      this.incrementButton = container.querySelector('.spinner-increment');
      this.numberInput = container.querySelector('.spinner-number');
      this.stepButtons = document.querySelectorAll('.step-buttons');
      this.submitButton = document.querySelector('.step-btn');
      
      this.decrementButton.addEventListener('click', this.decrement.bind(this));
      this.incrementButton.addEventListener('click', this.increment.bind(this));
      this.numberInput.addEventListener('input', this.render.bind(this));
    }
  
    decrement() {
      if (this.counter > 0) {
        this.counter--;
        this.render();
        this.checkAllCounters();
      }
    }
  
    increment() {
      if (this.counter < 100) {
        this.counter++;
        this.render();
        this.checkAllCounters();
      }
    }
  
    render() {
      this.numberInput.value = this.counter;
      this.checkAllCounters();
    }
  
    checkAllCounters() {
      const allCountersZero = Array.from(spinners).every(spinner => spinner.counter === 0);
  
      this.stepButtons.forEach(button => {
        if (allCountersZero) {
          button.classList.add('disabled');
          if (this.submitButton) {
            this.submitButton.disabled = true;
          }
        } else {
          button.classList.remove('disabled');
          if (this.submitButton) {
            this.submitButton.disabled = false;
          }
        }
      });
    }
  }
  
  const spinnerContainers = document.querySelectorAll('.spinner-container');
  const spinners = Array.from(spinnerContainers).map(container => new Spinner(container));

  /**
  * Multi step form
  */
  const circles = document.querySelectorAll(".circle") || null;
  const progressBar = document.querySelector(".indicator") || null;
  const buttons = document.querySelectorAll("button") || null;

  const steps = [
    document.querySelector(".step-ticket"),
    document.querySelector(".step-validation"),
    document.querySelector(".step-payment"),
    document.querySelector(".step-confirmation")
  ];

  if (circles !== null && progressBar !== null && buttons !== null) {
    let currentStep = 0;
    const maxStep = circles.length - 1;

    const updateSteps = (e) => {
      if (e.target.id === "next") {
        currentStep = Math.min(++currentStep, maxStep);
      } else if (e.target.id === "prev") {
        currentStep = Math.max(--currentStep, 0);
      };
    
      circles.forEach((circle, index) => {
        circle.classList[`${index <= currentStep ? "add" : "remove"}`]("active");
        circle.innerHTML = index < currentStep ? '<img src="./assets/img/icons/check.svg" alt="">' : index + 1;
      });
    
      progressBar.style.width = `${(currentStep / maxStep) * 100}%`;
    
      if (currentStep === maxStep) {
        document.querySelectorAll('.step-btn#next').forEach(btn => btn.disabled = true);
      } else if (currentStep === 0) {
        document.querySelectorAll('.step-btn#prev').forEach(btn => btn.disabled = true);
      } else {
        document.querySelectorAll('.step-btn').forEach(btn => btn.disabled = false);
      };
    
      steps.forEach((step, index) => {
        if (index === currentStep) {
          step.classList.remove("d-none");
        } else {
          step.classList.add("d-none");
        };
      });
    
      if (currentStep === maxStep) {
        circles.forEach((circle) => {
          circle.classList.add("active");
          circle.innerHTML = '<img src="./assets/img/icons/check.svg" alt="">';
        });
      };
    };
    
    buttons.forEach((button) => {
      button.addEventListener("click", updateSteps);
    });
  };

  /**
  * Tickets modal hidden
  */
  if (document.getElementById('ticket-modal')) {
    document.addEventListener('DOMContentLoaded', function () {
      var myModal = document.getElementById('ticket-modal');
      myModal.addEventListener('show.bs.modal', function () {
        var tickets = document.getElementById('tickets');
        tickets.classList.add('hidden');
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('modal-open');
  
        var map = document.getElementById('map');
        if (map) {
          map.style.display = 'none';
        };
      });
  
      myModal.addEventListener('shown.bs.modal', function () {
        var tickets = document.getElementById('tickets');
        tickets.style.display = 'none';
  
        var map = document.getElementById('map');
        if (map) {
          map.style.display = 'none';
        };
      });
  
      myModal.addEventListener('hide.bs.modal', function () {
        var tickets = document.getElementById('tickets');
        tickets.style.display = 'block';
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('modal-open');
        setTimeout(function() {
          tickets.classList.remove('hidden');
        }, 10);
  
        var map = document.getElementById('map');
        if (map) {
          map.style.display = 'block';
        };
      });
    });
  };

  /**
  * Login modal
  */
  if (document.getElementById('login-modal')) {
    document.addEventListener('DOMContentLoaded', function () {
      var myModal = document.getElementById('login-modal');
      myModal.addEventListener('show.bs.modal', function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('modal-open');
      });
    
      myModal.addEventListener('hide.bs.modal', function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('modal-open');
      });
    });
  };

  /**
  * User accordion close
  */
  if (document.getElementById('user-accordion')) {
    document.addEventListener('click', function(event) {
      var accordion = document.getElementById('user-accordion');
      if (!accordion.contains(event.target)) {
        var collapse = accordion.querySelector('.accordion-collapse');
        collapse.classList.remove('show');
      };
    });
  };

  /**
  * My tickets status activate
  */
  var btnAtivos = document.querySelector('.button-active') || null;
  var btnEncerrados = document.querySelector('.button-closed') || null;
  var activeCards = document.querySelector('.active-cards') || null;
  var closedCards = document.querySelector('.closed-cards') || null;

  if (btnAtivos !== null && btnEncerrados !== null && activeCards !== null && closedCards !== null) {
    btnAtivos.addEventListener('click', function() {
      btnAtivos.classList.add('btn-activate');
      btnEncerrados.classList.remove('btn-activate');
      activeCards.classList.add('show-status');
      closedCards.classList.remove('show-status');
    });
  
    btnEncerrados.addEventListener('click', function() {
      btnEncerrados.classList.add('btn-activate');
      btnAtivos.classList.remove('btn-activate');
      activeCards.classList.remove('show-status');
      closedCards.classList.add('show-status');
    });
  };

  /**
  * Password toggles
  */
  function togglePasswordVisibility(button) {
    var passwordInput = button.previousElementSibling;
    
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      button.innerHTML = "<i class='bi bi-eye'></i>";
    } else {
      passwordInput.type = "password";
      button.innerHTML = "<i class='bi bi-eye-slash'></i>";
    };
  };
  
  var toggleButtons = document.querySelectorAll(".toggle-password");
  
  if (toggleButtons.length > 0) {
    toggleButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        togglePasswordVisibility(button);
      });
    });
  };

  /**
  * Edit toggles
  */
  const toggleEditButtons = document.querySelectorAll('.toggle-edit') || null;
  if (toggleEditButtons.length > 0) {
    toggleEditButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        toggleDisabledClass(this);
      });
    });
  };

  const toggleEditRButtons = document.querySelectorAll('.toggle-edit-r') || null;
  if (toggleEditRButtons.length > 0) {
    toggleEditRButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        toggleDisabledClass(this);
      });
    });
  };

  function toggleDisabledClass(button) {
    const formGroup = button.parentNode;
    const input = formGroup.querySelector('input');
    input.classList.toggle('disabled');
  };

  /**
  * Select language buttons
  */
  if (document.querySelectorAll('.language-img').length > 0) {
    const languageButtons = document.querySelectorAll('.language-img');

    languageButtons.forEach(button => {
      button.addEventListener('click', function() {
        languageButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
      });
    });
  };

  /**
  * Login and logout
  */
  if (document.getElementById("login-form")) {
    document.getElementById("login-form").addEventListener("submit", function(event) {
      event.preventDefault();
      verificarCredenciais();
    });
  };

  // Login
  function verificarCredenciais() {
    var email = document.getElementById("input-email").value;
    var senha = document.getElementById("input-password").value;
  
    if (email === "user@email.com" && senha === "password") {
      document.getElementById("enter-btn").classList.remove("active");
      document.getElementById("navbtn-user").classList.add("active");
      var modal = document.getElementById("login-modal");
      var bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    } else {
      alert("Login ou Senha incorretos. Por favor, tente novamente.");
    };
  };
  
  // Logout
  if (document.getElementById("logout-link")) {
    document.getElementById("logout-link").addEventListener("click", function(event) {
      event.preventDefault();
      document.getElementById("navbtn-user").classList.remove("active");
      document.getElementById("enter-btn").classList.add("active");
    });
  };

  /**
  * Seat Map
  */
  const seats = document.querySelectorAll('.seat');
  if (seats.length > 0) {
    
    let selectedSeats = [];
    
    seats.forEach((seat) => {
      seat.addEventListener('click', (event) => {
        const seatNumber = event.target.innerText;
    
        if (event.target.classList.contains('selected')) {
          event.target.classList.remove('selected');
          event.target.classList.add('your');
        } else if (event.target.classList.contains('your')) {
          event.target.classList.remove('your');
          event.target.classList.add('reserved');
        } else if (event.target.classList.contains('reserved')) {
          event.target.classList.remove('reserved');
        } else {
          event.target.classList.add('selected');
        };
    
        if (selectedSeats.includes(seatNumber)) {
          selectedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
        } else {
          selectedSeats.push(seatNumber);
        };
      });
    });
  };
})();