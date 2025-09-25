// Simple scroll animation
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initialize fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Click spark effect
function createSpark(x, y) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.style.left = x + 'px';
    spark.style.top = (y + window.scrollY) + 'px';
    
    // Create multiple particles for the spark effect
    const particleCount = 12;  // more particles
    const colors = ['#63b3ed', '#4299e1', '#3182ce', '#2b77cb', '#ffffff'];  // brighter colors

    for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'spark-particle';

    // increase max distance to 70 for more spread
    const distance = Math.random() * 70 + 20; 
    const angle = (Math.PI * 2 / particleCount) * i;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    particle.style.setProperty('--spark-x', `${x}px`);
    particle.style.setProperty('--spark-y', `${y}px`);

    // Random color from improved palette
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    // Random size (6-8px)
    const size = Math.random() * 2 + 6;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    spark.appendChild(particle);
    }

    document.body.appendChild(spark);
    
    // Remove spark after animation completes
    setTimeout(() => {
        if (spark.parentNode) {
            spark.parentNode.removeChild(spark);
        }
    }, 600);
}

// Add click listener to document
document.addEventListener('click', (e) => {
    createSpark(e.clientX, e.clientY);
});

// Add touch support for mobile
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
        createSpark(e.touches[0].clientX, e.touches[0].clientY);
    }
});

// Image modal functionality
const chartData = {
    'placeholder1': {
        title: 'Exempt Vehicle Count',
        description: 'This is a bar graph representing the exempt vehicle count for each exempt vehicle type.',
        // Replace with actual image URL
        image: 'assets/images/exempt_vehicle_count.png'
    },
    'placeholder2': {
        title: 'Exemptions by Location',
        description: 'This is a bubble scatter plot that represents latitude and longitude coordinates to show the distribution of violation status by location.',
        image: 'assets/images/exempt_by_location.png'
    },
    'placeholder3': {
        title: 'Bike Ridership Map',
        description: 'This is a map that depicts bike ridership from January 2024 to January 2025',
        image:'assets/images/bike_graph.jpg'    
    },
    'placeholder4': {
        title: 'Bus Speed',
        description: 'This graph shows bus speed pre and post congestion pricing for numerous buses traveling through and in the CBD zone.',
        image: 'assets/images/bus_speed.png'
    },
    'placeholder5': {
        title: 'Pre Congestion',
        description: 'This is a bar graph showing the exempt vehicle violations pre-congestion pricing',
        image:'assets/images/exempt_pre_congestion.png'
    },
    'placeholder6': {
        title: 'Post Congestion',
        description: 'This is a bar graph showing the exempt vehicle violations post-congestion pricing',
        image: 'assets/images/exempt_post_congestion.png'
    },
    'placeholder7':{
        title:'CitiBike Speed',
        description:'This table depicts the bike speeds between the CBD zone and non-CBD areas from January 2024 to January 2025',
        image:'assets/images/citibike_speed.png',
    }
};

function openImageModal(chartId) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    const chart = chartData[chartId];
    if (chart) {
        modalImage.src = chart.image;
        modalImage.alt = chart.title;
        modalTitle.textContent = chart.title;
        modalDescription.textContent = chart.description;
        
        modal.classList.add('show');
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'auto';
    }
}

function closeImageModal(event) {
    const modal = document.getElementById('imageModal');
    const modalContent = document.querySelector('.modal-content');
    
    // Only close if clicking outside the modal content or on the close button
    if (event.target === modal || event.target.classList.contains('modal-close')) {
        modal.classList.remove('show');
        // Restore body scroll
        document.body.style.overflow = 'auto';
    }
}

// Toggle modal info functionality
function toggleModalInfo() {
    const modalInfo = document.getElementById('modalInfo');
    const modalContent = document.querySelector('.modal-content');
    const toggleText = document.getElementById('toggleText');
    
    console.log('Toggle button clicked'); // Debug log
    
    if (modalInfo.classList.contains('hidden')) {
        // Show info
        modalInfo.classList.remove('hidden');
        modalContent.classList.remove('info-hidden');
        toggleText.textContent = 'Hide Info';
        console.log('Showing info'); // Debug log
    } else {
        // Hide info
        modalInfo.classList.add('hidden');
        modalContent.classList.add('info-hidden');
        toggleText.textContent = 'Show Info';
        console.log('Hiding info'); // Debug log
    }
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('imageModal');
        if (modal.classList.contains('show')) {
            closeImageModal({ target: modal });
        }
    }
});