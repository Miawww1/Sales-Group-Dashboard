/************************************************************
 *  SALES GRUP DASHBOARD - BACKEND V2.1 (RESTORED & FIXED)
 ************************************************************/

const SPREADSHEET_ID     = "1WMa_JZaWtBcn6bybr4u1fPAtRppnJbJnHc0oohheZ0E";
const USERS_SHEET        = "Users";
const RESET_SHEET        = "PasswordReset";
const DATA_SHEET         = "InputData";
const CATALOG_SHEET      = "Catalog";
const ORDER_ITEMS_SHEET  = "OrderItems";
const TRAVEL_AGENT_SHEET = "TravelAgent";
const TIMEZONE           = "Asia/Jakarta";

/************************************************************
 *  UTILITAS SPREADSHEET (Fungsi Asli Kamu)
 ************************************************************/
function _ss() { return SpreadsheetApp.openById(SPREADSHEET_ID); }
function getSheetByName(name) { return _ss().getSheetByName(name); }
function include(filename) { return HtmlService.createHtmlOutputFromFile(filename).getContent(); }

function ensureSheet_(name, headers) {
  const ss = _ss();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
  } else if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
  }
  return sh;
}

function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setTitle('Sales Grup Dashboard')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/************************************************************
 *  LOGIKA RESERVASI (FIXED)
 ************************************************************/
function getTodayString_() {
  return Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd");
}

function normalizeYmd_(v) {
  if (!v) return '';
  if (v instanceof Date) return Utilities.formatDate(v, TIMEZONE, "yyyy-MM-dd");
  try {
    const d = new Date(v);
    if (!isNaN(d.getTime())) return Utilities.formatDate(d, TIMEZONE, "yyyy-MM-dd");
  } catch (e) {}
  return '';
}

function resolveFinalStatus_(oldStatus, inputStatus, eventDate) {
  const oldS = String(oldStatus || '').trim();
  const inS  = String(inputStatus || '').trim();
  if (oldS.toLowerCase() === 'lost' || inS.toLowerCase() === 'lost') return 'Lost';

  const ymd = normalizeYmd_(eventDate);
  if (ymd && ymd === getTodayString_()) return 'Reservasi';

  return inS || oldS || 'On Nego';
}

function dailyUpdateReservasiStatus() {
  const sh = getSheetByName(DATA_SHEET);
  const data = sh.getDataRange().getValues();
  if (data.length < 2) return;
  const headers = data[0].map(h => String(h || '').toLowerCase().trim());
  const iStatus = headers.indexOf('status');
  const iEventDate = headers.indexOf('event date');
  const todayYmd = getTodayString_();
  
  for (let i = 1; i < data.length; i++) {
    const currentS = String(data[i][iStatus] || '').trim();
    const eventYmd = normalizeYmd_(data[i][iEventDate]);
    if (currentS.toLowerCase() !== 'lost' && eventYmd === todayYmd && currentS !== 'Reservasi') {
      sh.getRange(i + 1, iStatus + 1).setValue('Reservasi');
    }
  }
}

/************************************************************
 *  SECURITY & AUTH (Fungsi Asli Kamu)
 ************************************************************/
function hashPassword(password) {
  const hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password, Utilities.Charset.UTF_8);
  return hash.map(byte => {
    const v = (byte < 0) ? 256 + byte : byte;
    return ('0' + v.toString(16)).slice(-2);
  }).join('');
}

function checkLogin(email, password) {
  try {
    const sh = ensureSheet_(USERS_SHEET, ["Nama", "Email", "Password", "Jabatan", "Regional"]);
    const vals = sh.getDataRange().getValues();
    const mail = String(email).trim().toLowerCase();
    const hashedInput = hashPassword(password);
    for (let i = 1; i < vals.length; i++) {
      if (String(vals[i][1]).trim().toLowerCase() === mail && hashedInput === String(vals[i][2]).trim()) {
        return { success: true, message: "Login berhasil", user: { nama: vals[i][0], email: mail, jabatan: vals[i][3], regional: vals[i][4] }};
      }
    }
    return { success: false, message: "Email atau password salah." };
  } catch (err) { return { success: false, message: "Error login: " + err }; }
}

