const exportPdf = () => {
  var element = document.getElementById('pdfContent');
  html2pdf(element);
};

export default exportPdf;