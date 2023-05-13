const express = require('express');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/convert', upload.single('pdf'), async (req, res) => {
  try {
    const pdfBytes = fs.readFileSync('C:\\Users\\Ruchi Rawat\\OneDrive\\Desktop\\project\\');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const text = await pdfDoc.getText();
    const wordDoc = text.split('\n').map(line => `${line}\n`).join('');

    const outputPath = `converted.docx`;
    fs.writeFileSync('C:\\Users\\Ruchi Rawat\\OneDrive\\Desktop\\project\\', wordDoc);

    res.json({ success: true });
  } catch (error) {
    console.error('Error converting PDF to Word:', error);
    res.status(500).json({ error: 'Failed to convert PDF to Word' });
  }
});

app.get('/download', (req, res) => {
  const filePath = 'converted.docx';
  res.download(filePath, 'converted.docx', (error) => {
    if (error) {
      console.error('Error downloading file:', error);
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
