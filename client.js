const convertButton = document.getElementById('convertButton');

convertButton.addEventListener('click', async () => {
  const inputFile = document.getElementById('pdfFileInput').files[0];
  const formData = new FormData();
  formData.append('pdf', inputFile);

  const response = await fetch('/convert', {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    const downloadLink = document.createElement('a');
    downloadLink.href = '/download';
    downloadLink.download = 'converted.docx';
    downloadLink.click();
  } else {
    console.error('Error converting PDF to Word');
  }
});