function registerUser(nama, email, password, jabatan, regional) {
  try {
    const sh = ensureSheet_(USERS_SHEET, ["Nama", "Email", "Password", "Jabatan", "Regional", "CreatedAt"]);
    const data = sh.getDataRange().getValues();
    const emailNorm = String(email).trim().toLowerCase();
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][1]).trim().toLowerCase() === emailNorm) return { success: false, message: "Email sudah terdaftar." };
    }
    sh.appendRow([nama, emailNorm, hashPassword(password), jabatan, regional, new Date()]);
    return { success: true, message: "Registrasi berhasil!" };
  } catch (err) { return { success: false, message: "Error: " + err }; }
}

/************************************************************
 *  CATALOG & TRAVEL AGENT (Fungsi Asli Kamu)
 ************************************************************/
function listTravelAgents() {
  const sh = ensureSheet_(TRAVEL_AGENT_SHEET, ["Kode", "Nama", "Regional"]);
  const vals = sh.getDataRange().getValues();
  return vals.slice(1).map(r => ({ kode: r[0], nama: r[1], regional: r[2] }));
}

function listCatalog(category, estate) {
  const sh = ensureSheet_(CATALOG_SHEET, ["Estate", "Kategori", "Kode", "Nama", "Harga", "Status"]);
  const vals = sh.getDataRange().getValues();
  const catF = String(category || "").toLowerCase().trim();
  const estF = String(estate || "").toLowerCase().trim();
  return vals.slice(1).filter(r => {
    const rowEst = String(r[0] || "").toLowerCase().trim();
    const rowCat = String(r[1] || "").toLowerCase().trim();
    const status = String(r[5] || "Aktif").toLowerCase().trim();
    const isActive = (status === "aktif" || status === "" || status === "active");
    return isActive && (!estF || rowEst === estF) && (!catF || rowCat === catF);
  }).map(r => ({ estate: r[0], kategori: r[1], kode: r[2], nama: r[3], harga: parseRupiah_(r[4]) }));
}

/************************************************************
 *  SAVE / UPDATE / DELETE (Fungsi Asli Kamu)
 ************************************************************/
