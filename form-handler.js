document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Form submission
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                // In a real implementation, you would use fetch or XMLHttpRequest
                // to send the form data to your PHP endpoint
                console.log('Form data:', Object.fromEntries(formData));
                
                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                
                // Reset form after a delay
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                    
                    // Show success modal or message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success-message';
                    successMessage.innerHTML = `
                        <div class="success-content">
                            <i class="fas fa-check-circle"></i>
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
                            <button class="btn btn-primary close-success">OK</button>
                        </div>
                    `;
                    
                    document.body.appendChild(successMessage);
                    
                    // Close success message
                    const closeBtn = document.querySelector('.close-success');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', function() {
                            successMessage.remove();
                        });
                    }
                }, 1000);
            }, 1500);
        });
    }
});