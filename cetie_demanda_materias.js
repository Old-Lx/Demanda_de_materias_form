function gettingData() {
  const id = ''; /* String que contiene el id del formulario, en general, el id se extrae del link, por ejemplo: https://docs.google.com/forms/d/1TzqexySNZ3cm6bKh3_h-uBbg5iZwNSzzTviptT0LbpE/edit?pli=1 donde el id es 1TzqexySNZ3cm6bKh3_h-uBbg5iZwNSzzTviptT0LbpE, la alternativa, que creo que es lo más viable, es tomar el formulario activo */

  const form = FormApp.getActiveForm();
  let trimestre = getTrimestre(form);
  let sheetName = 'Demanda ' + trimestre;
  Logger.log(SpreadsheetApp.getActiveSpreadsheet());
  
  if (SpreadsheetApp.getActiveSpreadsheet()) {
    var demandaSpreadSheet = SpreadsheetApp.getActive();
    Logger.log('There`s an active SpreadsheetApp');
  } else {
    var demandaSpreadSheet = SpreadsheetApp.create(sheetName);
    SpreadsheetApp.setActiveSpreadsheet(demandaSpreadSheet);
    SpreadsheetApp.setActiveSheet(demandaSpreadSheet.getSheets()[0])
  }

    const responses = form.getResponses();
    responses.forEach(response => {
      const items = response.getItemResponses();
      items.forEach(item => {
        const question = item.getItem()
        const answer = item.getResponse();
        demandaSpreadSheet.appendRow([`Question:${question} Answer:${answer}`]);
      })
    })
}

// El nombre del formulario debe seguir el formato "CONSULTA ELECTRÓNICA ABR-JUL 2025", en otras palabras, que los dos últimos elementos de la string sean "ABR-JUL" y "2025"
// Esta función devuelve el trimestre deseado a partir del título del formulario
function getTrimestre(form) {
  let titleSplitted = form.getTitle().split(" ");
  return titleSplitted[titleSplitted.length - 2] + " " + titleSplitted[titleSplitted.length - 1];
}
