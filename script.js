// Store contacts array in localStorage to persist between page reloads
let contacts = JSON.parse(localStorage.getItem('teamContacts')) || [];
updateContactCount();

// Initialize any existing contacts
if (contacts.length > 0) {
  generateVCF();
  document.getElementById("download-vcf").style.display = "inline-flex";
}

// Form submission handler with validation and animations
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById("submit-btn");
  const nom = document.getElementById("nom").value.trim();
  const numero = document.getElementById("numero").value.trim();
  
  // Basic validation
  if (!nom) {
    shakeElement(document.getElementById("nom"));
    return;
  }
  
  if (!numero) {
    shakeElement(document.getElementById("numero"));
    return;
  }
  
  // Format phone number (optional)
  const formattedNumero = formatPhoneNumber(numero);
  
  // Prevent duplicate submissions
  const isDuplicate = contacts.some(contact => 
    contact.numero === formattedNumero || contact.nom === nom
  );
  
  if (isDuplicate) {
    alert("Ce nom ou numéro existe déjà dans notre liste.");
    return;
  }
  
  // Add loading animation
  submitBtn.classList.add("loading");
  
  // Simulate processing (can remove this setTimeout in production)
  setTimeout(() => {
    // Add contact to array
    contacts.push({ nom, numero: formattedNumero });
    
    // Save to localStorage
    localStorage.setItem('teamContacts', JSON.stringify(contacts));
    
    // Update UI
    updateContactCount();
    showSuccessMessage();
    generateVCF();
    
    // Reset form
    document.getElementById("nom").value = "";
    document.getElementById("numero").value = "";
    
    // Remove loading state
    submitBtn.classList.remove("loading");
  }, 800);
});

// Button ripple effect animation
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", function(e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    
    const x = e.clientX - e.target.getBoundingClientRect().left;
    const y = e.clientY - e.target.getBoundingClientRect().top;
    
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Generate VCF file from contacts array
function generateVCF() {
  let vcf = "";
  contacts.forEach(contact => {
    vcf += `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.nom}\nTEL:${contact.numero}\nEND:VCARD\n`;
  });

  const blob = new Blob([vcf], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.getElementById("download-vcf");
  downloadLink.href = url;
  downloadLink.style.display = "inline-flex";
}

// Update contact counter with animation
function updateContactCount() {
  const countElement = document.getElementById("contact-count");
  const currentCount = parseInt(countElement.textContent);
  const targetCount = contacts.length;
  
  // Animate the counter
  animateCounter(currentCount, targetCount, countElement);
}

// Animate counter from start to end value
function animateCounter(start, end, element) {
  if (start === end) return;
  
  const duration = 1000;
  const step = 1;
  const stepTime = Math.abs(Math.floor(duration / (end - start)));
  
  let current = start;
  const timer = setInterval(() => {
    current += start < end ? step : -step;
    element.textContent = current;
    
    if ((start < end && current >= end) || (start > end && current <= end)) {
      element.textContent = end;
      clearInterval(timer);
    }
  }, stepTime);
}

// Show success message with animation
function showSuccessMessage() {
  const afterSubmit = document.getElementById("after-submit");
  afterSubmit.classList.add("show");
}

// Shake animation for invalid inputs
function shakeElement(element) {
  element.classList.add("shake");
  element.style.borderColor = "var(--error)";
  
  setTimeout(() => {
    element.classList.remove("shake");
    element.addEventListener("input", function removeErrorStyle() {
      element.style.borderColor = "";
      element.removeEventListener("input", removeErrorStyle);
    });
  }, 500);
}

// Format phone number (optional enhancement)
function formatPhoneNumber(phoneNumber) {
  // Remove any non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Return the cleaned number with + if it doesn't have one
  if (cleaned.startsWith('00')) {
    return '+' + cleaned.substring(2);
  } else if (!cleaned.startsWith('+')) {
    return '+' + cleaned;
  }
  
  return phoneNumber
