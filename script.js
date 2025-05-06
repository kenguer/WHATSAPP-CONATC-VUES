<!DOCTYPE html><html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Besoin de vues pour ton statut WhatsApp ?</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1 style="color: #004aad;">Besoin de vues pour votre statut WhatsApp ?</h1>
  <p>Ajoutez votre nom comme dans l'exemple, puis entrez votre numéro pour rejoindre la liste.</p>
  <form id="userForm">
    <input type="text" id="name" placeholder="Nom ex: Ralph">
    <input type="text" id="number" placeholder="Numéro ex: +18292681149">
    <button type="button" onclick="handleInscription()">S'inscrire</button>
  </form>  <p id="contactCount" style="color: #333;"></p>  <div id="vcfSection" style="display: none;">
    <button onclick="generateVCF()" style="background-color: #004aad; color: white;">Télécharger VCF</button>
  </div>  <br>
  <a href="https://wa.me/?text=Rejoins%20mon%20groupe%20WhatsApp" style="color: #004aad;">Rejoindre mon groupe WhatsApp</a><br>
  <a href="https://whatsapp.com/channel/0029Vb5jwpT7dmeeD32Cgx0c" style="color: #004aad;">Cliquez ici pour accéder à la chaîne</a>  <p style="color: #555; font-size: 14px; margin-top: 20px;">
    Ce fichier VCF contient les contacts de tous les inscrits. Si un utilisateur tente d’y accéder plusieurs fois sans autorisation, il ne pourra plus utiliser le site.<br>
    Pour toute assistance, contactez l’administrateur : +18292681149
  </p>  <script src="script.js"></script></body>
</html>
