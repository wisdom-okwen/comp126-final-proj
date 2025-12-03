
'use strict';


document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initForms();
  initSmoothScroll();
  loadBooksFromOpenLibrary();
});


function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      const isExpanded = navMenu.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    
    document.addEventListener('click', function(event) {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
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
  const bookRequestForm = document.getElementById('bookRequestForm');
  if (bookRequestForm) {
    bookRequestForm.addEventListener('submit', handleBookRequest);
  }
  
  const availabilityForm = document.getElementById('availabilityForm');
  if (availabilityForm) {
    availabilityForm.addEventListener('submit', handleAvailabilityCheck);
  }
  
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
  
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', handleReviewForm);
  }
}

function handleBookRequest(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  if (!validateForm(form)) {
    return;
  }
  
  const successMessage = document.getElementById('requestSuccess');
  if (successMessage) {
    form.style.display = 'none';
    successMessage.classList.remove('hidden');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

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
  
  if (!validateForm(form)) {
    return;
  }
  
  console.log('Availability Check:');
  for (let [key, value] of formData.entries()) {
    console.log(`  ${key}: ${value}`);
  }
  
  const resultsSection = document.getElementById('availabilityResults');
  if (resultsSection) {
    form.style.display = 'none';
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

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
  
  if (!validateForm(form)) {
    return;
  }
  
  console.log('Contact Form Submitted:');
  for (let [key, value] of formData.entries()) {
    console.log(`  ${key}: ${value}`);
  }
  
  const successMessage = document.getElementById('contactSuccess');
  if (successMessage) {
    form.style.display = 'none';
    successMessage.classList.remove('hidden');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

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
  
  if (!validateForm(form)) {
    return;
  }
  
  console.log('Review Submitted:');
  for (let [key, value] of formData.entries()) {
    console.log(`  ${key}: ${value}`);
  }
  
  const successMessage = document.getElementById('reviewSuccess');
  if (successMessage) {
    form.style.display = 'none';
    successMessage.classList.remove('hidden');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

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
    field.classList.remove('error');
    
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('error');
      showFieldError(field, 'This field is required');
    }
    
    if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        field.classList.add('error');
        showFieldError(field, 'Please enter a valid email address');
      }
    }
    
    if (field.type === 'tel' && field.value.trim()) {
      const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
      if (!phoneRegex.test(field.value)) {
        isValid = false;
        field.classList.add('error');
        showFieldError(field, 'Please enter a valid phone number');
      }
    }
  });
  
  if (!isValid) {
    const firstError = form.querySelector('.error');
    if (firstError) {
      firstError.focus();
    }
  }
  
  return isValid;
}

