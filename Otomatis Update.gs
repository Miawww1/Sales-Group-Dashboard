function setReservasiIfEventDateIsToday() {
  const SHEET_NAME = 'InputData'; // ganti sesuai nama tab kamu
  const STATUS_COL = 4;           // D = 4
  const EVENTDATE_COL = 6;        // F = 6
  const HEADER_ROW = 1;

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Sheet tidak ditemukan: ' + SHEET_NAME);

  const lastRow = sheet.getLastRow();
  if (lastRow <= HEADER_ROW) return;

  const numRows = lastRow - HEADER_ROW;

  // Ambil hanya 2 kolom yang dibutuhkan (lebih cepat)
  const statusRange = sheet.getRange(HEADER_ROW + 1, STATUS_COL, numRows, 1);
  const dateRange   = sheet.getRange(HEADER_ROW + 1, EVENTDATE_COL, numRows, 1);

  const statuses = statusRange.getValues(); // [[...],[...]]
  const dates    = dateRange.getValues();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let changed = 0;

  for (let i = 0; i < numRows; i++) {
    const statusRaw = statuses[i][0];
    const status = String(statusRaw || '').trim().toLowerCase();

    // jangan sentuh lost
    if (status === 'lost') continue;

    const eventDateRaw = dates[i][0];
    if (!(eventDateRaw instanceof Date)) continue; // kalau tanggal masih teks, skip

    const event = new Date(eventDateRaw);
    event.setHours(0, 0, 0, 0);

    // ✅ hanya jika tanggalnya sama dengan hari ini
    if (event.getTime() === today.getTime() && status !== 'reservasi') {
      statuses[i][0] = 'Reservasi';
      changed++;
    }
  }

  if (changed > 0) {
    statusRange.setValues(statuses);
  }
}
