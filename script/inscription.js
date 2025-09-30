  
        // Animation on scroll for sections
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        // Observe sections for animation
        document.querySelectorAll('.inscription, footer').forEach(section => {
            sectionObserver.observe(section);
        });
        
        // Animate social icons on hover
        document.querySelectorAll('.social-icons a').forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.querySelector('i').style.transform = 'rotate(360deg)';
                this.querySelector('i').style.transition = 'transform 0.5s ease';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.querySelector('i').style.transform = 'rotate(0deg)';
            });
        });
        
        // Logo animation on page load
        window.addEventListener('load', function() {
            const logoIcon = document.querySelector('.logo i');
            logoIcon.style.animation = 'pulse 2s infinite';
        });

        // Menu hamburger functionality
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
        
        // Hide header on scroll down, show on scroll up
        let lastScrollY = window.scrollY;
        const header = document.getElementById('header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            lastScrollY = window.scrollY;
        });

        // Formulaire d'inscription - Logique
        const progressBar = document.getElementById('progress-bar');
        const progressSteps = document.querySelectorAll('.progress-step');
        const formSteps = document.querySelectorAll('.form-step');
        const nextButtons = document.querySelectorAll('.btn-next');
        const prevButtons = document.querySelectorAll('.btn-prev');
        const submitButton = document.getElementById('btn-submit');
        const confirmation = document.getElementById('confirmation');
        
        let currentStep = 1;
        const totalSteps = 4;
        
        // Mettre à jour la barre de progression
        function updateProgressBar() {
            const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
            progressBar.style.width = `${progressPercentage}%`;
            
            progressSteps.forEach((step, index) => {
                if (index < currentStep) {
                    step.classList.add('completed');
                    step.classList.remove('active');
                } else if (index === currentStep) {
                    step.classList.add('active');
                    step.classList.remove('completed');
                } else {
                    step.classList.remove('active', 'completed');
                }
            });
        }
        
        // Valider l'étape actuelle
        function validateStep(step) {
            let isValid = true;
            const inputs = formSteps[step - 1].querySelectorAll('input[required], select[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                    
                    // Validation spécifique pour l'email
                    if (input.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            input.classList.add('error');
                            isValid = false;
                        }
                    }
                    
                    // Validation spécifique pour le téléphone
                    if (input.type === 'tel') {
                        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
                        if (!phoneRegex.test(input.value)) {
                            input.classList.add('error');
                            isValid = false;
                        }
                    }
                }
            });
            
            return isValid;
        }
        
        // Aller à l'étape suivante
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                const nextStepId = this.getAttribute('data-next');
                
                if (validateStep(currentStep)) {
                    // Masquer l'étape actuelle
                    document.getElementById(`step${currentStep}-form`).classList.remove('active');
                    
                    // Afficher l'étape suivante
                    document.getElementById(nextStepId).classList.add('active');
                    
                    // Mettre à jour l'étape actuelle
                    currentStep = parseInt(nextStepId.replace('step', '').replace('-form', ''));
                    
                    // Mettre à jour la barre de progression
                    updateProgressBar();
                    
                    // Faire défiler vers le haut du formulaire
                    document.getElementById('inscription').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Revenir à l'étape précédente
        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                const prevStepId = this.getAttribute('data-prev');
                
                // Masquer l'étape actuelle
                document.getElementById(`step${currentStep}-form`).classList.remove('active');
                
                // Afficher l'étape précédente
                document.getElementById(prevStepId).classList.add('active');
                
                // Mettre à jour l'étape actuelle
                currentStep = parseInt(prevStepId.replace('step', '').replace('-form', ''));
                
                // Mettre à jour la barre de progression
                updateProgressBar();
                
                // Faire défiler vers le haut du formulaire
                document.getElementById('inscription').scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        // Soumettre le formulaire
        submitButton.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                // Simuler l'envoi du formulaire
                this.textContent = 'Traitement en cours...';
                this.disabled = true;
                
                setTimeout(() => {
                    // Masquer le formulaire
                    document.getElementById(`step${currentStep}-form`).classList.remove('active');
                    
                    // Afficher la confirmation
                    confirmation.classList.add('active');
                    
                    // Mettre à jour la barre de progression
                    currentStep = totalSteps;
                    updateProgressBar();
                }, 2000);
            }
        });
        
        // Validation en temps réel
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('error');
                }
            });
            
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                }
            });
        });
        
        // Initialiser la barre de progression
        updateProgressBar();
    