var nav = document.querySelector(".navbar-sticky");
if (nav) {
  var body = document.body;
  var navHeadroom = new Headroom(nav, {
    tolerance: 5,
    offset: body.classList.contains(".has-navigation-banner") ? 114 : 70
  });
  navHeadroom.init();
}

function adFader(_, element) {
  var elementTop = $(element).offset().top;
  var elementBottom = elementTop + $(element).outerHeight(true);

  function refresh() {
    var scrollTop = $(window).scrollTop();
    var scrollBottom = $(window).scrollTop() + $(window).height();
    var topBottomCenter = (scrollBottom - scrollTop) / 2
    var scrollCenter = scrollTop + topBottomCenter;

    if (elementTop > scrollCenter) {
      $(element).css('background-color', 'rgba(250, 250, 250, 1)')
    } else if (elementBottom < scrollCenter) {
      var blub = elementBottom - scrollTop;
      var value = 1 - Math.min(blub / topBottomCenter, 1);
      $(element).css('background-color', 'rgba(220, 220, 220 , ' + value + ')')
    } else {
      $(element).css('background-color', 'rgba(220, 220, 220, 0)')
    }
  }

  refresh()
  $(window).scroll(refresh);
}

// Technical Review Log Collapsible Functionality
function initTechnicalReviewCollapse() {
  // Find all h2 elements that contain the technical review log text
  const reviewHeaders = document.querySelectorAll('h2');
  
  reviewHeaders.forEach(header => {
    const headerText = header.textContent.trim();
    if (headerText.includes('🔍 Technical Review Log') || headerText.includes('Technical Review Log')) {
      // Create collapsible structure
      const collapseId = 'technical-review-collapse-' + Math.random().toString(36).substr(2, 9);
      
      // Create wrapper for the entire section
      const sectionWrapper = document.createElement('div');
      sectionWrapper.className = 'technical-review-section';
      
      // Create the collapse button (this will replace the header)
      const collapseButton = document.createElement('button');
      collapseButton.className = 'btn btn-outline-secondary btn-sm w-100 text-start';
      collapseButton.type = 'button';
      collapseButton.setAttribute('data-bs-toggle', 'collapse');
      collapseButton.setAttribute('data-bs-target', '#' + collapseId);
      collapseButton.setAttribute('aria-expanded', 'false');
      collapseButton.setAttribute('aria-controls', collapseId);
      collapseButton.innerHTML = '<i class="fa fa-eye me-2"></i>Technical Review anzeigen';
      
      // Add click handler to update button text
      collapseButton.addEventListener('click', function() {
        setTimeout(() => {
          const isExpanded = this.getAttribute('aria-expanded') === 'true';
          this.innerHTML = isExpanded 
            ? '<i class="fa fa-eye-slash me-2"></i>Technical Review ausblenden' 
            : '<i class="fa fa-eye me-2"></i>Technical Review anzeigen';
        }, 350); // Wait for Bootstrap animation
      });
      
      // Find all content after this header until the next h1 or h2
      const contentElements = [header]; // Include the header itself
      let nextElement = header.nextElementSibling;
      
      while (nextElement && !['H1', 'H2'].includes(nextElement.tagName)) {
        contentElements.push(nextElement);
        nextElement = nextElement.nextElementSibling;
      }
      
      if (contentElements.length > 0) {
        // Create collapse wrapper
        const collapseWrapper = document.createElement('div');
        collapseWrapper.className = 'collapse';
        collapseWrapper.id = collapseId;
        
        // Move all content elements (including header) into the collapse wrapper
        contentElements.forEach(element => {
          collapseWrapper.appendChild(element);
        });
        
        // Insert the section wrapper and button before the original header position
        header.parentNode.insertBefore(sectionWrapper, header);
        sectionWrapper.appendChild(collapseButton);
        sectionWrapper.appendChild(collapseWrapper);
      }
    }
  });
}

$(document).ready(function () {
  $('[ad-fader]').each(adFader);

  // Initialize technical review log collapse functionality
  initTechnicalReviewCollapse();
});

