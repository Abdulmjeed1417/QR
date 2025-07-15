document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const fileInput = document.getElementById('file-input');
    const emailInput = document.getElementById('email-input');
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
        let data = textInput.value;
        const file = fileInput.files[0];
        const email = emailInput.value;

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            fetch('https://file.io/?expires=1d', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    generate(result.link);
                } else {
                    alert('Failed to upload file.');
                }
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                alert('Failed to upload file.');
            });
            return;
        } else if (email) {
            data = `mailto:${email}`;
        }

        if (!data) {
            alert('Please enter text, a URL, an email, or select a file.');
            return;
        }
        generate(data);
    };

    const generate = (data) => {
        const size = parseInt(sizeSelect.value);
        const correctionLevel = correctionSelect.value;
        const fgColor = fgColorPicker.value;
        const bgColor = bgColorPicker.value;

        qrcodeContainer.innerHTML = '';
        qrcode = new QRCode(qrcodeContainer, {
            text: data,
            width: size,
            height: size,
            colorDark: fgColor,
            colorLight: bgColor,
            correctLevel: QRCode.CorrectLevel[correctionLevel]
        });
    };

    generateBtn.addEventListener('click', generateQRCode);

    [textInput, fileInput, emailInput, sizeSelect, correctionSelect, fgColorPicker, bgColorPicker].forEach(input => {
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
