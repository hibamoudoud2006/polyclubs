let clubsData = [];
let currentUser = null;

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.querySelector('.nav-links');
    
    if(menuIcon) {
        menuIcon.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuIcon.classList.toggle('open');
        });
    }
    
    loadFallbackClubs();
    setupFormSubmission();
});

function loadFallbackClubs() {
    clubsData = [
        {
            id: 1,
            name: 'Club Enactus',
            image: 'les images/enactus.png',
            detailPage: 'enactus.html'
        },
        {
            id: 2,
            name: 'Club Jeune pour les jeunes',
            image: 'les images/jpj loho.png',
            detailPage: 'jpj.html'
        },
        {
            id: 3,
            name: 'Club Pour elle',
            image: 'les images/pourelle.png',
            detailPage: 'pourelle.html'
        },
        {
            id: 4,
            name: 'Club sportif',
            image: 'les images/sport.png',
            detailPage: 'sport.html'
        },
        {
            id: 5,
            name: 'Club Anarouz',
            image: 'les images/anarouzz.png',
            detailPage: 'anarouzz.html'
        },
        {
            id: 6,
            name: 'Club de soutien et d\'orientation pédagogique',
            image: 'les images/CSOP.png',
            detailPage: 'csop.html'
        },
        {
            id: 7,
            name: 'Club soft skils',
            image: 'les images/soft.png',
            detailPage: 'soft.html'
        },
        {
            id: 8,
            name: 'Club inalgora',
            image: 'les images/inalgora.png',
            detailPage: 'inalgora.html'
        }
    ];
    
    displayClubs(clubsData);
}

function displayClubs(clubs) {
    const clubsContainer = document.querySelector('.clubs-container');
    
    if (!clubsContainer) return;
    
    clubsContainer.innerHTML = '';
    
    clubs.forEach(club => {
        const clubCard = document.createElement('div');
        clubCard.className = 'club-card';
        clubCard.innerHTML = `
            <div class="club-img" style="background-image: url('${club.image}');"></div>
            <div class="club-info">
                <h3>${club.name}</h3>
                <a href="${club.detailPage}" target="_blank" class="btn">Plus d'informations</a>
            </div>
        `;
        clubsContainer.appendChild(clubCard);
    });
}

function searchClubs(query) {
    query = query.toLowerCase().trim();
    
    if (!query) {
        displayClubs(clubsData);
        return;
    }
    
    const filteredClubs = clubsData.filter(club => 
        club.name.toLowerCase().includes(query)
    );
    
    displayClubs(filteredClubs);
    
    const clubsContainer = document.querySelector('.clubs-container');
    if (filteredClubs.length === 0 && clubsContainer) {
        clubsContainer.innerHTML = `
            <div class="no-results">
                <p>Aucun club ne correspond à votre recherche "${query}"</p>
            </div>
        `;
    }
}

function setupFormSubmission() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            if (!validateForm(formDataObj)) {
                return;
            }
            
            showNotification('Formulaire soumis avec succès (mode hors ligne)', 'success');
            contactForm.reset();
        });
    }
}

function validateForm(formData) {
    if (!formData.nom || formData.nom.trim() === '') {
        showNotification('Veuillez entrer votre nom', 'error');
        return false;
    }
    
    if (!formData.prenom || formData.prenom.trim() === '') {
        showNotification('Veuillez entrer votre prénom', 'error');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        showNotification('Veuillez entrer une adresse email valide', 'error');
        return false;
    }
    
    if (formData.telephone) {
        const phoneRegex = /^(\+\d{1,3})?\s?\d{8,}$/;
        if (!phoneRegex.test(formData.telephone)) {
            showNotification('Veuillez entrer un numéro de téléphone valide', 'error');
        return false;
        }
    }
    
    return true;
}

function showNotification(message, type = 'info') {
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
        
        Object.assign(notificationContainer.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: '1000'
        });
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        padding: '12px 20px',
        marginBottom: '10px',
        borderRadius: '5px',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
        color: '#fff',
        fontWeight: '500',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });
    
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            notification.style.backgroundColor = '#F44336';
            break;
        default:
            notification.style.backgroundColor = '#2196F3';
    }
    
    notificationContainer.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    setupSmoothScrolling();
    setupScrollAnimations();
    addSearchBar();
});

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                const navLinks = document.querySelector('.nav-links');
                const menuIcon = document.getElementById('menu-icon');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (menuIcon) menuIcon.classList.remove('open');
                }
            }
        });
    });
}

function setupScrollAnimations() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.club-card, .section-title, .about-us');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .club-card, .section-title, .about-us {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
            .animate {
                opacity: 1;
                transform: translateY(0);
            }
        </style>
    `);
    
    window.addEventListener('scroll', animateOnScroll);
    setTimeout(animateOnScroll, 100);
}

function addSearchBar() {
    const clubsSection = document.getElementById('clubs');
    
    if (clubsSection) {
        const sectionTitle = clubsSection.querySelector('.section-title');
        
        if (sectionTitle) {
            const searchBar = document.createElement('div');
            searchBar.className = 'search-bar';
            searchBar.innerHTML = `
                <input type="text" id="club-search" placeholder="Rechercher un club...">
                <button id="search-btn"><i class="fa-solid fa-search"></i></button>
            `;
            
            sectionTitle.appendChild(searchBar);
            
            const style = document.createElement('style');
            style.textContent = `
                .search-bar {
                    display: flex;
                    max-width: 400px;
                    margin: 20px auto 0;
                }
                .search-bar input {
                    flex: 1;
                    padding: 10px 15px;
                    border: 1px solid #ddd;
                    border-radius: 30px 0 0 30px;
                    font-size: 16px;
                    outline: none;
                }
                .search-bar button {
                    background-color: #9ed0ff;
                    color: white;
                    border: none;
                    border-radius: 0 30px 30px 0;
                    padding: 10px 15px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .search-bar button:hover {
                    background-color: #62b5f9;
                }
            `;
            document.head.appendChild(style);
            
            const searchInput = document.getElementById('club-search');
            const searchButton = document.getElementById('search-btn');
            
            searchInput.addEventListener('input', function() {
                searchClubs(this.value);
            });
            
            searchButton.addEventListener('click', function() {
                searchClubs(searchInput.value);
            });
        }
    }
}