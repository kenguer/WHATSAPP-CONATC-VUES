// script.js

let passwordAttempts = 0;
const maxAttempts = 3;
const correctPassword = 'Admin123'; // Mot de passe administrateur simple
const contacts = [
    { firstName: 'Jean', lastName: 'Dupont', phone: '+33123456789', email: 'jean.dupont@example.com' },
    { firstName: 'Marie', lastName: 'Durand', phone: '+33198765432', email: 'marie.durand@example.com' },
    { firstName: 'Pierre', lastName: 'Martin', phone: '+33111223344', email: 'pierre.martin@example.com' }
];

// Initialisation du texte d'information
const infoText = document.getElementById('infoText');
infoText.textContent = Nombre de contacts VCF générés : 0. Après 3 tentatives échouées, vous ne pourrez plus utiliser le site.;

// Bouton Télécharger VCF
document.getElementById('downloadVcfBtn').addEventListener('click', () => {
    if (passwordAttempts >= maxAttempts) {
        alert('Accès bloqué. Vous avez atteint le nombre maximal de tentatives.');
        return;
    }
    const pwd = prompt('Entrez le mot de passe administrateur :');
    if (pwd === correctPassword) {
        generateVcf();
    } else {
        passwordAttempts++;
        if (passwordAttempts >= maxAttempts) {
            alert('Mot de passe incorrect. Accès bloqué après 3 tentatives échouées.');
            document.getElementById('downloadVcfBtn').disabled = true;
        } else {
            alert(Mot de passe incorrect. Tentative ${passwordAttempts} de ${maxAttempts}.);
        }
    }
});

// Bouton Partager sur WhatsApp
document.getElementById('shareBtn').addEventListener('click', () => {
    window.open('https://chat.whatsapp.com/IFL3V0zkeuhFjrlq38nV8H', '_blank');
});

// Fonction de création et téléchargement du fichier VCF
function generateVcf() {
    let vcfData = '';
    contacts.forEach(contact => {
        vcfData += 
`BEGIN:VCARD
VERSION:3.0
N:${contact.lastName};${contact.firstName}
FN:${contact.firstName} ${contact.lastName}
TEL;TYPE=CELL:${contact.phone}
EMAIL:${contact.email}
END:VCARD

`;
    });
    // Création du Blob et téléchargement
    const blob = new Blob([vcfData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.vcf';
    a.click();
    URL.revokeObjectURL(url);

    // Mise à jour du texte d'information avec le nombre de contacts
    infoText.textContent = Nombre de contacts VCF générés : ${contacts.length}. Après 3 tentatives échouées, vous ne pourrez plus utiliser le site.;
}
