// script.js
const users = [];

function handleInscription() {
  const name = document.getElementById('name').value.trim();
  const number = document.getElementById('number').value.trim();

  if (!name || !number) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  users.push({ name, number });
  document.getElementById('userForm').reset();

  document.getElementById('contactCount').textContent =
    Nombre de contacts inscrits : ${users.length};

  // Montre bouton téléchargement
  document.getElementById('vcfSection').style.display = 'block';

  // Ajoute lyen pou rejoin team lan si li pa deja la
  if (!document.getElementById('teamLink')) {
    const teamLink = document.createElement('a');
    teamLink.href = "https://chat.whatsapp.com/IFL3V0zkeuhFjrlq38nV8H";
    teamLink.textContent = "Rejoindre My Team sur WhatsApp";
    teamLink.id = "teamLink";
    teamLink.style.color = "#004aad";
    teamLink.style.display = "block";
    teamLink.style.fontWeight = "bold";
    document.body.appendChild(teamLink);
  }
}

function generateVCF() {
  let vcfContent = "";
  users.forEach(user => {
    vcfContent += BEGIN:VCARD\nVERSION:3.0\nFN:${user.name}\nTEL:${user.number}\nEND:VCARD\n;
  });

  const blob = new Blob([vcfContent], { type: 'text/vcard' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'contacts.vcf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
