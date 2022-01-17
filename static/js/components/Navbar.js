import LogoSVG from './LogoSVG.js';

const lesserLgTabletWidth = 900;
let navbarOpen = false;

window.onload = () => {
  determineNavbarType();
  document.querySelector('.nav-logo').innerHTML += LogoSVG();
};

window.addEventListener('resize', () => {
  determineNavbarType();
});

function determineNavbarType() {
  if (smallScreenWidth()) {
    return collapsedNavbar();
  }
  return fullLengthNavbar();
}

function smallScreenWidth() {
  const width = window.innerWidth;

  if (width <= lesserLgTabletWidth) {
    return true;
  }
  return false;
}

function collapsedNavbar() {
  const navbar = document.querySelector('.navbar');
  const menuBtn = document.querySelector('.collapsed-nav-btn');

  navbar.classList.remove('wide-screen');
  navbar.classList.add('thin-screen', 'navbar-closed');

  if (menuBtn !== null) {
    menuBtn.parentElement.removeChild(menuBtn);
  }
  navbar.innerHTML += `
  <div class="collapsed-nav-btn">
    <div class="menu-bar"></div>
  </div>
  `;

  document.addEventListener('click', determineNavabarMenuState);
}

function determineNavabarMenuState(e) {
  const navbar = document.querySelector('.navbar');
  const navElements = navbar.children;
  const menuBtn = document.querySelector('.collapsed-nav-btn');
  const menuBar = document.querySelector('.menu-bar');

  if (e.target === menuBtn || e.target === menuBar) {
    toggleNavbarMenu();
    navbarOpen = !navbarOpen;
  } else {
    for (let navElement of navElements) {
      if (e.target !== navElement && e.target.parentElement !== navbar) {
        navbarOpen = true;
        toggleNavbarMenu();
        navbarOpen = false;
        return;
      }
    }
  }
}

function toggleNavbarMenu() {
  if (navbarOpen) {
    closeCollapsedNavbar();
  } else {
    openCollapsedNavbar();
  }
}

function fullLengthNavbar() {
  const navbar = document.querySelector('.navbar');
  const menuBtn = document.querySelector('.collapsed-nav-btn');

  navbar.classList.remove('thin-screen', 'navbar-closed', 'navbar-open');
  navbar.classList.add('wide-screen');

  if (menuBtn !== null) {
    menuBtn.parentElement.removeChild(menuBtn);
  }
  document.removeEventListener('click', determineNavabarMenuState);
}

function openCollapsedNavbar() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.remove('navbar-closed');
  navbar.classList.add('navbar-open');
}

function closeCollapsedNavbar() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.remove('navbar-open');
  navbar.classList.add('navbar-closed');
}
