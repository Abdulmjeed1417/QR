document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const sizeSelect = document.getElementById('size-select');
    const correctionSelect = document.getElementById('correction-select');
    const fgColorPicker = document.getElementById('fg-color-picker');
    const bgColorPicker = document.getElementById('bg-color-picker');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const copyBtn = document.getElementById('copy-btn');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const qrcodeContainer = document.getElementById('qrcode-container');

    let qrcode = null;

    const generateQRCode = () => {
        const text = textInput.value;
        if (!text) {
            alert('Please enter text or a URL.');
            return;
        }

        const size = parseInt(sizeSelect.value);
        const correctionLevel = correctionSelect.value;
        const fgColor = fgColorPicker.value;
        const bgColor = bgColorPicker.value;

        qrcodeContainer.innerHTML = '';
        qrcode = new QRCode(qrcodeContainer, {
            text: text,
            width: size,
            height: size,
            colorDark: fgColor,
            colorLight: bgColor,
            correctLevel: QRCode.CorrectLevel[correctionLevel]
        });
    };

    generateBtn.addEventListener('click', generateQRCode);

    [textInput, sizeSelect, correctionSelect, fgColorPicker, bgColorPicker].forEach(input => {
        input.addEventListener('input', generateQRCode);
    });

    downloadBtn.addEventListener('click', () => {
        if (!qrcode) {
            alert('Please generate a QR code first.');
            return;
        }
        const img = qrcodeContainer.querySelector('img');
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'qrcode.png';
        link.click();
    });

    copyBtn.addEventListener('click', () => {
        if (!qrcode) {
            alert('Please generate a QR code first.');
            return;
        }
        const img = qrcodeContainer.querySelector('img');
        navigator.clipboard.writeText(img.src).then(() => {
            alert('QR code image URL copied to clipboard!');
        }, () => {
            alert('Failed to copy to clipboard.');
        });
    });

    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });
});
