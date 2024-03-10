document.addEventListener('DOMContentLoaded', function() {
  var pageName = document.body.getAttribute('data-name');
  var navLinks = document.querySelectorAll('nav a[data-active="' + pageName + '"]');
  
  navLinks.forEach(function(link) {
      link.classList.add('active');
  });
});