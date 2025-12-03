
'use strict';


document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initForms();
  initSmoothScroll();
  initBookSearch();
});


function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    // Toggle mobile menu on button click
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Update ARIA attribute for accessibility
      const isExpanded = navMenu.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }
}

function initForms() {
  // Book Request Form
  const bookRequestForm = document.getElementById('bookRequestForm');
  if (bookRequestForm) {
    bookRequestForm.addEventListener('submit', handleBookRequest);
  }
  
  // Availability Form
  const availabilityForm = document.getElementById('availabilityForm');
  if (availabilityForm) {
    availabilityForm.addEventListener('submit', handleAvailabilityCheck);
  }
  
  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
  
  // Review Form
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', handleReviewForm);
  }
}

function handleBookRequest(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  // Validate form
  if (!validateForm(form)) {
    return;
  }
  
  // Log form data (in production, this would be sent to a server)
  console.log('Book Request Submitted:');
  for (let [key, value] of formData.entries()) {
    console.log(`  ${key}: ${value}`);
  }
  
  // Show success message
  const successMessage = document.getElementById('requestSuccess');
  if (successMessage) {
    form.style.display = 'none';
    successMessage.classList.remove('hidden');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Reset Book Request Form
function resetRequestForm() {
  const form = document.getElementById('bookRequestForm');
  const successMessage = document.getElementById('requestSuccess');
  
  if (form && successMessage) {
    form.reset();
    form.style.display = 'block';
    successMessage.classList.add('hidden');
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function handleAvailabilityCheck(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  // Validate form
  if (!validateForm(form)) {
    return;
  }
  
  // Log form data
  console.log('Availability Check:');
  for (let [key, value] of formData.entries()) {
    console.log(`  ${key}: ${value}`);
  }
  
  // Show availability results
  const resultsSection = document.getElementById('availabilityResults');
  if (resultsSection) {
    form.style.display = 'none';
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Reset Availability Form
function resetAvailabilityForm() {
  const form = document.getElementById('availabilityForm');
  const resultsSection = document.getElementById('availabilityResults');
  
  if (form && resultsSection) {
    form.reset();
    form.style.display = 'block';
    resultsSection.classList.add('hidden');
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function handleContactForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  // Validate form
  if (!validateForm(form)) {
    return;
  }
  
  // Log form data
  console.log('Contact Form Submitted:');
  for (let [key, value] of formData.entries()) {
    console.log(`  ${key}: ${value}`);
  }
  
  // Show success message
  const successMessage = document.getElementById('contactSuccess');
  if (successMessage) {
    form.style.display = 'none';
    successMessage.classList.remove('hidden');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Reset Contact Form
function resetContactForm() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('contactSuccess');
  
  if (form && successMessage) {
    form.reset();
    form.style.display = 'block';
    successMessage.classList.add('hidden');
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


function handleReviewForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  // Validate form
  if (!validateForm(form)) {
    return;
  }
  
  // Log form data
  console.log('Review Submitted:');
  for (let [key, value] of formData.entries()) {
    console.log(`  ${key}: ${value}`);
  }
  
  // Show success message
  const successMessage = document.getElementById('reviewSuccess');
  if (successMessage) {
    form.style.display = 'none';
    successMessage.classList.remove('hidden');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Reset Review Form
function resetReviewForm() {
  const form = document.getElementById('reviewForm');
  const successMessage = document.getElementById('reviewSuccess');
  
  if (form && successMessage) {
    form.reset();
    form.style.display = 'block';
    successMessage.classList.add('hidden');
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(function(field) {
    // Remove previous error styling
    field.classList.remove('error');
    
    // Check if field is empty
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('error');
      showFieldError(field, 'This field is required');
    }
    
    // Validate email format
    if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        field.classList.add('error');
        showFieldError(field, 'Please enter a valid email address');
      }
    }
    
    // Validate phone format (basic validation)
    if (field.type === 'tel' && field.value.trim()) {
      const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
      if (!phoneRegex.test(field.value)) {
        isValid = false;
        field.classList.add('error');
        showFieldError(field, 'Please enter a valid phone number');
      }
    }
  });
  
  // Focus first error field
  if (!isValid) {
    const firstError = form.querySelector('.error');
    if (firstError) {
      firstError.focus();
    }
  }
  
  return isValid;
}

// Show field error message
function showFieldError(field, message) {
  // Remove existing error message
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Create and append error message
  const errorElement = document.createElement('span');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  errorElement.style.cssText = 'color: #c62828; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
  field.parentNode.appendChild(errorElement);
  
  // Remove error on input
  field.addEventListener('input', function() {
    field.classList.remove('error');
    const error = field.parentNode.querySelector('.error-message');
    if (error) {
      error.remove();
    }
  }, { once: true });
}


function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(function(link) {
    link.addEventListener('click', function(event) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') {
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        event.preventDefault();
        
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

(function addErrorStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
      border-color: #c62828 !important;
      background-color: #ffebee;
    }
    
    .form-group input.error:focus,
    .form-group select.error:focus,
    .form-group textarea.error:focus {
      box-shadow: 0 0 0 3px rgba(198, 40, 40, 0.1) !important;
    }
  `;
  document.head.appendChild(style);
})();

window.resetRequestForm = resetRequestForm;
window.resetAvailabilityForm = resetAvailabilityForm;
window.resetContactForm = resetContactForm;
window.resetReviewForm = resetReviewForm;

// Book Search Functionality
function initBookSearch() {
  const searchInput = document.getElementById('bookSearch');
  const booksGrid = document.getElementById('booksGrid');
  const bookCount = document.getElementById('bookCount');
  const noResults = document.getElementById('noResults');
  
  if (!searchInput || !booksGrid) {
    return;
  }
  
  const bookCards = booksGrid.querySelectorAll('.book-card');
  const totalBooks = bookCards.length;
  
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    let visibleCount = 0;
    
    bookCards.forEach(function(card) {
      const title = card.getAttribute('data-title').toLowerCase();
      const author = card.querySelector('.book-author').textContent.toLowerCase();
      
      // Check if title or author matches search term
      if (title.includes(searchTerm) || author.includes(searchTerm)) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });
    
    // Update count display
    if (bookCount) {
      if (searchTerm === '') {
        bookCount.textContent = 'Showing all ' + totalBooks + ' books';
      } else {
        bookCount.textContent = 'Showing ' + visibleCount + ' of ' + totalBooks + ' books';
      }
    }
    
    // Show/hide no results message
    if (noResults) {
      if (visibleCount === 0 && searchTerm !== '') {
        noResults.classList.remove('hidden');
        booksGrid.style.display = 'none';
      } else {
        noResults.classList.add('hidden');
        booksGrid.style.display = '';
      }
    }
  });
}

// Clear Search
function clearSearch() {
  const searchInput = document.getElementById('bookSearch');
  const booksGrid = document.getElementById('booksGrid');
  const bookCards = document.querySelectorAll('.book-card');
  const bookCount = document.getElementById('bookCount');
  const noResults = document.getElementById('noResults');
  
  if (searchInput) {
    searchInput.value = '';
    searchInput.focus();
  }
  
  bookCards.forEach(function(card) {
    card.classList.remove('hidden');
  });
  
  if (booksGrid) {
    booksGrid.style.display = '';
  }
  
  if (noResults) {
    noResults.classList.add('hidden');
  }
  
  if (bookCount) {
    bookCount.textContent = 'Showing all ' + bookCards.length + ' books';
  }
}

window.clearSearch = clearSearch;