function saveOrderWithItems(formData, cart, user) {
  try {
    const sh = ensureSheet_(DATA_SHEET, ["Timestamp", "Order ID", "Estate", "Status", "Sumber", "Event Date", "Jam Kedatangan", "Nama PIC", "No Telp", "Nama Grup", "Lembaga", "Regional", "Is Travel Agent", "Travel Agent Kode", "Travel Agent Nama", "Created By", "Created Email", "DP 1", "Tanggal DP", "Pelunasan", "Tanggal Pelunasan", "Sisa Pelunasan", "Revenue"]);
    const now = new Date();
    const orderId = "ORD-" + now.getTime();
    const revenue = Array.isArray(cart) ? cart.reduce((a, x) => a + Number(x.total || 0), 0) : 0;
    const dp1 = Number(formData.dp1 || 0);
    const pel = Number(formData.pelunasan || 0);
    
    sh.appendRow([
      now, orderId, formData.estate, resolveFinalStatus_('', formData.status, formData.eventDate),
      formData.sumber, formData.eventDate, formData.jamKedatangan, formData.namaPIC, 
      formData.noTelp, formData.namaGrup, formData.lembaga, user.regional,
      formData.isTravelAgent ? "Ya" : "Tidak", formData.travelAgentKode, formData.travelAgentNama,
      user.nama, user.email, dp1, formData.tanggalDP, pel, formData.tanggalPelunasan,
      Math.max(revenue - dp1 - pel, 0), revenue
    ]);

    const shIt = ensureSheet_(ORDER_ITEMS_SHEET, ["Order ID", "Estate", "Kode Produk", "Nama Produk", "Qty", "Harga", "Diskon (%)", "Total", "Created At", "Created By", "Created Email"]);
    if (cart.length > 0) {
      const rows = cart.map(item => [orderId, formData.estate, item.kode, item.nama, item.qty, item.harga, item.diskon, item.total, now, user.nama, user.email]);
      shIt.getRange(shIt.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    }
    return { success: true, message: "Order #" + orderId + " disimpan", orderId };
  } catch (err) { return { success: false, message: err.toString() }; }
}

function updateOrderWithItems(orderId, header, items, userEmail) {
  try {
    const sh = getSheetByName(DATA_SHEET);
    const data = sh.getDataRange().getValues();
    const headers = data[0].map(h => String(h || '').toLowerCase().trim());
    let rowIndex = -1;
    for (let r = 1; r < data.length; r++) {
      if (String(data[r][1]).trim() === orderId) { rowIndex = r + 1; break; }
    }
    if (rowIndex === -1) return { success: false, message: "Order tidak ditemukan" };

    const revenue = items.reduce((a, x) => a + Number(x.total || 0), 0);
    const dp1 = Number(header.dp1 || 0);
    const pel = Number(header.pelunasan || 0);

    const updateMap = {
      'status': resolveFinalStatus_(data[rowIndex-1][3], header.status, header.eventDate),
      'sumber': header.sumber, 'event date': header.eventDate, 'jam kedatangan': header.jamKedatangan,
      'nama pic': header.namaPIC, 'no telp': header.noTelp, 'nama grup': header.namaGrup, 'lembaga': header.lembaga,
      'is travel agent': header.isTravelAgent ? "Ya" : "Tidak", 'travel agent kode': header.travelAgentKode, 'travel agent nama': header.travelAgentNama,
      'dp 1': dp1, 'tanggal dp': header.tanggalDP, 'pelunasan': pel, 'tanggal pelunasan': header.tanggalPelunasan,
      'sisa pelunasan': Math.max(revenue - dp1 - pel, 0), 'revenue': revenue
    };

    for (let key in updateMap) {
      let col = headers.indexOf(key);
      if (col !== -1) sh.getRange(rowIndex, col + 1).setValue(updateMap[key]);
    }

    const shIt = getSheetByName(ORDER_ITEMS_SHEET);
    const itData = shIt.getDataRange().getValues();
    for (let r = itData.length; r >= 2; r--) {
      if (String(itData[r-1][0]).trim() === orderId) shIt.deleteRow(r);
    }
    if (items.length > 0) {
      const rows = items.map(x => [orderId, header.estate, x.kode, x.nama, x.qty, x.harga, x.diskon, x.total, new Date(), "", userEmail]);
      shIt.getRange(shIt.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    }
    return { success: true, message: "Order #" + orderId + " diperbarui" };
  } catch (err) { return { success: false, message: err.toString() }; }
}

function deleteOrderById(orderId, userEmail) {
  try {
    const sh = getSheetByName(DATA_SHEET);
    const data = sh.getDataRange().getValues();
    for (let i = data.length - 1; i >= 1; i--) {
      if (String(data[i][1]).trim() === orderId) sh.deleteRow(i + 1);
    }
    const shIt = getSheetByName(ORDER_ITEMS_SHEET);
    const itData = shIt.getDataRange().getValues();
    for (let i = itData.length - 1; i >= 1; i--) {
      if (String(itData[i][0]).trim() === orderId) shIt.deleteRow(i + 1);
    }
    return { success: true, message: "Order #" + orderId + " dihapus" };
  } catch (err) { return { success: false, message: err.toString() }; }
}

/************************************************************
 *  SUMMARY & PAGINATION (LOGIKA BARU)
 ************************************************************/
function getRevenueSummaryForUser(userEmail, filters = {}) {
  try {
    const u = getUserByEmail_(userEmail);
    if (!u) return { data: [], totalRows: 0 };

    const sh = getSheetByName(DATA_SHEET);
    const rawData = sh.getDataRange().getValues();
    if (rawData.length < 2) return { data: [], totalRows: 0 };

    const headers = rawData[0].map(h => String(h || '').toLowerCase().trim());
    const iTimestamp = headers.indexOf('timestamp');
    const iOrderId = headers.indexOf('order id');
    const iEstate = headers.indexOf('estate');
    const iStatus = headers.indexOf('status');
    const iNamaGrup = headers.indexOf('nama grup');
    const iCreatedEmail = headers.indexOf('created email');
    const iRevenue = headers.indexOf('revenue');

    const isInput = isInputRole_(u.jabatan);
    const userEmailNorm = String(userEmail).toLowerCase().trim();
    const searchTerm = filters.search ? String(filters.search).toLowerCase().trim() : "";

    // Konversi tanggal filter
    let startD = filters.startDate ? new Date(filters.startDate) : null;
    let endD = filters.endDate ? new Date(filters.endDate) : null;
    if (startD) startD.setHours(0,0,0,0);
    if (endD) endD.setHours(23,59,59,999);

    let filtered = rawData.slice(1).filter(r => {
      const rowOrderId = String(r[iOrderId] || '');
      const rowEmail = String(r[iCreatedEmail] || '').toLowerCase().trim();
      const rowEstate = String(r[iEstate] || '').trim();
      const rowGrup = String(r[iNamaGrup] || '').toLowerCase();
      const tStamp = new Date(r[iTimestamp]);

      // 1. CEK AKSES (WAJIB)
      if (isInput) {
        if (rowEmail !== userEmailNorm) return false;
      } else {
        const allowed = allowedEstatesByRegional_(u.regional);
        if (!allowed.includes(rowEstate)) return false;
      }
      
      // 2. LOGIKA SEARCH GLOBAL (Jika ada search, abaikan tanggal)
      if (searchTerm !== "") {
        return rowGrup.includes(searchTerm) || rowOrderId.toLowerCase().includes(searchTerm) || rowEstate.toLowerCase().includes(searchTerm);
      }

      // 3. JIKA TIDAK ADA SEARCH, GUNAKAN FILTER TANGGAL
      if (startD && tStamp < startD) return false;
      if (endD && tStamp > endD) return false;

      return rowOrderId !== ""; // Pastikan baris tidak kosong
    });

    // Sortir terbaru
    filtered.sort((a, b) => new Date(b[iTimestamp]) - new Date(a[iTimestamp]));

    const totalRows = filtered.length;
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 50;
    
    const data = filtered.slice((page - 1) * pageSize, page * pageSize).map(r => ({
      orderId: r[iOrderId],
      estate: r[iEstate],
      status: r[iStatus],
      namaGrup: r[iNamaGrup],
      totalRevenue: parseRupiah_(r[iRevenue])
    }));

    return { data, totalRows, page, pageSize };
  } catch (e) { 
    return { data: [], totalRows: 0, error: e.toString() }; 
  }
}

/************************************************************
 *  HELPERS (Formatters)
 ************************************************************/
function getUserByEmail_(email) {
  const sh = getSheetByName(USERS_SHEET);
  if (!sh) return null;
  const v = sh.getDataRange().getValues();
  const mail = String(email || '').toLowerCase().trim();
  for (let i = 1; i < v.length; i++) {
    if (String(v[i][1]).toLowerCase().trim() === mail) return { nama: v[i][0], email: mail, jabatan: v[i][3], regional: v[i][4] };
  }
  return null;
}

function parseRupiah_(v) {
  if (typeof v === 'number') return v;
  const s = String(v || '').replace(/[^\d-]/g, '');
  return parseInt(s, 10) || 0;
}

function isInputRole_(jabatan) {
  const j = String(jabatan || '').toLowerCase().trim();
  return j === 'sales' || j === 'telemarketing';
}

function allowedEstatesByRegional_(regional) {
  const r = String(regional || '').toLowerCase().trim();
  const map = { 'regional 1': ['CES 1','CES 2','CES 5','CES 7','CES 8','CES 10'], 'regional 2': ['CES 3','CES 6'], 'regional 3': ['CES 4'], 'regional 4': ['CES 9'] };
  return map[r] || [];
}

function formatSheetDate_(v) {
  if (!v) return '';
  if (v instanceof Date) return Utilities.formatDate(v, TIMEZONE, 'yyyy-MM-dd');
  return normalizeYmd_(v);
}

function formatSheetTime_(v) {
  if (v === null || v === undefined || v === '') return '';
  
  // Jika format angka serial Google Sheets (0..1)
  if (typeof v === 'number') {
    const totalMin = Math.round(v * 24 * 60);
    const h = String(Math.floor(totalMin / 60) % 24).padStart(2, '0');
    const m = String(totalMin % 60).padStart(2, '0');
    return h + ":" + m;
  }
  
  // Jika sudah format string "HH:mm:ss" atau "HH:mm"
  if (typeof v === 'string' && v.includes(':')) {
    return v.split(':').slice(0,2).join(':'); // Ambil jam dan menit saja
  }
  
  // Jika objek Date
  if (v instanceof Date) {
    return Utilities.formatDate(v, TIMEZONE, 'HH:mm');
  }
  
  return String(v).trim();
}

// BAGIAN BACKEND (Code.gs)
function getOrderDetailById(orderId, userEmail) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const shData = ss.getSheetByName(DATA_SHEET);
    const shIt = ss.getSheetByName(ORDER_ITEMS_SHEET);
    
    const data = shData.getDataRange().getValues();
    const itemsData = shIt.getDataRange().getValues();
    const targetId = String(orderId).trim();

    // 1. Cari Header (ID di Kolom B / Indeks 1)
    const row = data.find(r => String(r[1]).trim() === targetId);
    if (!row) return { success: false, message: "Order ID tidak ditemukan di InputData" };

    // Fungsi pembantu agar tanggal jadi string bersih YYYY-MM-DD
    const fDt = (v) => (v instanceof Date) ? Utilities.formatDate(v, TIMEZONE, "yyyy-MM-dd") : String(v || "");

    const header = {
      orderId: targetId,
      estate: String(row[2] || ""), 
      status: String(row[3] || ""), 
      sumber: String(row[4] || ""),
      eventDate: fDt(row[5]), 
      jamKedatangan: String(row[6] || ""),
      namaPIC: String(row[7] || ""), 
      noTelp: String(row[8] || ""), 
      namaGrup: String(row[9] || ""), 
      lembaga: String(row[10] || ""),
      isTravelAgent: String(row[12]).toLowerCase() === 'ya',
      travelAgentKode: String(row[13] || ""), 
      travelAgentNama: String(row[14] || ""),
      dp1: Number(row[17]) || 0, 
      tanggalDP: fDt(row[18]),
      pelunasan: Number(row[19]) || 0, 
      tanggalPelunasan: fDt(row[20])
    };

    // 2. Cari Items (ID di Kolom A / Indeks 0)
    // C=Kode(2), D=Nama(3), E=Qty(4), F=Harga(5), G=Diskon(6), H=Total(7)
    const items = itemsData.slice(1)
      .filter(r => String(r[0]).trim() === targetId)
      .map(r => ({
        kode: String(r[2] || ""), 
        nama: String(r[3] || ""), 
        qty: Number(r[4]) || 0, 
        harga: Number(r[5]) || 0, 
        diskon: Number(r[6]) || 0, 
        total: Number(r[7]) || 0
      }));

    return { success: true, header: header, items: items };
  } catch (e) {
    return { success: false, message: "Server Error: " + e.toString() };
  }
}

function fetchOrderDetailForEdit(orderId, userEmail) {
  const res = getOrderDetailById(orderId, userEmail);
  return JSON.parse(JSON.stringify(res));
}

function requestPasswordReset(email) {
  // Logika Dummy
  return { success: true, message: "Kode reset: 123456 (Simulasi)", token: "123456" };
}