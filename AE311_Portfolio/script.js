/**
 * ===============================
 * DESIGN THINKING PORTFOLIO - JAVASCRIPT
 * ===============================
 * 
 * Core Functionality:
 * 1. Single Page Application (SPA) project switching
 * 2. Welcome banner management with smooth animations
 * 3. Side menu navigation within projects
 * 4. Responsive state management
 * 
 * Key Functions:
 * - showProject(targetId): Switches between main projects
 * - scrollToSection(sectionId): Navigates within project content
 * - hideBanner(): Manages welcome screen transition
 */

// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================
    // DOM ELEMENT REFERENCES
    // ===============================
    const navLinks = document.querySelectorAll('.sticky-header nav a');     // Top navigation links
    const projectSections = document.querySelectorAll('.project-section');  // All project containers
    const menuLinks = document.querySelectorAll('.project-section aside.menu a'); // Side menu links
    
    // Only show first project if banner is already hidden (page refresh scenario)
    if (document.body.classList.contains('banner-hidden')) {
        showProject('#project_1');
    }
    
    // ===============================
    // CORE NAVIGATION FUNCTIONS
    // ===============================
    
    /**
     * Shows a specific project and hides all others
     * @param {string} targetId - CSS selector for target project (e.g., '#project_1')
     */
    function showProject(targetId) {
        // Hide all project sections
        projectSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active state from all navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Remove active state from all side menu links
        menuLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Show the target project section
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Highlight the corresponding navigation link
        const activeLink = document.querySelector(`.sticky-header a[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    /**
     * Scrolls to a specific section within the active project's article
     * @param {string} sectionId - CSS selector for target section (e.g., '#project_1-research')
     */
    function scrollToSection(sectionId) {
        const targetSection = document.querySelector(sectionId);
        const article = document.querySelector('.project-section.active article');
        
        if (targetSection && article) {
            // Calculate scroll position with offset for better visibility
            const scrollPosition = targetSection.offsetTop - 60; // 60px offset to show section header
            
            // Smooth scroll within the article container
            article.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
            
            // Update active state in side menu
            menuLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Highlight the current menu item
            const activeMenuLink = document.querySelector(`.project-section.active aside.menu a[href="${sectionId}"]`);
            if (activeMenuLink) {
                activeMenuLink.classList.add('active');
            }
        }
    }
    
    // ===============================
    // EVENT LISTENERS
    // ===============================
    
    // Top navigation clicks (project switching)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            showProject(targetId);
            
            // Optional: Smooth scroll to main content area
            document.querySelector('main').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Side menu clicks (within-project navigation)
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId);
        });
    });
    
    // Default project display (fallback if banner is skipped)
    if (projectSections.length > 0) {
        showProject('#project_1');
    }
    
    // Banner scroll icon click handler
    const scrollIcon = document.querySelector('.scroll-icon');
    if (scrollIcon) {
        scrollIcon.addEventListener('click', function(e) {
            e.preventDefault();
            hideBanner(); // Trigger banner hide animation
        });
    }
});

/**
 * ===============================
 * BANNER MANAGEMENT SYSTEM
 * ===============================
 * 
 * Handles the sophisticated welcome banner that appears on page load
 * and smoothly disappears when user is ready to enter the portfolio.
 * 
 * Animation Sequence:
 * 1. Banner slides up and fades out (CSS transition)
 * 2. Body scrolling is enabled
 * 3. First project becomes active
 * 4. Banner is removed from DOM after animation completes
 */

/**
 * Hides the welcome banner and initializes the portfolio
 * Called when user clicks the scroll icon in the banner
 */
function hideBanner() {
    const banner = document.querySelector('.fullscreen-banner');
    const body = document.body;
    
    if (banner) {
        // Trigger CSS animation (banner slides up)
        banner.classList.add('hidden');
        
        // Enable page scrolling
        body.classList.add('banner-hidden');
        
        // Wait for animation to start, then show first project
        setTimeout(() => {
            const firstProject = document.querySelector('#project_1');
            if (firstProject) {
                firstProject.classList.add('active');
                
                // Activate corresponding navigation link
                const firstNavLink = document.querySelector('.sticky-header a[href="#project_1"]');
                if (firstNavLink) {
                    firstNavLink.classList.add('active');
                }
            }
        }, 600); // 600ms delay for smooth transition
        
        // Remove banner from DOM after animation completes
        setTimeout(() => {
            banner.style.display = 'none';
        }, 1200); // 1200ms matches CSS transition duration
    }
}

/**
 * ===============================
 * DEVELOPMENT UTILITIES
 * ===============================
 * 
 * Uncomment these functions in the browser console for debugging:
 * 
 * // Check what project is currently active
 * console.log(document.querySelector('.project-section.active'));
 * 
 * // Check banner state
 * console.log(document.body.classList.contains('banner-hidden'));
 * 
 * // Force show a specific project
 * showProject('#project_2');
 * 
 * // Test banner hide function
 * hideBanner();
 */

/* ===============================
   SECURITY & CONTENT PROTECTION
   =============================== */

/**
 * Initialize content protection measures
 * Implements basic security features while maintaining accessibility
 */
function initializeContentProtection() {
  
  // Disable right-click on images and sensitive content
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });
    
    // Disable drag and drop on images
    img.addEventListener('dragstart', function(e) {
      e.preventDefault();
      return false;
    });
  });
  
  // Keyboard shortcut protection
  document.addEventListener('keydown', function(e) {
    // Disable Ctrl+A (Select All) on portfolio content when not focused
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
      const target = e.target.closest('.project-section');
      if (target && !target.matches(':focus-within')) {
        e.preventDefault();
        return false;
      }
    }
    
    // Disable common developer tool shortcuts (basic deterrent)
    if (e.key === 'F12' || 
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') ||
        ((e.ctrlKey || e.metaKey) && e.key === 'u')) {
      e.preventDefault();
      return false;
    }
  });
}

/**
 * Basic developer tools detection
 * Acts as a deterrent and displays copyright notice
 */
function initializeDevToolsDetection() {
  let devtools = false;
  
  setInterval(() => {
    if (window.outerHeight - window.innerHeight > 160 || 
        window.outerWidth - window.innerWidth > 160) {
      if (!devtools) {
        devtools = true;
        console.clear();
        console.log('%c⚠️ Portfolio Protected by Copyright', 
          'color: #ff6b6b; font-size: 18px; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);');
        console.log('%c© 2025 Daniela Gallegos Dupuis - All Rights Reserved', 
          'color: #4ecdc4; font-size: 14px; font-weight: bold;');
        console.log('%cThis portfolio showcases original design thinking work.', 
          'color: #45b7d1; font-size: 12px;');
        console.log('%cUnauthorized copying or reproduction is prohibited.', 
          'color: #96ceb4; font-size: 12px;');
      }
    } else {
      devtools = false;
    }
  }, 2000);
}

/**
 * Input sanitization utility
 * @param {string} input - String to sanitize
 * @returns {string} - HTML-safe string
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * URL validation utility
 * @param {string} url - URL to validate
 * @returns {boolean} - True if URL is safe
 */
function isValidURL(url) {
  try {
    const urlObj = new URL(url);
    return ['https:', 'http:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

// ===============================
// PRINT FUNCTIONALITY
// ===============================

/**
 * Prints a specific project with professional formatting - completely behind the scenes
 * @param {string} projectId - ID of the project to print (e.g., 'project_1')
 */
function printProject(projectId) {
    // Get the project section
    const projectSection = document.getElementById(projectId);
    if (!projectSection) {
        console.error(`Project ${projectId} not found`);
        return;
    }
    
    // Get the project title
    const projectTitle = projectSection.querySelector('h2')?.textContent || `Project ${projectId.split('_')[1]}`;
    
    // Get the article element
    const article = projectSection.querySelector('article');
    if (!article) {
        console.error('Article element not found');
        return;
    }
    
    // Clone the article content to avoid any DOM manipulation of the original
    const articleClone = article.cloneNode(true);
    
    // Remove print buttons from the clone
    const printButtons = articleClone.querySelectorAll('.print-button');
    printButtons.forEach(button => button.remove());
    
    // Create a completely isolated print document
    const printContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${projectTitle} - Daniela Gallegos Dupuis Portfolio</title>
            <style>
                /* Complete print-only styles - no impact on main page */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    margin: 0;
                    padding: 40px;
                    background: white !important;
                    color: black !important;
                    font-family: "Times New Roman", serif;
                    font-size: 12pt;
                    line-height: 1.6;
                    max-width: none;
                    width: 100%;
                }
                
                .print-header {
                    text-align: center;
                    margin-bottom: 40px;
                    border-bottom: 2px solid black;
                    padding-bottom: 20px;
                    page-break-after: avoid;
                }
                
                .print-header h1 {
                    margin: 0 0 15px 0;
                    font-size: 24pt;
                    font-weight: bold;
                    color: black !important;
                }
                
                .print-header .meta {
                    margin: 0;
                    font-size: 12pt;
                    color: #333 !important;
                    line-height: 1.4;
                }
                
                .print-content {
                    max-width: none;
                    width: 100%;
                }
                
                /* Typography */
                h1, h2 { 
                    font-size: 20pt !important; 
                    font-weight: bold !important; 
                    margin: 30pt 0 15pt 0 !important; 
                    color: black !important; 
                    page-break-after: avoid; 
                }
                
                h3 { 
                    font-size: 16pt !important; 
                    font-weight: bold !important; 
                    margin: 20pt 0 10pt 0 !important; 
                    color: black !important; 
                    page-break-after: avoid; 
                }
                
                h4 { 
                    font-size: 14pt !important; 
                    font-weight: bold !important; 
                    margin: 15pt 0 8pt 0 !important; 
                    color: black !important; 
                    page-break-after: avoid; 
                }
                
                p { 
                    margin-bottom: 12pt !important; 
                    text-align: justify; 
                    orphans: 2; 
                    widows: 2; 
                    color: black !important; 
                    font-size: 12pt !important;
                    line-height: 1.6 !important;
                }
                
                /* Images */
                img { 
                    max-width: 100% !important; 
                    height: auto !important; 
                    page-break-inside: avoid; 
                    margin: 15pt auto !important; 
                    display: block !important;
                    border: 1pt solid #ccc; 
                }
                
                .image-caption { 
                    font-size: 10pt !important; 
                    font-style: italic; 
                    text-align: center; 
                    margin: 5pt 0 15pt 0 !important; 
                    color: #666 !important; 
                }
                
                /* Lists */
                ul, ol { 
                    margin-bottom: 12pt !important; 
                    page-break-inside: avoid; 
                    padding-left: 20pt;
                }
                
                li { 
                    margin-bottom: 6pt !important; 
                    color: black !important; 
                    font-size: 12pt !important;
                }
                
                /* Links */
                a { 
                    color: #0066cc !important; 
                    text-decoration: underline; 
                }
                
                a[href^="http"]:after { 
                    content: " (" attr(href) ")"; 
                    font-size: 10pt; 
                    color: #666; 
                }
                
                /* Text formatting */
                strong { 
                    font-weight: bold !important; 
                    color: black !important; 
                }
                
                em { 
                    font-style: italic !important; 
                    color: black !important; 
                }
                
                /* Sections */
                section { 
                    margin-bottom: 25pt !important; 
                    page-break-inside: avoid; 
                    display: block !important;
                    visibility: visible !important;
                }
                
                hr { 
                    border: none; 
                    border-top: 1pt solid black; 
                    margin: 20pt 0 !important; 
                    page-break-after: avoid; 
                }
                
                /* Hide any remaining UI elements */
                .print-button, .menu, nav, header, footer, aside {
                    display: none !important;
                }
                
                /* Page setup */
                @page {
                    margin: 1in;
                    size: letter;
                    @top-center {
                        content: "Daniela Gallegos Dupuis - Design Thinking Portfolio";
                        font-size: 10pt;
                        color: #666;
                    }
                    @bottom-center {
                        content: counter(page);
                        font-size: 10pt;
                        color: #666;
                    }
                }
                
                /* Ensure all content is visible */
                * {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
            </style>
        </head>
        <body>
            <div class="print-header">
                <h1>${projectTitle}</h1>
                <div class="meta">
                    <strong>Student:</strong> Daniela Gallegos Dupuis<br>
                    <strong>Course:</strong> AE 311 Design Thinking<br>
                    <strong>Institution:</strong> University Name<br>
                    <strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </div>
            </div>
            
            <div class="print-content">
                ${articleClone.innerHTML}
            </div>
        </body>
        </html>
    `;
    
    // Create hidden iframe for printing (completely invisible)
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'absolute';
    printFrame.style.top = '-9999px';
    printFrame.style.left = '-9999px';
    printFrame.style.width = '0px';
    printFrame.style.height = '0px';
    printFrame.style.border = 'none';
    printFrame.style.visibility = 'hidden';
    
    // Add iframe to document
    document.body.appendChild(printFrame);
    
    // Write content to iframe
    const frameDoc = printFrame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(printContent);
    frameDoc.close();
    
    // Wait for content to load, then print
    printFrame.onload = function() {
        setTimeout(() => {
            try {
                printFrame.contentWindow.focus();
                printFrame.contentWindow.print();
                
                // Clean up - remove iframe after printing
                setTimeout(() => {
                    if (printFrame.parentNode) {
                        document.body.removeChild(printFrame);
                    }
                }, 1000);
            } catch (error) {
                console.error('Print error:', error);
                // Clean up on error
                if (printFrame.parentNode) {
                    document.body.removeChild(printFrame);
                }
            }
        }, 500);
    };
    
    // Fallback cleanup
    setTimeout(() => {
        if (printFrame.parentNode) {
            document.body.removeChild(printFrame);
        }
    }, 10000);
}

// Make printProject function globally available
window.printProject = printProject;

// Initialize security measures
initializeContentProtection();
initializeDevToolsDetection();

console.log('%cDesign Thinking Portfolio Loaded Successfully! 🎨', 
  'color: #6c5ce7; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with: HTML5, CSS3, Vanilla JavaScript', 
  'color: #a29bfe; font-size: 12px;');