function showFieldError(field, message) {
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  const errorElement = document.createElement('span');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  errorElement.style.cssText = 'color: #c62828; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
  field.parentNode.appendChild(errorElement);
  
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

function initBookSearch() {
  const searchInput = document.getElementById('bookSearch');
  const booksGrid = document.getElementById('booksGrid');
  const bookCount = document.getElementById('bookCount');
  const noResults = document.getElementById('noResults');
  
  if (!searchInput || !booksGrid) {
    return;
  }
  
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    const bookCards = booksGrid.querySelectorAll('.book-card');
    const totalBooks = bookCards.length;
    let visibleCount = 0;
    
    bookCards.forEach(function(card) {
      const title = card.getAttribute('data-title').toLowerCase();
      const authorEl = card.querySelector('.book-author');
      const author = authorEl ? authorEl.textContent.toLowerCase() : '';
      
      if (title.includes(searchTerm) || author.includes(searchTerm)) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });
    
    if (bookCount) {
      if (searchTerm === '') {
        bookCount.textContent = 'Showing all ' + totalBooks + ' books';
      } else {
        bookCount.textContent = 'Showing ' + visibleCount + ' of ' + totalBooks + ' books';
      }
    }
    
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

async function loadBooksFromOpenLibrary() {
  const booksGrid = document.getElementById('booksGrid');
  const loadingContainer = document.getElementById('loadingContainer');
  const bookCount = document.getElementById('bookCount');
  
  if (!booksGrid) {
    return;
  }
  
  const fallbackBooks = [
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', coverId: 8228691, year: 1960, genre: 'Fiction' },
    { title: '1984', author: 'George Orwell', coverId: 7222246, year: 1949, genre: 'Dystopian' },
    { title: 'Pride and Prejudice', author: 'Jane Austen', coverId: 8739161, year: 1813, genre: 'Romance' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', coverId: 7222161, year: 1925, genre: 'Fiction' },
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', coverId: 8231432, year: 1951, genre: 'Coming-of-age' },
    { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', coverId: 10521270, year: 1997, genre: 'Fantasy' },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', coverId: 8406786, year: 1937, genre: 'Fantasy' },
    { title: 'Brave New World', author: 'Aldous Huxley', coverId: 5765487, year: 1932, genre: 'Dystopian' },
    { title: 'The Alchemist', author: 'Paulo Coelho', coverId: 8769426, year: 1988, genre: 'Adventure' },
    { title: 'Jane Eyre', author: 'Charlotte Brontë', coverId: 8235308, year: 1847, genre: 'Gothic' },
    { title: 'Moby Dick', author: 'Herman Melville', coverId: 8227922, year: 1851, genre: 'Adventure' },
    { title: 'Little Women', author: 'Louisa May Alcott', coverId: 8260666, year: 1868, genre: 'Fiction' },
    { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', coverId: 9255566, year: 1954, genre: 'Fantasy' },
    { title: 'Animal Farm', author: 'George Orwell', coverId: 7222117, year: 1945, genre: 'Satire' },
    { title: 'The Chronicles of Narnia', author: 'C.S. Lewis', coverId: 8231993, year: 1950, genre: 'Fantasy' },
    { title: 'Fahrenheit 451', author: 'Ray Bradbury', coverId: 9274006, year: 1953, genre: 'Dystopian' },
    { title: 'Wuthering Heights', author: 'Emily Brontë', coverId: 8231086, year: 1847, genre: 'Gothic' },
    { title: 'The Odyssey', author: 'Homer', coverId: 8739968, year: -800, genre: 'Epic' },
    { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', coverId: 8231986, year: 1866, genre: 'Psychological' },
    { title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', coverId: 8231146, year: 1890, genre: 'Gothic' },
    { title: 'Frankenstein', author: 'Mary Shelley', coverId: 6788469, year: 1818, genre: 'Horror' },
    { title: 'Dracula', author: 'Bram Stoker', coverId: 8228635, year: 1897, genre: 'Horror' },
    { title: 'The Adventures of Sherlock Holmes', author: 'Arthur Conan Doyle', coverId: 8769272, year: 1892, genre: 'Mystery' },
    { title: 'A Tale of Two Cities', author: 'Charles Dickens', coverId: 8231153, year: 1859, genre: 'Historical' },
    { title: 'The Grapes of Wrath', author: 'John Steinbeck', coverId: 8228551, year: 1939, genre: 'Fiction' },
    { title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', coverId: 8235863, year: 1967, genre: 'Magical Realism' },
    { title: 'The Kite Runner', author: 'Khaled Hosseini', coverId: 8235957, year: 2003, genre: 'Drama' },
    { title: 'The Hunger Games', author: 'Suzanne Collins', coverId: 8769555, year: 2008, genre: 'Dystopian' }
  ];
  
  const requestedBooks = ['Pride and Prejudice', 'Harry Potter and the Sorcerer\'s Stone', 'Jane Eyre', 'The Hunger Games', 'Frankenstein', 'The Lord of the Rings'];
  
  const timeout = (ms) => new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  
  try {
    const fetchBooks = async () => {
      const bookPromises = fallbackBooks.map(async (fallback) => {
        try {
          const response = await fetch(
            `https://openlibrary.org/search.json?title=${encodeURIComponent(fallback.title)}&limit=1`
          );
          const data = await response.json();
          
          if (data.docs && data.docs.length > 0) {
            const book = data.docs[0];
            return {
              title: book.title || fallback.title,
              author: book.author_name ? book.author_name[0] : fallback.author,
              coverId: book.cover_i || fallback.coverId,
              firstPublishYear: book.first_publish_year || fallback.year,
              genre: fallback.genre,
              isRequested: requestedBooks.includes(fallback.title)
            };
          }
          return { ...fallback, firstPublishYear: fallback.year, isRequested: requestedBooks.includes(fallback.title) };
        } catch (error) {
          return { ...fallback, firstPublishYear: fallback.year, isRequested: requestedBooks.includes(fallback.title) };
        }
      });
      
      return await Promise.all(bookPromises);
    };
    
    let books;
    try {
      books = await Promise.race([fetchBooks(), timeout(5000)]);
    } catch (e) {
      console.log('API timeout, using fallback data');
      books = fallbackBooks.map(book => ({
        ...book,
        firstPublishYear: book.year,
        isRequested: requestedBooks.includes(book.title)
      }));
    }
    
    if (loadingContainer) {
      loadingContainer.classList.add('hidden');
    }
    
    booksGrid.innerHTML = books.map(book => createBookCard(book)).join('');
    
    if (bookCount) {
      bookCount.textContent = `Showing all ${books.length} books`;
    }
    
    initBookSearch();
    
  } catch (error) {
    console.error('Error loading books:', error);
    
    const books = fallbackBooks.map(book => ({
      ...book,
      firstPublishYear: book.year,
      isRequested: requestedBooks.includes(book.title)
    }));
    
    if (loadingContainer) {
      loadingContainer.classList.add('hidden');
    }
    
    booksGrid.innerHTML = books.map(book => createBookCard(book)).join('');
    
    if (bookCount) {
      bookCount.textContent = `Showing all ${books.length} books`;
    }
    
    initBookSearch();
  }
}

function createBookCard(book) {
  const coverUrl = book.coverId 
    ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
    : null;
  
  const statusClass = book.isRequested ? 'requested' : 'available';
  const statusText = book.isRequested ? 'Requested' : 'Available';
  const buttonClass = book.isRequested ? 'btn-secondary' : 'btn-primary';
  const buttonText = book.isRequested ? 'Join Waitlist' : 'Request Book';
  
  return `
    <article class="book-card" data-title="${book.title}" role="listitem">
      <div class="book-cover">
        ${coverUrl 
          ? `<img src="${coverUrl}" alt="Cover of ${book.title}" class="book-cover-img" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'book-cover-placeholder\\'>📚</div>'">`
          : `<div class="book-cover-placeholder">📚</div>`
        }
      </div>
      <div class="book-info">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">by ${book.author}</p>
        <div class="book-meta">
          <span class="book-genre">${book.genre}</span>
          <span class="book-status ${statusClass}">${statusText}</span>
        </div>
        ${book.firstPublishYear ? `<p class="book-year">First published: ${book.firstPublishYear}</p>` : ''}
        <a href="request.html" class="btn ${buttonClass} btn-small">${buttonText}</a>
      </div>
    </article>
  `;
}

window.loadBooksFromOpenLibrary = loadBooksFromOpenLibrary;

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
