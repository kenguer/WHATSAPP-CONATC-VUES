document.getElementById('whatsappForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const number = document.getElementById('whatsappNumber').value;
    const vcfData = `BEGIN:VCARD
VERSION:3.0
FN:${number}
TEL:${number}
END:VCARD`;

    // Telechaje VCF
    document.getElementById('downloadVCF').addEventListener('click', function() {
        const blob = new Blob([vcfData], { type: 'text/vcard' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${number}.vcf`;
        link.click();
    });

    // Pataje lyen sou WhatsApp
    document.getElementById('shareLink').addEventListener('click', function() {
        const message = `Mwen swete ajoute ou sou WhatsApp.`;
        const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });
});
