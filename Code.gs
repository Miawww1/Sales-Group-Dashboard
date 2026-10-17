/************************************************************
 *  SALES GRUP DASHBOARD - BACKEND V2.3 (+ CALENDAR DETAIL FIX)
 ************************************************************/

const SPREADSHEET_ID     = "1WMa_JZaWtBcn6bybr4u1fPAtRppnJbJnHc0oohheZ0E";
const USERS_SHEET        = "Users";
const DATA_SHEET         = "InputData";
const CATALOG_SHEET      = "Catalog";
const ORDER_ITEMS_SHEET  = "OrderItems";
const TRAVEL_AGENT_SHEET = "TravelAgent";
const STATUS_HISTORY_SHEET = "StatusHistory";
const EVENT_LOG_SHEET = "EventLog";
const TIMEZONE           = "Asia/Jakarta";

/************************************************************
 *  PEMETAAN KOTA/KABUPATEN ASAL GRUP -> PROVINSI (buat peta Dashboard)
 *  Sumber data: 513 kab/kota resmi (emsifa/api-wilayah-indonesia).
 *  ID provinsi pakai kode dari package SVG peta "indonesia-map".
 *  Auto-generated — kalau mau nambah alias kota baru, tambahin manual
 *  di KOTA_PROVINSI_ALIAS_TAMBAHAN_ di bawah, jangan edit yang auto ini.
 ************************************************************/
const KOTA_PROVINSI_MAP_ = {'ACEH BARAT':'IDAC','ACEH BARAT DAYA':'IDAC','ACEH BESAR':'IDAC','ACEH JAYA':'IDAC','ACEH SELATAN':'IDAC','ACEH SINGKIL':'IDAC','ACEH TAMIANG':'IDAC','ACEH TENGAH':'IDAC','ACEH TENGGARA':'IDAC','ACEH TIMUR':'IDAC','ACEH UTARA':'IDAC','AGAM':'IDSB','ALOR':'IDNT','AMBON':'IDMA','ASAHAN':'IDSU','ASMAT':'IDPA','B A T A M':'IDKR','BADUNG':'IDBA','BALANGAN':'IDKS','BALIKPAPAN':'IDKI','BANDA ACEH':'IDAC','BANDAR LAMPUNG':'IDLA','BANDUNG':'IDJB','BANDUNG BARAT':'IDJB','BANGGAI':'IDST','BANGGAI KEPULAUAN':'IDST','BANGGAI LAUT':'IDST','BANGKA':'IDBB','BANGKA BARAT':'IDBB','BANGKA SELATAN':'IDBB','BANGKA TENGAH':'IDBB','BANGKALAN':'IDJI','BANGLI':'IDBA','BANJAR':'IDJB','BANJAR BARU':'IDKS','BANJARMASIN':'IDKS','BANJARNEGARA':'IDJT','BANTAENG':'IDSN','BANTUL':'IDYO','BANYU ASIN':'IDSS','BANYUMAS':'IDJT','BANYUWANGI':'IDJI','BARITO KUALA':'IDKS','BARITO SELATAN':'IDKT','BARITO TIMUR':'IDKT','BARITO UTARA':'IDKT','BARRU':'IDSN','BATANG':'IDJT','BATANG HARI':'IDJA','BATU':'IDJI','BATU BARA':'IDSU','BAUBAU':'IDSG','BEKASI':'IDJB','BELITUNG':'IDBB','BELITUNG TIMUR':'IDBB','BELU':'IDNT','BENER MERIAH':'IDAC','BENGKALIS':'IDRI','BENGKAYANG':'IDKB','BENGKULU':'IDBE','BENGKULU SELATAN':'IDBE','BENGKULU TENGAH':'IDBE','BENGKULU UTARA':'IDBE','BERAU':'IDKI','BIAK NUMFOR':'IDPA','BIMA':'IDNB','BINJAI':'IDSU','BINTAN':'IDKR','BIREUEN':'IDAC','BITUNG':'IDSA','BLITAR':'IDJI','BLORA':'IDJT','BOALEMO':'IDGO','BOGOR':'IDJB','BOJONEGORO':'IDJI','BOLAANG MONGONDOW':'IDSA','BOLAANG MONGONDOW SELATAN':'IDSA','BOLAANG MONGONDOW TIMUR':'IDSA','BOLAANG MONGONDOW UTARA':'IDSA','BOMBANA':'IDSG','BONDOWOSO':'IDJI','BONE':'IDSN','BONE BOLANGO':'IDGO','BONTANG':'IDKI','BOVEN DIGOEL':'IDPA','BOYOLALI':'IDJT','BREBES':'IDJT','BUKITTINGGI':'IDSB','BULELENG':'IDBA','BULUKUMBA':'IDSN','BULUNGAN':'IDKU','BUNGO':'IDJA','BUOL':'IDST','BURU':'IDMA','BURU SELATAN':'IDMA','BUTON':'IDSG','BUTON SELATAN':'IDSG','BUTON TENGAH':'IDSG','BUTON UTARA':'IDSG','CIAMIS':'IDJB','CIANJUR':'IDJB','CILACAP':'IDJT','CILEGON':'IDBT','CIMAHI':'IDJB','CIREBON':'IDJB','D U M A I':'IDRI','DAIRI':'IDSU','DEIYAI':'IDPA','DELI SERDANG':'IDSU','DEMAK':'IDJT','DENPASAR':'IDBA','DEPOK':'IDJB','DHARMASRAYA':'IDSB','DOGIYAI':'IDPA','DOMPU':'IDNB','DONGGALA':'IDST','EMPAT LAWANG':'IDSS','ENDE':'IDNT','ENREKANG':'IDSN','FAKFAK':'IDPB','FLORES TIMUR':'IDNT','GARUT':'IDJB','GAYO LUES':'IDAC','GIANYAR':'IDBA','GORONTALO':'IDGO','GORONTALO UTARA':'IDGO','GOWA':'IDSN','GRESIK':'IDJI','GROBOGAN':'IDJT','GUNUNG KIDUL':'IDYO','GUNUNG MAS':'IDKT','GUNUNGSITOLI':'IDSU','HALMAHERA BARAT':'IDMU','HALMAHERA SELATAN':'IDMU','HALMAHERA TENGAH':'IDMU','HALMAHERA TIMUR':'IDMU','HALMAHERA UTARA':'IDMU','HULU SUNGAI SELATAN':'IDKS','HULU SUNGAI TENGAH':'IDKS','HULU SUNGAI UTARA':'IDKS','HUMBANG HASUNDUTAN':'IDSU','INDRAGIRI HILIR':'IDRI','INDRAGIRI HULU':'IDRI','INDRAMAYU':'IDJB','INTAN JAYA':'IDPA','JAKARTA BARAT':'IDJK','JAKARTA PUSAT':'IDJK','JAKARTA SELATAN':'IDJK','JAKARTA TIMUR':'IDJK','JAKARTA UTARA':'IDJK','JAMBI':'IDJA','JAYAPURA':'IDPA','JAYAWIJAYA':'IDPA','JEMBER':'IDJI','JEMBRANA':'IDBA','JENEPONTO':'IDSN','JEPARA':'IDJT','JOMBANG':'IDJI','KABUPATEN ACEH BARAT':'IDAC','KABUPATEN ACEH BARAT DAYA':'IDAC','KABUPATEN ACEH BESAR':'IDAC','KABUPATEN ACEH JAYA':'IDAC','KABUPATEN ACEH SELATAN':'IDAC','KABUPATEN ACEH SINGKIL':'IDAC','KABUPATEN ACEH TAMIANG':'IDAC','KABUPATEN ACEH TENGAH':'IDAC','KABUPATEN ACEH TENGGARA':'IDAC','KABUPATEN ACEH TIMUR':'IDAC','KABUPATEN ACEH UTARA':'IDAC','KABUPATEN AGAM':'IDSB','KABUPATEN ALOR':'IDNT','KABUPATEN ASAHAN':'IDSU','KABUPATEN ASMAT':'IDPA','KABUPATEN BADUNG':'IDBA','KABUPATEN BALANGAN':'IDKS','KABUPATEN BANDUNG':'IDJB','KABUPATEN BANDUNG BARAT':'IDJB','KABUPATEN BANGGAI':'IDST','KABUPATEN BANGGAI KEPULAUAN':'IDST','KABUPATEN BANGGAI LAUT':'IDST','KABUPATEN BANGKA':'IDBB','KABUPATEN BANGKA BARAT':'IDBB','KABUPATEN BANGKA SELATAN':'IDBB','KABUPATEN BANGKA TENGAH':'IDBB','KABUPATEN BANGKALAN':'IDJI','KABUPATEN BANGLI':'IDBA','KABUPATEN BANJAR':'IDKS','KABUPATEN BANJARNEGARA':'IDJT','KABUPATEN BANTAENG':'IDSN','KABUPATEN BANTUL':'IDYO','KABUPATEN BANYU ASIN':'IDSS','KABUPATEN BANYUMAS':'IDJT','KABUPATEN BANYUWANGI':'IDJI','KABUPATEN BARITO KUALA':'IDKS','KABUPATEN BARITO SELATAN':'IDKT','KABUPATEN BARITO TIMUR':'IDKT','KABUPATEN BARITO UTARA':'IDKT','KABUPATEN BARRU':'IDSN','KABUPATEN BATANG':'IDJT','KABUPATEN BATANG HARI':'IDJA','KABUPATEN BATU BARA':'IDSU','KABUPATEN BEKASI':'IDJB','KABUPATEN BELITUNG':'IDBB','KABUPATEN BELITUNG TIMUR':'IDBB','KABUPATEN BELU':'IDNT','KABUPATEN BENER MERIAH':'IDAC','KABUPATEN BENGKALIS':'IDRI','KABUPATEN BENGKAYANG':'IDKB','KABUPATEN BENGKULU SELATAN':'IDBE','KABUPATEN BENGKULU TENGAH':'IDBE','KABUPATEN BENGKULU UTARA':'IDBE','KABUPATEN BERAU':'IDKI','KABUPATEN BIAK NUMFOR':'IDPA','KABUPATEN BIMA':'IDNB','KABUPATEN BINTAN':'IDKR','KABUPATEN BIREUEN':'IDAC','KABUPATEN BLITAR':'IDJI','KABUPATEN BLORA':'IDJT','KABUPATEN BOALEMO':'IDGO','KABUPATEN BOGOR':'IDJB','KABUPATEN BOJONEGORO':'IDJI','KABUPATEN BOLAANG MONGONDOW':'IDSA','KABUPATEN BOLAANG MONGONDOW SELATAN':'IDSA','KABUPATEN BOLAANG MONGONDOW TIMUR':'IDSA','KABUPATEN BOLAANG MONGONDOW UTARA':'IDSA','KABUPATEN BOMBANA':'IDSG','KABUPATEN BONDOWOSO':'IDJI','KABUPATEN BONE':'IDSN','KABUPATEN BONE BOLANGO':'IDGO','KABUPATEN BOVEN DIGOEL':'IDPA','KABUPATEN BOYOLALI':'IDJT','KABUPATEN BREBES':'IDJT','KABUPATEN BULELENG':'IDBA','KABUPATEN BULUKUMBA':'IDSN','KABUPATEN BULUNGAN':'IDKU','KABUPATEN BUNGO':'IDJA','KABUPATEN BUOL':'IDST','KABUPATEN BURU':'IDMA','KABUPATEN BURU SELATAN':'IDMA','KABUPATEN BUTON':'IDSG','KABUPATEN BUTON SELATAN':'IDSG','KABUPATEN BUTON TENGAH':'IDSG','KABUPATEN BUTON UTARA':'IDSG','KABUPATEN CIAMIS':'IDJB','KABUPATEN CIANJUR':'IDJB','KABUPATEN CILACAP':'IDJT','KABUPATEN CIREBON':'IDJB','KABUPATEN DAIRI':'IDSU','KABUPATEN DEIYAI':'IDPA','KABUPATEN DELI SERDANG':'IDSU','KABUPATEN DEMAK':'IDJT','KABUPATEN DHARMASRAYA':'IDSB','KABUPATEN DOGIYAI':'IDPA','KABUPATEN DOMPU':'IDNB','KABUPATEN DONGGALA':'IDST','KABUPATEN EMPAT LAWANG':'IDSS','KABUPATEN ENDE':'IDNT','KABUPATEN ENREKANG':'IDSN','KABUPATEN FAKFAK':'IDPB','KABUPATEN FLORES TIMUR':'IDNT','KABUPATEN GARUT':'IDJB','KABUPATEN GAYO LUES':'IDAC','KABUPATEN GIANYAR':'IDBA','KABUPATEN GORONTALO':'IDGO','KABUPATEN GORONTALO UTARA':'IDGO','KABUPATEN GOWA':'IDSN','KABUPATEN GRESIK':'IDJI','KABUPATEN GROBOGAN':'IDJT','KABUPATEN GUNUNG KIDUL':'IDYO','KABUPATEN GUNUNG MAS':'IDKT','KABUPATEN HALMAHERA BARAT':'IDMU','KABUPATEN HALMAHERA SELATAN':'IDMU','KABUPATEN HALMAHERA TENGAH':'IDMU','KABUPATEN HALMAHERA TIMUR':'IDMU','KABUPATEN HALMAHERA UTARA':'IDMU','KABUPATEN HULU SUNGAI SELATAN':'IDKS','KABUPATEN HULU SUNGAI TENGAH':'IDKS','KABUPATEN HULU SUNGAI UTARA':'IDKS','KABUPATEN HUMBANG HASUNDUTAN':'IDSU','KABUPATEN INDRAGIRI HILIR':'IDRI','KABUPATEN INDRAGIRI HULU':'IDRI','KABUPATEN INDRAMAYU':'IDJB','KABUPATEN INTAN JAYA':'IDPA','KABUPATEN JAYAPURA':'IDPA','KABUPATEN JAYAWIJAYA':'IDPA','KABUPATEN JEMBER':'IDJI','KABUPATEN JEMBRANA':'IDBA','KABUPATEN JENEPONTO':'IDSN','KABUPATEN JEPARA':'IDJT','KABUPATEN JOMBANG':'IDJI','KABUPATEN KAIMANA':'IDPB','KABUPATEN KAMPAR':'IDRI','KABUPATEN KAPUAS':'IDKT','KABUPATEN KAPUAS HULU':'IDKB','KABUPATEN KARANG ASEM':'IDBA','KABUPATEN KARANGANYAR':'IDJT','KABUPATEN KARAWANG':'IDJB','KABUPATEN KARIMUN':'IDKR','KABUPATEN KARO':'IDSU','KABUPATEN KATINGAN':'IDKT','KABUPATEN KAUR':'IDBE','KABUPATEN KAYONG UTARA':'IDKB','KABUPATEN KEBUMEN':'IDJT','KABUPATEN KEDIRI':'IDJI','KABUPATEN KEEROM':'IDPA','KABUPATEN KENDAL':'IDJT','KABUPATEN KEPAHIANG':'IDBE','KABUPATEN KEPULAUAN ANAMBAS':'IDKR','KABUPATEN KEPULAUAN ARU':'IDMA','KABUPATEN KEPULAUAN MENTAWAI':'IDSB','KABUPATEN KEPULAUAN MERANTI':'IDRI','KABUPATEN KEPULAUAN SANGIHE':'IDSA','KABUPATEN KEPULAUAN SELAYAR':'IDSN','KABUPATEN KEPULAUAN SERIBU':'IDJK','KABUPATEN KEPULAUAN SULA':'IDMU','KABUPATEN KEPULAUAN TALAUD':'IDSA','KABUPATEN KEPULAUAN YAPEN':'IDPA','KABUPATEN KERINCI':'IDJA','KABUPATEN KETAPANG':'IDKB','KABUPATEN KLATEN':'IDJT','KABUPATEN KLUNGKUNG':'IDBA','KABUPATEN KOLAKA':'IDSG','KABUPATEN KOLAKA TIMUR':'IDSG','KABUPATEN KOLAKA UTARA':'IDSG','KABUPATEN KONAWE':'IDSG','KABUPATEN KONAWE KEPULAUAN':'IDSG','KABUPATEN KONAWE SELATAN':'IDSG','KABUPATEN KONAWE UTARA':'IDSG','KABUPATEN KOTA BARU':'IDKS','KABUPATEN KOTAWARINGIN BARAT':'IDKT','KABUPATEN KOTAWARINGIN TIMUR':'IDKT','KABUPATEN KUANTAN SINGINGI':'IDRI','KABUPATEN KUBU RAYA':'IDKB','KABUPATEN KUDUS':'IDJT','KABUPATEN KULON PROGO':'IDYO','KABUPATEN KUNINGAN':'IDJB','KABUPATEN KUPANG':'IDNT','KABUPATEN KUTAI BARAT':'IDKI','KABUPATEN KUTAI KARTANEGARA':'IDKI','KABUPATEN KUTAI TIMUR':'IDKI','KABUPATEN LABUHAN BATU':'IDSU','KABUPATEN LABUHAN BATU SELATAN':'IDSU','KABUPATEN LABUHAN BATU UTARA':'IDSU','KABUPATEN LAHAT':'IDSS','KABUPATEN LAMANDAU':'IDKT','KABUPATEN LAMONGAN':'IDJI','KABUPATEN LAMPUNG BARAT':'IDLA','KABUPATEN LAMPUNG SELATAN':'IDLA','KABUPATEN LAMPUNG TENGAH':'IDLA','KABUPATEN LAMPUNG TIMUR':'IDLA','KABUPATEN LAMPUNG UTARA':'IDLA','KABUPATEN LANDAK':'IDKB','KABUPATEN LANGKAT':'IDSU','KABUPATEN LANNY JAYA':'IDPA','KABUPATEN LEBAK':'IDBT','KABUPATEN LEBONG':'IDBE','KABUPATEN LEMBATA':'IDNT','KABUPATEN LIMA PULUH KOTA':'IDSB','KABUPATEN LINGGA':'IDKR','KABUPATEN LOMBOK BARAT':'IDNB','KABUPATEN LOMBOK TENGAH':'IDNB','KABUPATEN LOMBOK TIMUR':'IDNB','KABUPATEN LOMBOK UTARA':'IDNB','KABUPATEN LUMAJANG':'IDJI','KABUPATEN LUWU':'IDSN','KABUPATEN LUWU TIMUR':'IDSN','KABUPATEN LUWU UTARA':'IDSN','KABUPATEN MADIUN':'IDJI','KABUPATEN MAGELANG':'IDJT','KABUPATEN MAGETAN':'IDJI','KABUPATEN MAHAKAM HULU':'IDKI','KABUPATEN MAJALENGKA':'IDJB','KABUPATEN MAJENE':'IDSR','KABUPATEN MALAKA':'IDNT','KABUPATEN MALANG':'IDJI','KABUPATEN MALINAU':'IDKU','KABUPATEN MALUKU BARAT DAYA':'IDMA','KABUPATEN MALUKU TENGAH':'IDMA','KABUPATEN MALUKU TENGGARA':'IDMA','KABUPATEN MALUKU TENGGARA BARAT':'IDMA','KABUPATEN MAMASA':'IDSR','KABUPATEN MAMBERAMO RAYA':'IDPA','KABUPATEN MAMBERAMO TENGAH':'IDPA','KABUPATEN MAMUJU':'IDSR','KABUPATEN MAMUJU TENGAH':'IDSR','KABUPATEN MAMUJU UTARA':'IDSR','KABUPATEN MANDAILING NATAL':'IDSU','KABUPATEN MANGGARAI':'IDNT','KABUPATEN MANGGARAI BARAT':'IDNT','KABUPATEN MANGGARAI TIMUR':'IDNT','KABUPATEN MANOKWARI':'IDPB','KABUPATEN MANOKWARI SELATAN':'IDPB','KABUPATEN MAPPI':'IDPA','KABUPATEN MAROS':'IDSN','KABUPATEN MAYBRAT':'IDPB','KABUPATEN MELAWI':'IDKB','KABUPATEN MEMPAWAH':'IDKB','KABUPATEN MERANGIN':'IDJA','KABUPATEN MERAUKE':'IDPA','KABUPATEN MESUJI':'IDLA','KABUPATEN MIMIKA':'IDPA','KABUPATEN MINAHASA':'IDSA','KABUPATEN MINAHASA SELATAN':'IDSA','KABUPATEN MINAHASA TENGGARA':'IDSA','KABUPATEN MINAHASA UTARA':'IDSA','KABUPATEN MOJOKERTO':'IDJI','KABUPATEN MOROWALI':'IDST','KABUPATEN MOROWALI UTARA':'IDST','KABUPATEN MUARA ENIM':'IDSS','KABUPATEN MUARO JAMBI':'IDJA','KABUPATEN MUKOMUKO':'IDBE','KABUPATEN MUNA':'IDSG','KABUPATEN MUNA BARAT':'IDSG','KABUPATEN MURUNG RAYA':'IDKT','KABUPATEN MUSI BANYUASIN':'IDSS','KABUPATEN MUSI RAWAS':'IDSS','KABUPATEN MUSI RAWAS UTARA':'IDSS','KABUPATEN NABIRE':'IDPA','KABUPATEN NAGAN RAYA':'IDAC','KABUPATEN NAGEKEO':'IDNT','KABUPATEN NATUNA':'IDKR','KABUPATEN NDUGA':'IDPA','KABUPATEN NGADA':'IDNT','KABUPATEN NGANJUK':'IDJI','KABUPATEN NGAWI':'IDJI','KABUPATEN NIAS':'IDSU','KABUPATEN NIAS BARAT':'IDSU','KABUPATEN NIAS SELATAN':'IDSU','KABUPATEN NIAS UTARA':'IDSU','KABUPATEN NUNUKAN':'IDKU','KABUPATEN OGAN ILIR':'IDSS','KABUPATEN OGAN KOMERING ILIR':'IDSS','KABUPATEN OGAN KOMERING ULU':'IDSS','KABUPATEN OGAN KOMERING ULU SELATAN':'IDSS','KABUPATEN OGAN KOMERING ULU TIMUR':'IDSS','KABUPATEN PACITAN':'IDJI','KABUPATEN PADANG LAWAS':'IDSU','KABUPATEN PADANG LAWAS UTARA':'IDSU','KABUPATEN PADANG PARIAMAN':'IDSB','KABUPATEN PAKPAK BHARAT':'IDSU','KABUPATEN PAMEKASAN':'IDJI','KABUPATEN PANDEGLANG':'IDBT','KABUPATEN PANGANDARAN':'IDJB','KABUPATEN PANGKAJENE DAN KEPULAUAN':'IDSN','KABUPATEN PANIAI':'IDPA','KABUPATEN PARIGI MOUTONG':'IDST','KABUPATEN PASAMAN':'IDSB','KABUPATEN PASAMAN BARAT':'IDSB','KABUPATEN PASER':'IDKI','KABUPATEN PASURUAN':'IDJI','KABUPATEN PATI':'IDJT','KABUPATEN PEGUNUNGAN ARFAK':'IDPB','KABUPATEN PEGUNUNGAN BINTANG':'IDPA','KABUPATEN PEKALONGAN':'IDJT','KABUPATEN PELALAWAN':'IDRI','KABUPATEN PEMALANG':'IDJT','KABUPATEN PENAJAM PASER UTARA':'IDKI','KABUPATEN PENUKAL ABAB LEMATANG ILIR':'IDSS','KABUPATEN PESAWARAN':'IDLA','KABUPATEN PESISIR BARAT':'IDLA','KABUPATEN PESISIR SELATAN':'IDSB','KABUPATEN PIDIE':'IDAC','KABUPATEN PIDIE JAYA':'IDAC','KABUPATEN PINRANG':'IDSN','KABUPATEN POHUWATO':'IDGO','KABUPATEN POLEWALI MANDAR':'IDSR','KABUPATEN PONOROGO':'IDJI','KABUPATEN POSO':'IDST','KABUPATEN PRINGSEWU':'IDLA','KABUPATEN PROBOLINGGO':'IDJI','KABUPATEN PULANG PISAU':'IDKT','KABUPATEN PULAU MOROTAI':'IDMU','KABUPATEN PULAU TALIABU':'IDMU','KABUPATEN PUNCAK':'IDPA','KABUPATEN PUNCAK JAYA':'IDPA','KABUPATEN PURBALINGGA':'IDJT','KABUPATEN PURWAKARTA':'IDJB','KABUPATEN PURWOREJO':'IDJT','KABUPATEN RAJA AMPAT':'IDPB','KABUPATEN REJANG LEBONG':'IDBE','KABUPATEN REMBANG':'IDJT','KABUPATEN ROKAN HILIR':'IDRI','KABUPATEN ROKAN HULU':'IDRI','KABUPATEN ROTE NDAO':'IDNT','KABUPATEN S I A K':'IDRI','KABUPATEN SABU RAIJUA':'IDNT','KABUPATEN SAMBAS':'IDKB','KABUPATEN SAMOSIR':'IDSU','KABUPATEN SAMPANG':'IDJI','KABUPATEN SANGGAU':'IDKB','KABUPATEN SARMI':'IDPA','KABUPATEN SAROLANGUN':'IDJA','KABUPATEN SEKADAU':'IDKB','KABUPATEN SELUMA':'IDBE','KABUPATEN SEMARANG':'IDJT','KABUPATEN SERAM BAGIAN BARAT':'IDMA','KABUPATEN SERAM BAGIAN TIMUR':'IDMA','KABUPATEN SERANG':'IDBT','KABUPATEN SERDANG BEDAGAI':'IDSU','KABUPATEN SERUYAN':'IDKT','KABUPATEN SIAU TAGULANDANG BIARO':'IDSA','KABUPATEN SIDENRENG RAPPANG':'IDSN','KABUPATEN SIDOARJO':'IDJI','KABUPATEN SIGI':'IDST','KABUPATEN SIJUNJUNG':'IDSB','KABUPATEN SIKKA':'IDNT','KABUPATEN SIMALUNGUN':'IDSU','KABUPATEN SIMEULUE':'IDAC','KABUPATEN SINJAI':'IDSN','KABUPATEN SINTANG':'IDKB','KABUPATEN SITUBONDO':'IDJI','KABUPATEN SLEMAN':'IDYO','KABUPATEN SOLOK':'IDSB','KABUPATEN SOLOK SELATAN':'IDSB','KABUPATEN SOPPENG':'IDSN','KABUPATEN SORONG':'IDPB','KABUPATEN SORONG SELATAN':'IDPB','KABUPATEN SRAGEN':'IDJT','KABUPATEN SUBANG':'IDJB','KABUPATEN SUKABUMI':'IDJB','KABUPATEN SUKAMARA':'IDKT','KABUPATEN SUKOHARJO':'IDJT','KABUPATEN SUMBA BARAT':'IDNT','KABUPATEN SUMBA BARAT DAYA':'IDNT','KABUPATEN SUMBA TENGAH':'IDNT','KABUPATEN SUMBA TIMUR':'IDNT','KABUPATEN SUMBAWA':'IDNB','KABUPATEN SUMBAWA BARAT':'IDNB','KABUPATEN SUMEDANG':'IDJB','KABUPATEN SUMENEP':'IDJI','KABUPATEN SUPIORI':'IDPA','KABUPATEN TABALONG':'IDKS','KABUPATEN TABANAN':'IDBA','KABUPATEN TAKALAR':'IDSN','KABUPATEN TAMBRAUW':'IDPB','KABUPATEN TANA TIDUNG':'IDKU','KABUPATEN TANA TORAJA':'IDSN','KABUPATEN TANAH BUMBU':'IDKS','KABUPATEN TANAH DATAR':'IDSB','KABUPATEN TANAH LAUT':'IDKS','KABUPATEN TANGERANG':'IDBT','KABUPATEN TANGGAMUS':'IDLA','KABUPATEN TANJUNG JABUNG BARAT':'IDJA','KABUPATEN TANJUNG JABUNG TIMUR':'IDJA','KABUPATEN TAPANULI SELATAN':'IDSU','KABUPATEN TAPANULI TENGAH':'IDSU','KABUPATEN TAPANULI UTARA':'IDSU','KABUPATEN TAPIN':'IDKS','KABUPATEN TASIKMALAYA':'IDJB','KABUPATEN TEBO':'IDJA','KABUPATEN TEGAL':'IDJT','KABUPATEN TELUK BINTUNI':'IDPB','KABUPATEN TELUK WONDAMA':'IDPB','KABUPATEN TEMANGGUNG':'IDJT','KABUPATEN TIMOR TENGAH SELATAN':'IDNT','KABUPATEN TIMOR TENGAH UTARA':'IDNT','KABUPATEN TOBA SAMOSIR':'IDSU','KABUPATEN TOJO UNA-UNA':'IDST','KABUPATEN TOLI-TOLI':'IDST','KABUPATEN TOLIKARA':'IDPA','KABUPATEN TORAJA UTARA':'IDSN','KABUPATEN TRENGGALEK':'IDJI','KABUPATEN TUBAN':'IDJI','KABUPATEN TULANG BAWANG BARAT':'IDLA','KABUPATEN TULANGBAWANG':'IDLA','KABUPATEN TULUNGAGUNG':'IDJI','KABUPATEN WAJO':'IDSN','KABUPATEN WAKATOBI':'IDSG','KABUPATEN WAROPEN':'IDPA','KABUPATEN WAY KANAN':'IDLA','KABUPATEN WONOGIRI':'IDJT','KABUPATEN WONOSOBO':'IDJT','KABUPATEN YAHUKIMO':'IDPA','KABUPATEN YALIMO':'IDPA','KAIMANA':'IDPB','KAMPAR':'IDRI','KAPUAS':'IDKT','KAPUAS HULU':'IDKB','KARANG ASEM':'IDBA','KARANGANYAR':'IDJT','KARAWANG':'IDJB','KARIMUN':'IDKR','KARO':'IDSU','KATINGAN':'IDKT','KAUR':'IDBE','KAYONG UTARA':'IDKB','KEBUMEN':'IDJT','KEDIRI':'IDJI','KEEROM':'IDPA','KENDAL':'IDJT','KENDARI':'IDSG','KEPAHIANG':'IDBE','KEPULAUAN ANAMBAS':'IDKR','KEPULAUAN ARU':'IDMA','KEPULAUAN MENTAWAI':'IDSB','KEPULAUAN MERANTI':'IDRI','KEPULAUAN SANGIHE':'IDSA','KEPULAUAN SELAYAR':'IDSN','KEPULAUAN SERIBU':'IDJK','KEPULAUAN SULA':'IDMU','KEPULAUAN TALAUD':'IDSA','KEPULAUAN YAPEN':'IDPA','KERINCI':'IDJA','KETAPANG':'IDKB','KLATEN':'IDJT','KLUNGKUNG':'IDBA','KOLAKA':'IDSG','KOLAKA TIMUR':'IDSG','KOLAKA UTARA':'IDSG','KONAWE':'IDSG','KONAWE KEPULAUAN':'IDSG','KONAWE SELATAN':'IDSG','KONAWE UTARA':'IDSG','KOTA AMBON':'IDMA','KOTA B A T A M':'IDKR','KOTA BALIKPAPAN':'IDKI','KOTA BANDA ACEH':'IDAC','KOTA BANDAR LAMPUNG':'IDLA','KOTA BANDUNG':'IDJB','KOTA BANJAR':'IDJB','KOTA BANJAR BARU':'IDKS','KOTA BANJARMASIN':'IDKS','KOTA BARU':'IDKS','KOTA BATU':'IDJI','KOTA BAUBAU':'IDSG','KOTA BEKASI':'IDJB','KOTA BENGKULU':'IDBE','KOTA BIMA':'IDNB','KOTA BINJAI':'IDSU','KOTA BITUNG':'IDSA','KOTA BLITAR':'IDJI','KOTA BOGOR':'IDJB','KOTA BONTANG':'IDKI','KOTA BUKITTINGGI':'IDSB','KOTA CILEGON':'IDBT','KOTA CIMAHI':'IDJB','KOTA CIREBON':'IDJB','KOTA D U M A I':'IDRI','KOTA DENPASAR':'IDBA','KOTA DEPOK':'IDJB','KOTA GORONTALO':'IDGO','KOTA GUNUNGSITOLI':'IDSU','KOTA JAKARTA BARAT':'IDJK','KOTA JAKARTA PUSAT':'IDJK','KOTA JAKARTA SELATAN':'IDJK','KOTA JAKARTA TIMUR':'IDJK','KOTA JAKARTA UTARA':'IDJK','KOTA JAMBI':'IDJA','KOTA JAYAPURA':'IDPA','KOTA KEDIRI':'IDJI','KOTA KENDARI':'IDSG','KOTA KOTAMOBAGU':'IDSA','KOTA KUPANG':'IDNT','KOTA LANGSA':'IDAC','KOTA LHOKSEUMAWE':'IDAC','KOTA LUBUKLINGGAU':'IDSS','KOTA MADIUN':'IDJI','KOTA MAGELANG':'IDJT','KOTA MAKASSAR':'IDSN','KOTA MALANG':'IDJI','KOTA MANADO':'IDSA','KOTA MATARAM':'IDNB','KOTA MEDAN':'IDSU','KOTA METRO':'IDLA','KOTA MOJOKERTO':'IDJI','KOTA PADANG':'IDSB','KOTA PADANG PANJANG':'IDSB','KOTA PADANGSIDIMPUAN':'IDSU','KOTA PAGAR ALAM':'IDSS','KOTA PALANGKA RAYA':'IDKT','KOTA PALEMBANG':'IDSS','KOTA PALOPO':'IDSN','KOTA PALU':'IDST','KOTA PANGKAL PINANG':'IDBB','KOTA PAREPARE':'IDSN','KOTA PARIAMAN':'IDSB','KOTA PASURUAN':'IDJI','KOTA PAYAKUMBUH':'IDSB','KOTA PEKALONGAN':'IDJT','KOTA PEKANBARU':'IDRI','KOTA PEMATANG SIANTAR':'IDSU','KOTA PONTIANAK':'IDKB','KOTA PRABUMULIH':'IDSS','KOTA PROBOLINGGO':'IDJI','KOTA SABANG':'IDAC','KOTA SALATIGA':'IDJT','KOTA SAMARINDA':'IDKI','KOTA SAWAH LUNTO':'IDSB','KOTA SEMARANG':'IDJT','KOTA SERANG':'IDBT','KOTA SIBOLGA':'IDSU','KOTA SINGKAWANG':'IDKB','KOTA SOLOK':'IDSB','KOTA SORONG':'IDPB','KOTA SUBULUSSALAM':'IDAC','KOTA SUKABUMI':'IDJB','KOTA SUNGAI PENUH':'IDJA','KOTA SURABAYA':'IDJI','KOTA SURAKARTA':'IDJT','KOTA TANGERANG':'IDBT','KOTA TANGERANG SELATAN':'IDBT','KOTA TANJUNG BALAI':'IDSU','KOTA TANJUNG PINANG':'IDKR','KOTA TARAKAN':'IDKU','KOTA TASIKMALAYA':'IDJB','KOTA TEBING TINGGI':'IDSU','KOTA TEGAL':'IDJT','KOTA TERNATE':'IDMU','KOTA TIDORE KEPULAUAN':'IDMU','KOTA TOMOHON':'IDSA','KOTA TUAL':'IDMA','KOTA YOGYAKARTA':'IDYO','KOTAMOBAGU':'IDSA','KOTAWARINGIN BARAT':'IDKT','KOTAWARINGIN TIMUR':'IDKT','KUANTAN SINGINGI':'IDRI','KUBU RAYA':'IDKB','KUDUS':'IDJT','KULON PROGO':'IDYO','KUNINGAN':'IDJB','KUPANG':'IDNT','KUTAI BARAT':'IDKI','KUTAI KARTANEGARA':'IDKI','KUTAI TIMUR':'IDKI','LABUHAN BATU':'IDSU','LABUHAN BATU SELATAN':'IDSU','LABUHAN BATU UTARA':'IDSU','LAHAT':'IDSS','LAMANDAU':'IDKT','LAMONGAN':'IDJI','LAMPUNG BARAT':'IDLA','LAMPUNG SELATAN':'IDLA','LAMPUNG TENGAH':'IDLA','LAMPUNG TIMUR':'IDLA','LAMPUNG UTARA':'IDLA','LANDAK':'IDKB','LANGKAT':'IDSU','LANGSA':'IDAC','LANNY JAYA':'IDPA','LEBAK':'IDBT','LEBONG':'IDBE','LEMBATA':'IDNT','LHOKSEUMAWE':'IDAC','LIMA PULUH KOTA':'IDSB','LINGGA':'IDKR','LOMBOK BARAT':'IDNB','LOMBOK TENGAH':'IDNB','LOMBOK TIMUR':'IDNB','LOMBOK UTARA':'IDNB','LUBUKLINGGAU':'IDSS','LUMAJANG':'IDJI','LUWU':'IDSN','LUWU TIMUR':'IDSN','LUWU UTARA':'IDSN','MADIUN':'IDJI','MAGELANG':'IDJT','MAGETAN':'IDJI','MAHAKAM HULU':'IDKI','MAJALENGKA':'IDJB','MAJENE':'IDSR','MAKASSAR':'IDSN','MALAKA':'IDNT','MALANG':'IDJI','MALINAU':'IDKU','MALUKU BARAT DAYA':'IDMA','MALUKU TENGAH':'IDMA','MALUKU TENGGARA':'IDMA','MALUKU TENGGARA BARAT':'IDMA','MAMASA':'IDSR','MAMBERAMO RAYA':'IDPA','MAMBERAMO TENGAH':'IDPA','MAMUJU':'IDSR','MAMUJU TENGAH':'IDSR','MAMUJU UTARA':'IDSR','MANADO':'IDSA','MANDAILING NATAL':'IDSU','MANGGARAI':'IDNT','MANGGARAI BARAT':'IDNT','MANGGARAI TIMUR':'IDNT','MANOKWARI':'IDPB','MANOKWARI SELATAN':'IDPB','MAPPI':'IDPA','MAROS':'IDSN','MATARAM':'IDNB','MAYBRAT':'IDPB','MEDAN':'IDSU','MELAWI':'IDKB','MEMPAWAH':'IDKB','MERANGIN':'IDJA','MERAUKE':'IDPA','MESUJI':'IDLA','METRO':'IDLA','MIMIKA':'IDPA','MINAHASA':'IDSA','MINAHASA SELATAN':'IDSA','MINAHASA TENGGARA':'IDSA','MINAHASA UTARA':'IDSA','MOJOKERTO':'IDJI','MOROWALI':'IDST','MOROWALI UTARA':'IDST','MUARA ENIM':'IDSS','MUARO JAMBI':'IDJA','MUKOMUKO':'IDBE','MUNA':'IDSG','MUNA BARAT':'IDSG','MURUNG RAYA':'IDKT','MUSI BANYUASIN':'IDSS','MUSI RAWAS':'IDSS','MUSI RAWAS UTARA':'IDSS','NABIRE':'IDPA','NAGAN RAYA':'IDAC','NAGEKEO':'IDNT','NATUNA':'IDKR','NDUGA':'IDPA','NGADA':'IDNT','NGANJUK':'IDJI','NGAWI':'IDJI','NIAS':'IDSU','NIAS BARAT':'IDSU','NIAS SELATAN':'IDSU','NIAS UTARA':'IDSU','NUNUKAN':'IDKU','OGAN ILIR':'IDSS','OGAN KOMERING ILIR':'IDSS','OGAN KOMERING ULU':'IDSS','OGAN KOMERING ULU SELATAN':'IDSS','OGAN KOMERING ULU TIMUR':'IDSS','PACITAN':'IDJI','PADANG':'IDSB','PADANG LAWAS':'IDSU','PADANG LAWAS UTARA':'IDSU','PADANG PANJANG':'IDSB','PADANG PARIAMAN':'IDSB','PADANGSIDIMPUAN':'IDSU','PAGAR ALAM':'IDSS','PAKPAK BHARAT':'IDSU','PALANGKA RAYA':'IDKT','PALEMBANG':'IDSS','PALOPO':'IDSN','PALU':'IDST','PAMEKASAN':'IDJI','PANDEGLANG':'IDBT','PANGANDARAN':'IDJB','PANGKAJENE DAN KEPULAUAN':'IDSN','PANGKAL PINANG':'IDBB','PANIAI':'IDPA','PAREPARE':'IDSN','PARIAMAN':'IDSB','PARIGI MOUTONG':'IDST','PASAMAN':'IDSB','PASAMAN BARAT':'IDSB','PASER':'IDKI','PASURUAN':'IDJI','PATI':'IDJT','PAYAKUMBUH':'IDSB','PEGUNUNGAN ARFAK':'IDPB','PEGUNUNGAN BINTANG':'IDPA','PEKALONGAN':'IDJT','PEKANBARU':'IDRI','PELALAWAN':'IDRI','PEMALANG':'IDJT','PEMATANG SIANTAR':'IDSU','PENAJAM PASER UTARA':'IDKI','PENUKAL ABAB LEMATANG ILIR':'IDSS','PESAWARAN':'IDLA','PESISIR BARAT':'IDLA','PESISIR SELATAN':'IDSB','PIDIE':'IDAC','PIDIE JAYA':'IDAC','PINRANG':'IDSN','POHUWATO':'IDGO','POLEWALI MANDAR':'IDSR','PONOROGO':'IDJI','PONTIANAK':'IDKB','POSO':'IDST','PRABUMULIH':'IDSS','PRINGSEWU':'IDLA','PROBOLINGGO':'IDJI','PULANG PISAU':'IDKT','PULAU MOROTAI':'IDMU','PULAU TALIABU':'IDMU','PUNCAK':'IDPA','PUNCAK JAYA':'IDPA','PURBALINGGA':'IDJT','PURWAKARTA':'IDJB','PURWOREJO':'IDJT','RAJA AMPAT':'IDPB','REJANG LEBONG':'IDBE','REMBANG':'IDJT','ROKAN HILIR':'IDRI','ROKAN HULU':'IDRI','ROTE NDAO':'IDNT','S I A K':'IDRI','SABANG':'IDAC','SABU RAIJUA':'IDNT','SALATIGA':'IDJT','SAMARINDA':'IDKI','SAMBAS':'IDKB','SAMOSIR':'IDSU','SAMPANG':'IDJI','SANGGAU':'IDKB','SARMI':'IDPA','SAROLANGUN':'IDJA','SAWAH LUNTO':'IDSB','SEKADAU':'IDKB','SELUMA':'IDBE','SEMARANG':'IDJT','SERAM BAGIAN BARAT':'IDMA','SERAM BAGIAN TIMUR':'IDMA','SERANG':'IDBT','SERDANG BEDAGAI':'IDSU','SERUYAN':'IDKT','SIAU TAGULANDANG BIARO':'IDSA','SIBOLGA':'IDSU','SIDENRENG RAPPANG':'IDSN','SIDOARJO':'IDJI','SIGI':'IDST','SIJUNJUNG':'IDSB','SIKKA':'IDNT','SIMALUNGUN':'IDSU','SIMEULUE':'IDAC','SINGKAWANG':'IDKB','SINJAI':'IDSN','SINTANG':'IDKB','SITUBONDO':'IDJI','SLEMAN':'IDYO','SOLOK':'IDSB','SOLOK SELATAN':'IDSB','SOPPENG':'IDSN','SORONG':'IDPB','SORONG SELATAN':'IDPB','SRAGEN':'IDJT','SUBANG':'IDJB','SUBULUSSALAM':'IDAC','SUKABUMI':'IDJB','SUKAMARA':'IDKT','SUKOHARJO':'IDJT','SUMBA BARAT':'IDNT','SUMBA BARAT DAYA':'IDNT','SUMBA TENGAH':'IDNT','SUMBA TIMUR':'IDNT','SUMBAWA':'IDNB','SUMBAWA BARAT':'IDNB','SUMEDANG':'IDJB','SUMENEP':'IDJI','SUNGAI PENUH':'IDJA','SUPIORI':'IDPA','SURABAYA':'IDJI','SURAKARTA':'IDJT','TABALONG':'IDKS','TABANAN':'IDBA','TAKALAR':'IDSN','TAMBRAUW':'IDPB','TANA TIDUNG':'IDKU','TANA TORAJA':'IDSN','TANAH BUMBU':'IDKS','TANAH DATAR':'IDSB','TANAH LAUT':'IDKS','TANGERANG':'IDBT','TANGERANG SELATAN':'IDBT','TANGGAMUS':'IDLA','TANJUNG BALAI':'IDSU','TANJUNG JABUNG BARAT':'IDJA','TANJUNG JABUNG TIMUR':'IDJA','TANJUNG PINANG':'IDKR','TAPANULI SELATAN':'IDSU','TAPANULI TENGAH':'IDSU','TAPANULI UTARA':'IDSU','TAPIN':'IDKS','TARAKAN':'IDKU','TASIKMALAYA':'IDJB','TEBING TINGGI':'IDSU','TEBO':'IDJA','TEGAL':'IDJT','TELUK BINTUNI':'IDPB','TELUK WONDAMA':'IDPB','TEMANGGUNG':'IDJT','TERNATE':'IDMU','TIDORE KEPULAUAN':'IDMU','TIMOR TENGAH SELATAN':'IDNT','TIMOR TENGAH UTARA':'IDNT','TOBA SAMOSIR':'IDSU','TOJO UNA-UNA':'IDST','TOLI-TOLI':'IDST','TOLIKARA':'IDPA','TOMOHON':'IDSA','TORAJA UTARA':'IDSN','TRENGGALEK':'IDJI','TUAL':'IDMA','TUBAN':'IDJI','TULANG BAWANG BARAT':'IDLA','TULANGBAWANG':'IDLA','TULUNGAGUNG':'IDJI','WAJO':'IDSN','WAKATOBI':'IDSG','WAROPEN':'IDPA','WAY KANAN':'IDLA','WONOGIRI':'IDJT','WONOSOBO':'IDJT','YAHUKIMO':'IDPA','YALIMO':'IDPA','YOGYAKARTA':'IDYO'};

// Alias tambahan manual (nama gak baku yang sering dipakai sales/user).
// Ditambahin di sini biar gak ketimpa kalau KOTA_PROVINSI_MAP_ di-generate ulang.
const KOTA_PROVINSI_ALIAS_TAMBAHAN_ = {
  'JOGJA': 'IDYO', 'JOGJAKARTA': 'IDYO',
  'JAKARTA': 'IDJK', 'JAKARTA UTARA': 'IDJK', 'JAKARTA BARAT': 'IDJK',
  'JAKARTA TIMUR': 'IDJK', 'JAKARTA SELATAN': 'IDJK', 'JAKARTA PUSAT': 'IDJK',
  'TANGERANG SELATAN': 'IDBT', 'TANGSEL': 'IDBT',
  'BANDUNG BARAT': 'IDJB'
};

const PROVINSI_NAMA_ = {'IDAC':'Aceh','IDSU':'Sumatera Utara','IDSB':'Sumatera Barat','IDRI':'Riau','IDJA':'Jambi','IDSS':'Sumatera Selatan','IDBE':'Bengkulu','IDLA':'Lampung','IDBB':'Bangka Belitung','IDKR':'Kepulauan Riau','IDJK':'DKI Jakarta','IDJB':'Jawa Barat','IDJT':'Jawa Tengah','IDYO':'DI Yogyakarta','IDJI':'Jawa Timur','IDBT':'Banten','IDBA':'Bali','IDNB':'Nusa Tenggara Barat','IDNT':'Nusa Tenggara Timur','IDKB':'Kalimantan Barat','IDKT':'Kalimantan Tengah','IDKS':'Kalimantan Selatan','IDKI':'Kalimantan Timur','IDKU':'Kalimantan Utara','IDSA':'Sulawesi Utara','IDST':'Sulawesi Tengah','IDSN':'Sulawesi Selatan','IDSG':'Sulawesi Tenggara','IDGO':'Gorontalo','IDSR':'Sulawesi Barat','IDMA':'Maluku','IDMU':'Maluku Utara','IDPB':'Papua Barat','IDPA':'Papua'};

/**
 * Cari kode provinsi (IDxx) dari teks kota/kabupaten bebas (input manual sales).
 * Coba cocokkan teks apa adanya dulu, baru coba tanpa awalan "Kota/Kabupaten/Kab".
 * Return null kalau gak ketemu sama sekali (biar bisa ditampilin sebagai "belum
 * terpetakan" di Dashboard, bukan ke-skip diam-diam).
 */
function lookupProvinsiId_(rawKota) {
  let s = String(rawKota || '').toUpperCase().trim();
  if (!s) return null;
  s = s.replace(/[.,]/g, ' ').replace(/\s+/g, ' ').trim();
  if (KOTA_PROVINSI_ALIAS_TAMBAHAN_[s]) return KOTA_PROVINSI_ALIAS_TAMBAHAN_[s];
  if (KOTA_PROVINSI_MAP_[s]) return KOTA_PROVINSI_MAP_[s];
  const prefixes = ['KABUPATEN ADMINISTRATIF ', 'KOTA ADMINISTRASI ', 'KABUPATEN ', 'KOTA ', 'KAB '];
  let stripped = s;
  for (const p of prefixes) {
    if (stripped.indexOf(p) === 0) { stripped = stripped.slice(p.length).trim(); break; }
  }
  if (stripped !== s) {
    if (KOTA_PROVINSI_ALIAS_TAMBAHAN_[stripped]) return KOTA_PROVINSI_ALIAS_TAMBAHAN_[stripped];
    if (KOTA_PROVINSI_MAP_[stripped]) return KOTA_PROVINSI_MAP_[stripped];
  }
  return null;
}

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

/**
 * Memastikan sebuah kolom (by nama header) ada di sheet.
 * Jika belum ada, kolom baru akan ditambahkan di ujung kanan.
 * Berguna agar sheet lama (yang dibuat sebelum update ini) tetap kompatibel
 * tanpa perlu mengubah struktur sheet secara manual.
 */
function ensureColumnExists_(sh, colName) {
  const lastCol = Math.max(sh.getLastColumn(), 1);
  const headerVals = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h || '').toLowerCase().trim());
  let idx = headerVals.indexOf(colName.toLowerCase().trim());
  if (idx === -1) {
    sh.getRange(1, lastCol + 1).setValue(colName);
    idx = lastCol; // 0-based index kolom baru
  }
  return idx;
}

/**
 * Pastikan kolom dengan header tertentu ada TEPAT di nomor kolom yang
 * ditentukan (1-based; AA = 27). Kalau kolom itu masih kosong, header baru
 * ditulis di situ. Kalau ternyata SUDAH ada isinya (header lain / formula
 * user), TIDAK ditimpa — dipakai apa adanya, biar gak kejadian lagi kayak
 * kasus "Total Pax" yang ke-corrupt.
 */
function ensureColumnAt_(sh, colIndex, headerName) {
  const existing = String(sh.getRange(1, colIndex).getValue() || '').trim();
  if (!existing) {
    sh.getRange(1, colIndex).setValue(headerName);
    return headerName.toLowerCase().trim();
  }
  return existing.toLowerCase().trim();
}

/**
 * Menentukan nama header kolom "Jumlah Pax" (input manual dari form) yang
 * dipakai buat baca/tulis.
 *
 * PENTING: kolom "Total Pax" di sheet InputData adalah FORMULA ARRAY
 * (LAMBDA/MAP) milik user yang otomatis ngitung pax dari OrderItems
 * (match kode produk "WSP"). Kolom itu MURNI live-formula dan TIDAK BOLEH
 * ditulisi/dianggap sama dengan "Jumlah Pax" oleh script — kalau ditulisi
 * value statis, formula array-nya rusak (jadi #REF!). Makanya "Jumlah Pax"
 * harus tetap kolom terpisah yang dikelola sendiri oleh script.
 */
function resolvePaxColumn_(sh) {
  ensureColumnExists_(sh, 'Jumlah Pax');
  return 'jumlah pax';
}

/**
 * Kolom "Perlu Reschedule" (Ya/Tidak) - flag manual buat nandain order yang
 * grupnya minta reschedule tapi tanggal barunya belum pasti/belum diisi.
 * Dipakai supaya (1) kelihatan di Revenue Summary, dan (2) job auto-update
 * status harian (dailyUpdateReservasiStatus) TIDAK menganggap order ini
 * "terjadi hari ini" hanya karena Event Date-nya masih tanggal lama.
 */
function resolveRescheduleColumn_(sh) {
  ensureColumnExists_(sh, 'Perlu Reschedule');
  return 'perlu reschedule';
}

/** Format angka jadi "Rp 1.234.567" buat teks di EventLog biar gampang dibaca. */
function fmtRp_(n) {
  const num = Number(n) || 0;
  return 'Rp ' + num.toLocaleString('id-ID');
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

function resolveFinalStatus_(oldStatus, inputStatus, eventDate, needsReschedule) {
  const oldS = String(oldStatus || '').trim();
  const inS  = String(inputStatus || '').trim();
  if (oldS.toLowerCase() === 'lost' || inS.toLowerCase() === 'lost') return 'Lost';

  // Kalau lagi nunggu reschedule, Event Date yang tersimpan masih tanggal
  // LAMA (belum pasti) - jangan sampai dianggap "terjadi hari ini".
  if (needsReschedule) return inS || oldS || 'On Nego';

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
  const iOrderId = headers.indexOf('order id');
  const iEstate = headers.indexOf('estate');
  const iGrup = headers.indexOf('nama grup');
  const iCreatedEmail = headers.indexOf('created email');
  const iReschedule = headers.indexOf('perlu reschedule');
  const todayYmd = getTodayString_();

  for (let i = 1; i < data.length; i++) {
    const currentS = String(data[i][iStatus] || '').trim();
    const eventYmd = normalizeYmd_(data[i][iEventDate]);
    const needsReschedule = iReschedule !== -1 && String(data[i][iReschedule] || '').trim() === 'Ya';
    if (needsReschedule) continue; // tanggalnya belum pasti, jangan diotak-atik otomatis
    if (currentS.toLowerCase() !== 'lost' && eventYmd === todayYmd && currentS !== 'Reservasi') {
      sh.getRange(i + 1, iStatus + 1).setValue('Reservasi');
      logStatusChange_(
        data[i][iOrderId], data[i][iEstate], data[i][iGrup], data[i][iCreatedEmail],
        currentS, 'Reservasi', 'System (Auto - Event Date)'
      );
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
 *  SAVE / UPDATE / DELETE (Fungsi Asli Kamu + Jumlah Pax)
 ************************************************************/
function saveOrderWithItems(formData, cart, user) {
  try {
    const sh = ensureSheet_(DATA_SHEET, ["Timestamp", "Order ID", "Estate", "Status", "Sumber", "Event Date", "Jam Kedatangan", "Nama PIC", "No Telp", "Nama Grup", "Lembaga", "Regional", "Is Travel Agent", "Travel Agent Kode", "Travel Agent Nama", "Created By", "Created Email", "DP 1", "Tanggal DP", "Pelunasan", "Tanggal Pelunasan", "Sisa Pelunasan", "Revenue", "Jumlah Pax"]);
    // Jaga kompatibilitas untuk sheet lama: pakai kolom "Total Pax" kalau
    // sudah ada (jangan bikin kolom "Jumlah Pax" baru yang duplikat).
    const paxCol = resolvePaxColumn_(sh);
    // "Kota/Kabupaten Asal Grup" harus di kolom AA (kolom ke-27) sesuai request.
    const kotaCol = ensureColumnAt_(sh, 27, 'Kota/Kabupaten Asal Grup');
    const rescheduleCol = resolveRescheduleColumn_(sh);

    const headerRow = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(h => String(h || '').toLowerCase().trim());
    const now = new Date();
    const orderId = "ORD-" + now.getTime();
    const revenue = Array.isArray(cart) ? cart.reduce((a, x) => a + Number(x.total || 0), 0) : 0;
    const dp1 = Number(formData.dp1 || 0);
    const pel = Number(formData.pelunasan || 0);
    const pax = Number(formData.jumlahPax || 0) || maxQtyFromCart_(cart);
    const needsReschedule = !!formData.perluReschedule;
    const finalStatus = resolveFinalStatus_('', formData.status, formData.eventDate, needsReschedule);

    const rowMap = {
      'timestamp': now, 'order id': orderId, 'estate': formData.estate,
      'status': finalStatus,
      'sumber': formData.sumber, 'event date': formData.eventDate, 'jam kedatangan': formData.jamKedatangan,
      'nama pic': formData.namaPIC, 'no telp': formData.noTelp, 'nama grup': formData.namaGrup,
      'lembaga': formData.lembaga, 'regional': user.regional,
      'is travel agent': formData.isTravelAgent ? "Ya" : "Tidak",
      'travel agent kode': formData.travelAgentKode, 'travel agent nama': formData.travelAgentNama,
      'created by': user.nama, 'created email': user.email,
      'dp 1': dp1, 'tanggal dp': formData.tanggalDP, 'pelunasan': pel, 'tanggal pelunasan': formData.tanggalPelunasan,
      'sisa pelunasan': Math.max(revenue - dp1 - pel, 0), 'revenue': revenue
    };
    rowMap[paxCol] = pax;
    rowMap[kotaCol] = formData.kotaAsalGrup || '';
    rowMap[rescheduleCol] = needsReschedule ? 'Ya' : 'Tidak';

    const row = headerRow.map(h => (h in rowMap) ? rowMap[h] : '');
    sh.appendRow(row);

    const shIt = ensureSheet_(ORDER_ITEMS_SHEET, ["Order ID", "Estate", "Kode Produk", "Nama Produk", "Qty", "Harga", "Diskon (%)", "Total", "Created At", "Created By", "Created Email"]);
    if (cart.length > 0) {
      const rows = cart.map(item => [orderId, formData.estate, item.kode, item.nama, item.qty, item.harga, item.diskon, item.total, now, user.nama, user.email]);
      shIt.getRange(shIt.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    }

    logEvent_(
      'Tambah Order', orderId, formData.estate, formData.namaGrup, user.email,
      'Order baru dibuat. Status: ' + finalStatus + (needsReschedule ? ' (Perlu Reschedule)' : '') + ', Revenue: ' + fmtRp_(revenue),
      user.email
    );

    return { success: true, message: "Order #" + orderId + " disimpan", orderId };
  } catch (err) { return { success: false, message: err.toString() }; }
}

/**
 * Catat setiap kali status sebuah order berubah, supaya bisa dihitung
 * berapa yang konversi On Nego -> Booked, On Nego -> Reservasi, -> Lost, dst.
 * Dipanggil dari updateOrderWithItems (edit manual) dan
 * dailyUpdateReservasiStatus (auto-update harian).
 */
function logStatusChange_(orderId, estate, grup, createdEmail, oldStatus, newStatus, changedBy) {
  try {
    const sh = ensureSheet_(STATUS_HISTORY_SHEET, ["Timestamp", "Order ID", "Estate", "Grup", "Created Email", "Status Lama", "Status Baru", "Diubah Oleh"]);
    sh.appendRow([new Date(), orderId, estate, grup, createdEmail, oldStatus, newStatus, changedBy]);
  } catch (e) {
    // Kalau logging gagal, jangan sampai proses update order utamanya ikut gagal.
    console.error('logStatusChange_ gagal: ' + e);
  }
}

/**
 * EVENT LOG - catatan audit untuk SEMUA aksi terhadap data order: bikin baru,
 * update (field apa aja yang berubah), sampai hapus. Beda sama StatusHistory
 * (yang cuma fokus ke transisi status buat hitung konversi) - EventLog ini
 * tujuannya biar ada jejak lengkap tiap order, jadi kalau ada data yang
 * kelihatan aneh/salah/kehapus, bisa ditelusuri siapa yang ubah apa dan kapan.
 */
function logEvent_(action, orderId, estate, grup, createdEmail, detail, changedBy) {
  try {
    const sh = ensureSheet_(EVENT_LOG_SHEET, ["Timestamp", "Order ID", "Estate", "Grup", "Created Email", "Aksi", "Detail", "Oleh"]);
    sh.appendRow([new Date(), orderId, estate, grup, createdEmail, action, detail, changedBy]);
  } catch (e) {
    console.error('logEvent_ gagal: ' + e);
  }
}

/** Field-field yang nilainya duit, biar diformat "Rp ..." di log diff. */
const RUPIAH_FIELDS_ = ['dp 1', 'pelunasan', 'sisa pelunasan', 'revenue'];
/** Field-field tanggal, dinormalisasi ke YYYY-MM-DD dulu sebelum dibandingkan
 *  (biar Date object vs string gak keanggep "berubah" padahal sama). */
const DATE_FIELDS_ = ['event date', 'tanggal dp', 'tanggal pelunasan'];
const FIELD_LABELS_ = {
  'status': 'Status', 'sumber': 'Sumber', 'event date': 'Event Date', 'jam kedatangan': 'Jam Kedatangan',
  'nama pic': 'Nama PIC', 'no telp': 'No Telp', 'nama grup': 'Nama Grup', 'lembaga': 'Lembaga',
  'is travel agent': 'Travel Agent', 'travel agent kode': 'Kode Travel Agent', 'travel agent nama': 'Nama Travel Agent',
  'dp 1': 'DP 1', 'tanggal dp': 'Tanggal DP', 'pelunasan': 'Pelunasan', 'tanggal pelunasan': 'Tanggal Pelunasan',
  'sisa pelunasan': 'Sisa Pelunasan', 'revenue': 'Revenue', 'jumlah pax': 'Jumlah Pax',
  'perlu reschedule': 'Perlu Reschedule', 'kota/kabupaten asal grup': 'Kota Asal Grup'
};

/**
 * Bandingkan nilai lama (dari sheet, sebelum di-update) vs nilai baru
 * (updateMap) untuk tiap field, hasilkan daftar teks "Label: lama -> baru"
 * buat field yang beneran berubah. Dipakai buat catatan di EventLog.
 */
function buildFieldDiff_(headers, oldRow, updateMap) {
  const diffs = [];
  for (let key in updateMap) {
    const col = headers.indexOf(key);
    if (col === -1) continue;
    const oldValRaw = oldRow[col];
    const newValRaw = updateMap[key];
    let oldStr, newStr;
    if (RUPIAH_FIELDS_.indexOf(key) !== -1) {
      oldStr = fmtRp_(oldValRaw); newStr = fmtRp_(newValRaw);
    } else if (DATE_FIELDS_.indexOf(key) !== -1) {
      oldStr = normalizeYmd_(oldValRaw); newStr = normalizeYmd_(newValRaw);
    } else {
      oldStr = String(oldValRaw == null ? '' : oldValRaw).trim();
      newStr = String(newValRaw == null ? '' : newValRaw).trim();
    }
    if (oldStr !== newStr) {
      const label = FIELD_LABELS_[key] || key;
      diffs.push(label + ': ' + (oldStr || '-') + ' \u2192 ' + (newStr || '-'));
    }
  }
  return diffs;
}

function updateOrderWithItems(orderId, header, items, userEmail) {
  try {
    const sh = getSheetByName(DATA_SHEET);
    const paxCol = resolvePaxColumn_(sh);
    const kotaCol = ensureColumnAt_(sh, 27, 'Kota/Kabupaten Asal Grup');
    const rescheduleCol = resolveRescheduleColumn_(sh);

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
    const pax = Number(header.jumlahPax || 0) || maxQtyFromCart_(items);
    const needsReschedule = !!header.perluReschedule;

    const iStatusCol = headers.indexOf('status');
    const oldStatus = String(data[rowIndex-1][iStatusCol] || '').trim();
    const newStatus = resolveFinalStatus_(oldStatus, header.status, header.eventDate, needsReschedule);

    const updateMap = {
      'status': newStatus,
      'sumber': header.sumber, 'event date': header.eventDate, 'jam kedatangan': header.jamKedatangan,
      'nama pic': header.namaPIC, 'no telp': header.noTelp, 'nama grup': header.namaGrup, 'lembaga': header.lembaga,
      'is travel agent': header.isTravelAgent ? "Ya" : "Tidak", 'travel agent kode': header.travelAgentKode, 'travel agent nama': header.travelAgentNama,
      'dp 1': dp1, 'tanggal dp': header.tanggalDP, 'pelunasan': pel, 'tanggal pelunasan': header.tanggalPelunasan,
      'sisa pelunasan': Math.max(revenue - dp1 - pel, 0), 'revenue': revenue
    };
    updateMap[paxCol] = pax;
    updateMap[kotaCol] = header.kotaAsalGrup || '';
    updateMap[rescheduleCol] = needsReschedule ? 'Ya' : 'Tidak';

    const iEstateCol = headers.indexOf('estate');
    const iCreatedEmailCol = headers.indexOf('created email');
    const createdEmail = data[rowIndex-1][iCreatedEmailCol];

    // Rekam diff SEMUA field yang berubah (buat EventLog) SEBELUM ditimpa.
    const diffs = buildFieldDiff_(headers, data[rowIndex-1], updateMap);

    // Kalau statusnya beneran berubah (mis. On Nego -> Booked), catat di
    // StatusHistory supaya bisa dihitung konversi antar status di Dashboard.
    if (oldStatus && newStatus && oldStatus !== newStatus) {
      logStatusChange_(
        orderId,
        data[rowIndex-1][iEstateCol],
        header.namaGrup,
        createdEmail,
        oldStatus,
        newStatus,
        userEmail
      );
    }

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

    if (diffs.length > 0) {
      logEvent_('Update Order', orderId, data[rowIndex-1][iEstateCol], header.namaGrup, createdEmail, diffs.join('; '), userEmail);
    }

    return { success: true, message: "Order #" + orderId + " diperbarui" };
  } catch (err) { return { success: false, message: err.toString() }; }
}

function deleteOrderById(orderId, userEmail) {
  try {
    const sh = getSheetByName(DATA_SHEET);
    const data = sh.getDataRange().getValues();
    const headers = data[0].map(h => String(h || '').toLowerCase().trim());
    const iEstate = headers.indexOf('estate');
    const iGrup = headers.indexOf('nama grup');
    const iStatus = headers.indexOf('status');
    const iRevenue = headers.indexOf('revenue');
    const iEventDate = headers.indexOf('event date');
    const iPic = headers.indexOf('nama pic');
    const iCreatedEmail = headers.indexOf('created email');

    let snapshot = null;
    for (let i = data.length - 1; i >= 1; i--) {
      if (String(data[i][1]).trim() === orderId) {
        // Ambil snapshot data SEBELUM dihapus - begitu deleteRow jalan, data ini hilang selamanya.
        snapshot = {
          estate: data[i][iEstate], grup: data[i][iGrup], status: data[i][iStatus],
          revenue: data[i][iRevenue], eventDate: normalizeYmd_(data[i][iEventDate]),
          pic: data[i][iPic], createdEmail: data[i][iCreatedEmail]
        };
        sh.deleteRow(i + 1);
      }
    }
    const shIt = getSheetByName(ORDER_ITEMS_SHEET);
    const itData = shIt.getDataRange().getValues();
    for (let i = itData.length - 1; i >= 1; i--) {
      if (String(itData[i][0]).trim() === orderId) shIt.deleteRow(i + 1);
    }

    if (snapshot) {
      logEvent_(
        'Hapus Order', orderId, snapshot.estate, snapshot.grup, snapshot.createdEmail,
        'Order dihapus. Status terakhir: ' + snapshot.status + ', Revenue: ' + fmtRp_(snapshot.revenue) +
        ', Event Date: ' + (snapshot.eventDate || '-') + ', PIC: ' + (snapshot.pic || '-'),
        userEmail
      );
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
    const iReschedule = headers.indexOf('perlu reschedule');
    // Revenue di tabel ini juga dari "Total Revenue Sales" (net), bukan "Revenue" mentah.
    const iRevenue = headers.indexOf('total revenue sales') !== -1
      ? headers.indexOf('total revenue sales')
      : headers.indexOf('revenue');

    const searchTerm = filters.search ? String(filters.search).toLowerCase().trim() : "";

    // Konversi tanggal filter
    let startD = filters.startDate ? new Date(filters.startDate) : null;
    let endD = filters.endDate ? new Date(filters.endDate) : null;
    if (startD) startD.setHours(0,0,0,0);
    if (endD) endD.setHours(23,59,59,999);

    let filtered = rawData.slice(1).filter(r => {
      const rowOrderId = String(r[iOrderId] || '');
      const rowEmail = String(r[iCreatedEmail] || '');
      const rowEstate = String(r[iEstate] || '').trim();
      const rowGrup = String(r[iNamaGrup] || '').toLowerCase();
      const tStamp = new Date(r[iTimestamp]);

      // 1. CEK AKSES (WAJIB) - pakai canAccessRow_ biar konsisten sama Dashboard/Kalender
      if (!canAccessRow_(u, rowEstate, rowEmail)) return false;
      
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
      totalRevenue: parseRupiah_(r[iRevenue]),
      perluReschedule: iReschedule !== -1 && String(r[iReschedule] || '').trim() === 'Ya'
    }));

    return { data, totalRows, page, pageSize };
  } catch (e) { 
    return { data: [], totalRows: 0, error: e.toString() }; 
  }
}

/**
 * Toggle cepat flag "Perlu Reschedule" langsung dari tabel Revenue Summary,
 * tanpa perlu buka form edit lengkap. Perubahan ini juga dicatat di EventLog.
 */
function toggleRescheduleFlag(orderId, userEmail) {
  try {
    const sh = getSheetByName(DATA_SHEET);
    const rescheduleCol = resolveRescheduleColumn_(sh);
    const data = sh.getDataRange().getValues();
    const headers = data[0].map(h => String(h || '').toLowerCase().trim());
    const iReschedule = headers.indexOf(rescheduleCol);
    const iEstate = headers.indexOf('estate');
    const iGrup = headers.indexOf('nama grup');
    const iCreatedEmail = headers.indexOf('created email');

    let rowIndex = -1;
    for (let r = 1; r < data.length; r++) {
      if (String(data[r][1]).trim() === orderId) { rowIndex = r + 1; break; }
    }
    if (rowIndex === -1) return { success: false, message: "Order tidak ditemukan" };

    const currentlyFlagged = String(data[rowIndex-1][iReschedule] || '').trim() === 'Ya';
    const newValue = currentlyFlagged ? 'Tidak' : 'Ya';
    sh.getRange(rowIndex, iReschedule + 1).setValue(newValue);

    logEvent_(
      'Update Order', orderId, data[rowIndex-1][iEstate], data[rowIndex-1][iGrup], data[rowIndex-1][iCreatedEmail],
      'Perlu Reschedule: ' + (currentlyFlagged ? 'Ya' : 'Tidak') + ' \u2192 ' + newValue,
      userEmail
    );

    return { success: true, message: newValue === 'Ya' ? "Ditandai perlu reschedule" : "Tanda reschedule dilepas", perluReschedule: newValue === 'Ya' };
  } catch (err) { return { success: false, message: err.toString() }; }
}

/**
 * Ambil catatan EventLog (audit trail) buat ditampilkan di halaman
 * "Log Aktivitas" - mirip pola getRevenueSummaryForUser (filter tanggal,
 * search, pagination), tapi sumbernya sheet EventLog & filter tanggal
 * berdasarkan KAPAN aksi itu terjadi (Timestamp di EventLog).
 */
function getEventLog(userEmail, filters = {}) {
  try {
    const u = getUserByEmail_(userEmail);
    if (!u) return { data: [], totalRows: 0 };

    // Log Aktivitas cuma buat Admin - bukan cuma disembunyikan di tampilan,
    // tapi emang di-block di server. Role lain (Manager/Sales/Telemarketing)
    // sama sekali gak dikasih data apapun dari sini.
    if (!isAdminRole_(u.jabatan)) {
      return { data: [], totalRows: 0, message: "Akses ditolak. Log Aktivitas hanya bisa diakses oleh Admin." };
    }

    const sh = getSheetByName(EVENT_LOG_SHEET);
    if (!sh) return { data: [], totalRows: 0 };
    const rawData = sh.getDataRange().getValues();
    if (rawData.length < 2) return { data: [], totalRows: 0 };

    const headers = rawData[0].map(h => String(h || '').toLowerCase().trim());
    const iTimestamp = headers.indexOf('timestamp');
    const iOrderId = headers.indexOf('order id');
    const iEstate = headers.indexOf('estate');
    const iGrup = headers.indexOf('grup');
    const iAksi = headers.indexOf('aksi');
    const iDetail = headers.indexOf('detail');
    const iOleh = headers.indexOf('oleh');

    const searchTerm = filters.search ? String(filters.search).toLowerCase().trim() : "";

    let startD = filters.startDate ? new Date(filters.startDate) : null;
    let endD = filters.endDate ? new Date(filters.endDate) : null;
    if (startD) startD.setHours(0,0,0,0);
    if (endD) endD.setHours(23,59,59,999);

    // Admin lihat SEMUA baris tanpa batasan estate/regional/created-email -
    // gak perlu canAccessRow_ di sini karena aksesnya memang global buat Admin.
    let filtered = rawData.slice(1).filter(r => {
      const rowEstate = String(r[iEstate] || '').trim();
      const rowGrup = String(r[iGrup] || '').toLowerCase();
      const rowOrderId = String(r[iOrderId] || '');
      const rowAksi = String(r[iAksi] || '').toLowerCase();
      const rowOleh = String(r[iOleh] || '').toLowerCase();
      const tStamp = new Date(r[iTimestamp]);

      if (searchTerm !== "") {
        return rowGrup.includes(searchTerm) || rowOrderId.toLowerCase().includes(searchTerm) ||
               rowEstate.toLowerCase().includes(searchTerm) || rowAksi.includes(searchTerm) || rowOleh.includes(searchTerm);
      }

      if (startD && tStamp < startD) return false;
      if (endD && tStamp > endD) return false;

      return rowOrderId !== "";
    });

    filtered.sort((a, b) => new Date(b[iTimestamp]) - new Date(a[iTimestamp]));

    const totalRows = filtered.length;
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 50;

    const data = filtered.slice((page - 1) * pageSize, page * pageSize).map(r => ({
      timestamp: formatSheetDate_(r[iTimestamp]) + ' ' + Utilities.formatDate(new Date(r[iTimestamp]), TIMEZONE, "HH:mm"),
      orderId: r[iOrderId],
      estate: r[iEstate],
      grup: r[iGrup],
      aksi: r[iAksi],
      detail: r[iDetail],
      oleh: r[iOleh]
    }));

    return { data, totalRows, page, pageSize };
  } catch (e) {
    return { data: [], totalRows: 0, error: e.toString() };
  }
}

/************************************************************
 *  DASHBOARD ANALYTICS (BARU)
 *  - getDashboardData: KPI, tren harian, breakdown per estate, status
 *  - getCalendarData: jumlah grup/pax/revenue per tanggal untuk 1 bulan,
 *    plus detail lengkap per item (dipakai untuk carousel detail di FE)
 *
 *  Akses data mengikuti aturan yang sama dengan getRevenueSummaryForUser:
 *  - Sales/Telemarketing (isInputRole_) hanya melihat order yang mereka buat sendiri
 *  - Role lain (mis. Manager/Admin) melihat semua order pada estate yang
 *    sesuai dengan regional mereka
 *
 *  CATATAN soal "Pax": jika kolom "Jumlah Pax" pada InputData sudah diisi
 *  (via form input), nilai itu yang dipakai. Jika kosong (data lama),
 *  sistem memakai estimasi otomatis = qty produk terbesar dalam order
 *  tersebut (lihat getPaxMapFromItems_). Estimasi ini tidak selalu akurat
 *  100%, jadi disarankan mengisi field "Jumlah Pax" di form input mulai
 *  sekarang agar datanya presisi.
 ************************************************************/
function canAccessRow_(u, rowEstate, rowCreatedEmail) {
  if (isAdminRole_(u.jabatan)) return true; // Admin: lihat semua data tanpa batasan
  if (isInputRole_(u.jabatan)) {
    return String(rowCreatedEmail || '').toLowerCase().trim() === String(u.email || '').toLowerCase().trim();
  }
  const allowed = allowedEstatesByRegional_(u.regional);
  return allowed.includes(String(rowEstate || '').trim());
}

/**
 * Hitung ringkasan konversi status (mis. berapa order yang tadinya "On Nego"
 * jadi "Booked", berapa yang jadi "Reservasi", berapa yang "Lost") dari
 * sheet StatusHistory. Dipakai di Dashboard Analitik.
 */
function getStatusConversionSummary_(u, filters, startD, endD) {
  try {
    const sh = getSheetByName(STATUS_HISTORY_SHEET);
    if (!sh) return { transitions: [], totalTransitions: 0, byEstate: [] };
    const data = sh.getDataRange().getValues();
    if (data.length < 2) return { transitions: [], totalTransitions: 0, byEstate: [] };

    const headers = data[0].map(h => String(h || '').toLowerCase().trim());
    const iTimestamp = headers.indexOf('timestamp');
    const iEstate = headers.indexOf('estate');
    const iCreatedEmail = headers.indexOf('created email');
    const iOldStatus = headers.indexOf('status lama');
    const iNewStatus = headers.indexOf('status baru');

    const estateFilter = filters.estate ? String(filters.estate).trim() : '';
    const statusFilter = filters.status ? String(filters.status).trim() : '';
    const regionalFilter = filters.regional ? String(filters.regional).trim() : '';
    const regionalEstates = regionalFilter ? allowedEstatesByRegional_(regionalFilter) : null;

    const pairMap = {};       // "Lama|||Baru" -> count (gabungan semua estate)
    const estatePairMap = {}; // estate -> { "Lama|||Baru" -> count }
    let totalTransitions = 0;

    for (let i = 1; i < data.length; i++) {
      const r = data[i];
      const rowEstate = String(r[iEstate] || '-').trim();
      const rowCreatedEmail = String(r[iCreatedEmail] || '');
      if (!canAccessRow_(u, rowEstate, rowCreatedEmail)) continue;
      if (estateFilter && rowEstate !== estateFilter) continue;
      if (regionalEstates && !regionalEstates.includes(rowEstate)) continue;

      // Rentang tanggal dashboard difilter berdasarkan KAPAN perubahan status
      // itu terjadi (Timestamp di StatusHistory), bukan Event Date order-nya.
      const ts = r[iTimestamp] ? new Date(r[iTimestamp]) : null;
      const tsValid = ts && !isNaN(ts.getTime());
      if (startD && (!tsValid || ts < startD)) continue;
      if (endD && (!tsValid || ts > endD)) continue;

      const oldStatus = String(r[iOldStatus] || '-').trim() || '-';
      const newStatus = String(r[iNewStatus] || '-').trim() || '-';
      if (!matchesStatusFilter_(newStatus, statusFilter)) continue;

      const key = oldStatus + '|||' + newStatus;
      pairMap[key] = (pairMap[key] || 0) + 1;
      totalTransitions += 1;

      if (!estatePairMap[rowEstate]) estatePairMap[rowEstate] = {};
      estatePairMap[rowEstate][key] = (estatePairMap[rowEstate][key] || 0) + 1;
    }

    const transitions = Object.keys(pairMap).map(key => {
      const parts = key.split('|||');
      return { from: parts[0], to: parts[1], count: pairMap[key] };
    }).sort((a, b) => b.count - a.count);

    const byEstate = Object.keys(estatePairMap).map(estate => {
      const pairs = estatePairMap[estate];
      const estTransitions = Object.keys(pairs).map(key => {
        const parts = key.split('|||');
        return { from: parts[0], to: parts[1], count: pairs[key] };
      }).sort((a, b) => b.count - a.count);
      const total = estTransitions.reduce((s, t) => s + t.count, 0);
      return { estate, transitions: estTransitions, total };
    }).sort((a, b) => b.total - a.total);

    return { transitions, totalTransitions, byEstate };
  } catch (e) {
    return { transitions: [], totalTransitions: 0, byEstate: [] };
  }
}

function getDashboardData(userEmail, filters) {
  filters = filters || {};
  try {
    const u = getUserByEmail_(userEmail);
    if (!u) return { success: false, message: "User tidak ditemukan" };

    const sh = getSheetByName(DATA_SHEET);
    if (!sh) return { success: false, message: "Sheet InputData tidak ditemukan" };
    const rawData = sh.getDataRange().getValues();
    if (rawData.length < 2) {
      return { success: true, summary: { totalRevenue: 0, totalGroups: 0, totalPax: 0, avgRevenuePerGroup: 0 }, estateBreakdown: [], trend: [], statusBreakdown: [], statusConversion: { transitions: [], totalTransitions: 0, byEstate: [] } };
    }

    const headers = rawData[0].map(h => String(h || '').toLowerCase().trim());
    const iOrderId = headers.indexOf('order id');
    const iEstate = headers.indexOf('estate');
    const iStatus = headers.indexOf('status');
    const iEventDate = headers.indexOf('event date');
    const iCreatedEmail = headers.indexOf('created email');
    // Revenue yang dipakai di Dashboard HARUS dari kolom "Total Revenue Sales"
    // (net revenue yang beneran masuk ke sales/perusahaan), BUKAN kolom "Revenue"
    // mentah dari keranjang — karena gak semua produk revenue-nya masuk ke kita.
    // Fallback ke 'revenue' kalau kolom itu gak ketemu, biar gak error total.
    const iRevenue = headers.indexOf('total revenue sales') !== -1
      ? headers.indexOf('total revenue sales')
      : headers.indexOf('revenue');
    // "Jumlah Pax" = input manual dari form (dikelola script). JANGAN baca
    // dari "Total Pax" — itu formula array terpisah milik user sendiri.
    const iPax = headers.indexOf('jumlah pax');
    const iKotaAsal = headers.indexOf('kota/kabupaten asal grup');

    const paxFallback = getPaxMapFromItems_();

    let startD = filters.startDate ? new Date(filters.startDate) : null;
    let endD = filters.endDate ? new Date(filters.endDate) : null;
    if (startD) startD.setHours(0,0,0,0);
    if (endD) endD.setHours(23,59,59,999);
    const estateFilter = filters.estate ? String(filters.estate).trim() : '';
    const statusFilter = filters.status ? String(filters.status).trim() : '';
    const regionalFilter = filters.regional ? String(filters.regional).trim() : '';
    const regionalEstates = regionalFilter ? allowedEstatesByRegional_(regionalFilter) : null;

    let totalRevenue = 0, totalPax = 0, totalGroups = 0;
    const estateMap = {};
    const dailyMap = {};
    const statusMap = {};
    const originMap = {};       // provinceId -> {groups, revenue, pax}
    const unmatchedKotaMap = {}; // teks kota mentah yang gak ketemu provinsinya -> jumlah

    for (let i = 1; i < rawData.length; i++) {
      const r = rawData[i];
      const orderId = String(r[iOrderId] || '').trim();
      if (!orderId) continue;

      const rowEstate = String(r[iEstate] || '-').trim();
      const rowCreatedEmail = String(r[iCreatedEmail] || '');
      if (!canAccessRow_(u, rowEstate, rowCreatedEmail)) continue;
      if (estateFilter && rowEstate !== estateFilter) continue;
      if (regionalEstates && !regionalEstates.includes(rowEstate)) continue;

      const status = String(r[iStatus] || '-').trim() || '-';
      if (!matchesStatusFilter_(status, statusFilter)) continue;

      // Basis waktu tren & filter tanggal memakai Event Date (tanggal kunjungan), bukan timestamp input
      const evRaw = r[iEventDate];
      const evDate = evRaw ? new Date(evRaw) : null;
      const evValid = evDate && !isNaN(evDate.getTime());
      if (startD && (!evValid || evDate < startD)) continue;
      if (endD && (!evValid || evDate > endD)) continue;

      const revenue = parseRupiah_(r[iRevenue]);
      let pax = iPax !== -1 ? (Number(r[iPax]) || 0) : 0;
      if (!pax) pax = paxFallback[orderId] || 0;
      const evYmd = evValid ? formatSheetDate_(evRaw) : '';

      totalRevenue += revenue;
      totalPax += pax;
      totalGroups += 1;
      statusMap[status] = (statusMap[status] || 0) + 1;

      if (!estateMap[rowEstate]) estateMap[rowEstate] = { estate: rowEstate, revenue: 0, groups: 0, pax: 0 };
      estateMap[rowEstate].revenue += revenue;
      estateMap[rowEstate].groups += 1;
      estateMap[rowEstate].pax += pax;

      if (evYmd) {
        if (!dailyMap[evYmd]) dailyMap[evYmd] = { date: evYmd, revenue: 0, groups: 0, pax: 0 };
        dailyMap[evYmd].revenue += revenue;
        dailyMap[evYmd].groups += 1;
        dailyMap[evYmd].pax += pax;
      }

      // Peta asal grup (kalau kolomnya ada & diisi)
      if (iKotaAsal !== -1) {
        const kotaRaw = String(r[iKotaAsal] || '').trim();
        if (kotaRaw) {
          const provId = lookupProvinsiId_(kotaRaw);
          if (provId) {
            if (!originMap[provId]) originMap[provId] = { groups: 0, revenue: 0, pax: 0 };
            originMap[provId].groups += 1;
            originMap[provId].revenue += revenue;
            originMap[provId].pax += pax;
          } else {
            const key = kotaRaw.toUpperCase();
            unmatchedKotaMap[key] = (unmatchedKotaMap[key] || 0) + 1;
          }
        }
      }
    }

    const estateBreakdown = Object.keys(estateMap).map(k => estateMap[k]).sort((a, b) => b.revenue - a.revenue);
    const trend = Object.keys(dailyMap).map(k => dailyMap[k]).sort((a, b) => a.date.localeCompare(b.date));
    const statusBreakdown = Object.keys(statusMap).map(k => ({ status: k, count: statusMap[k] }));

    const originByProvince = Object.keys(originMap).map(pid => ({
      provinceId: pid,
      provinceName: PROVINSI_NAMA_[pid] || pid,
      groups: originMap[pid].groups,
      revenue: originMap[pid].revenue,
      pax: originMap[pid].pax
    })).sort((a, b) => b.groups - a.groups);

    const unmatchedOrigins = Object.keys(unmatchedKotaMap)
      .map(k => ({ kota: k, count: unmatchedKotaMap[k] }))
      .sort((a, b) => b.count - a.count);

    const statusConversion = getStatusConversionSummary_(u, filters, startD, endD);

    return {
      success: true,
      summary: {
        totalRevenue,
        totalGroups,
        totalPax,
        avgRevenuePerGroup: totalGroups ? Math.round(totalRevenue / totalGroups) : 0
      },
      estateBreakdown,
      trend,
      statusBreakdown,
      statusConversion,
      originByProvince,
      unmatchedOrigins
    };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

function getCalendarData(userEmail, year, month, filters) {
  // month: 1-12; filters (opsional): { estate, status }
  filters = filters || {};
  try {
    const u = getUserByEmail_(userEmail);
    if (!u) return { success: false, message: "User tidak ditemukan" };

    const sh = getSheetByName(DATA_SHEET);
    if (!sh) return { success: true, days: {} };
    const rawData = sh.getDataRange().getValues();
    if (rawData.length < 2) return { success: true, days: {} };

    const headers = rawData[0].map(h => String(h || '').toLowerCase().trim());
    const iOrderId = headers.indexOf('order id');
    const iEstate = headers.indexOf('estate');
    const iStatus = headers.indexOf('status');
    const iEventDate = headers.indexOf('event date');
    const iCreatedEmail = headers.indexOf('created email');
    const iNamaGrup = headers.indexOf('nama grup');
    // Sama kayak Dashboard & Revenue Summary: revenue dari "Total Revenue Sales" (net).
    const iRevenue = headers.indexOf('total revenue sales') !== -1
      ? headers.indexOf('total revenue sales')
      : headers.indexOf('revenue');
    // "Jumlah Pax" = input manual (dikelola script), bukan "Total Pax" (formula user).
    const iPax = headers.indexOf('jumlah pax');
    // Kolom tambahan untuk detail lengkap per item di modal kalender
    const iNamaPIC = headers.indexOf('nama pic');
    const iNoTelp = headers.indexOf('no telp');
    const iSumber = headers.indexOf('sumber');
    const iLembaga = headers.indexOf('lembaga');
    const iJam = headers.indexOf('jam kedatangan');

    const paxFallback = getPaxMapFromItems_();
    const estateFilter = filters.estate ? String(filters.estate).trim() : '';
    const statusFilter = filters.status ? String(filters.status).trim() : '';
    const regionalFilter = filters.regional ? String(filters.regional).trim() : '';
    const regionalEstates = regionalFilter ? allowedEstatesByRegional_(regionalFilter) : null;
    const days = {};

    for (let i = 1; i < rawData.length; i++) {
      const r = rawData[i];
      const orderId = String(r[iOrderId] || '').trim();
      if (!orderId) continue;

      const rowEstate = String(r[iEstate] || '-').trim();
      const rowCreatedEmail = String(r[iCreatedEmail] || '');
      if (!canAccessRow_(u, rowEstate, rowCreatedEmail)) continue;
      if (estateFilter && rowEstate !== estateFilter) continue;
      if (regionalEstates && !regionalEstates.includes(rowEstate)) continue;

      const rowStatus = String(r[iStatus] || '').trim();
      if (!matchesStatusFilter_(rowStatus, statusFilter)) continue;

      const evRaw = r[iEventDate];
      if (!evRaw) continue;
      const evDate = new Date(evRaw);
      if (isNaN(evDate.getTime())) continue;
      if ((evDate.getMonth() + 1) !== Number(month) || evDate.getFullYear() !== Number(year)) continue;

      const ymd = formatSheetDate_(evRaw);
      let pax = iPax !== -1 ? (Number(r[iPax]) || 0) : 0;
      if (!pax) pax = paxFallback[orderId] || 0;
      const revenue = parseRupiah_(r[iRevenue]);

      if (!days[ymd]) days[ymd] = { groups: 0, pax: 0, revenue: 0, items: [] };
      days[ymd].groups += 1;
      days[ymd].pax += pax;
      days[ymd].revenue += revenue;
      days[ymd].items.push({
        orderId: orderId,
        namaGrup: String(r[iNamaGrup] || ''),
        estate: rowEstate,
        status: rowStatus,
        namaPIC: iNamaPIC !== -1 ? String(r[iNamaPIC] || '') : '',
        noTelp: iNoTelp !== -1 ? String(r[iNoTelp] || '') : '',
        sumber: iSumber !== -1 ? String(r[iSumber] || '') : '',
        lembaga: iLembaga !== -1 ? String(r[iLembaga] || '') : '',
        jamKedatangan: iJam !== -1 ? formatSheetTime_(r[iJam]) : '',
        pax: pax,
        revenue: revenue
      });
    }

    return { success: true, days };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

/**
 * Estimasi pax dari OrderItems ketika kolom "Jumlah Pax" pada InputData kosong.
 * Memakai qty TERBESAR di antara item2 dalam 1 order (bukan jumlah semua qty),
 * karena biasanya tiap produk (tiket wisata, makan, dst) qty-nya = jumlah orang,
 * sehingga menjumlahkan semua qty akan menghasilkan angka yang berlipat ganda.
 */
function getPaxMapFromItems_() {
  const sh = getSheetByName(ORDER_ITEMS_SHEET);
  if (!sh) return {};
  const vals = sh.getDataRange().getValues();
  const map = {};
  for (let i = 1; i < vals.length; i++) {
    const orderId = String(vals[i][0] || '').trim();
    if (!orderId) continue;
    const qty = Number(vals[i][4]) || 0;
    if (!map[orderId] || qty > map[orderId]) map[orderId] = qty;
  }
  return map;
}

function maxQtyFromCart_(cart) {
  if (!Array.isArray(cart) || cart.length === 0) return 0;
  return cart.reduce((m, x) => Math.max(m, Number(x.qty) || 0), 0);
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

/**
 * Role Admin: dikasih akses penuh lihat SEMUA data, semua estate, semua
 * regional, semua user — dipakai di canAccessRow_. Role ini TIDAK ada di
 * form register publik (sama kayak Manager); assign manual lewat kolom
 * "Jabatan" di sheet Users.
 */
function isAdminRole_(jabatan) {
  return String(jabatan || '').toLowerCase().trim() === 'admin';
}

/**
 * Cocokkan status baris data dengan filter status dari dashboard.
 * "Actual" adalah status gabungan (bukan status asli di sheet) yang
 * mewakili "Booked" + "Reservasi" sekaligus — dipakai di Dashboard Analitik
 * & Kalender supaya user bisa lihat total order yang udah "jadi" tanpa
 * peduli itu Booked atau Reservasi.
 */
function matchesStatusFilter_(rowStatus, statusFilter) {
  if (!statusFilter) return true;
  if (statusFilter === 'Actual') {
    return rowStatus === 'Booked' || rowStatus === 'Reservasi';
  }
  return rowStatus === statusFilter;
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
    const headers = data[0].map(h => String(h || '').toLowerCase().trim());
    const iPax = headers.indexOf('jumlah pax');

    // Cari semua kolom berdasarkan NAMA HEADER (bukan nomor kolom tetap),
    // biar tahan kalau urutan/jumlah kolom di sheet berubah (mis. ada kolom
    // tambahan yang disisipkan user buat spreadsheet reporting mereka).
    const iEstate = headers.indexOf('estate');
    const iStatus = headers.indexOf('status');
    const iSumber = headers.indexOf('sumber');
    const iEventDate = headers.indexOf('event date');
    const iJam = headers.indexOf('jam kedatangan');
    const iNamaPIC = headers.indexOf('nama pic');
    const iNoTelp = headers.indexOf('no telp');
    const iNamaGrup = headers.indexOf('nama grup');
    const iLembaga = headers.indexOf('lembaga');
    const iIsTA = headers.indexOf('is travel agent');
    const iTAKode = headers.indexOf('travel agent kode');
    const iTANama = headers.indexOf('travel agent nama');
    const iDp1 = headers.indexOf('dp 1');
    const iTglDp = headers.indexOf('tanggal dp');
    const iPelunasan = headers.indexOf('pelunasan');
    const iTglPelunasan = headers.indexOf('tanggal pelunasan');
    const iKotaAsal = headers.indexOf('kota/kabupaten asal grup');
    const iReschedule = headers.indexOf('perlu reschedule');

    // 1. Cari Header (ID di Kolom B / Indeks 1)
    const row = data.find(r => String(r[1]).trim() === targetId);
    if (!row) return { success: false, message: "Order ID tidak ditemukan di InputData" };

    // Helper ambil nilai kolom dengan aman (kalau header gak ketemu, -1)
    const g = (idx) => (idx !== -1 ? row[idx] : '');

    // Fungsi pembantu agar tanggal jadi string bersih YYYY-MM-DD
    const fDt = (v) => (v instanceof Date) ? Utilities.formatDate(v, TIMEZONE, "yyyy-MM-dd") : String(v || "");

    const header = {
      orderId: targetId,
      estate: String(g(iEstate) || ""),
      status: String(g(iStatus) || ""),
      sumber: String(g(iSumber) || ""),
      eventDate: fDt(g(iEventDate)),
      jamKedatangan: formatSheetTime_(g(iJam)),
      namaPIC: String(g(iNamaPIC) || ""),
      noTelp: String(g(iNoTelp) || ""),
      namaGrup: String(g(iNamaGrup) || ""),
      lembaga: String(g(iLembaga) || ""),
      isTravelAgent: String(g(iIsTA)).toLowerCase() === 'ya',
      travelAgentKode: String(g(iTAKode) || ""),
      travelAgentNama: String(g(iTANama) || ""),
      dp1: Number(g(iDp1)) || 0,
      tanggalDP: fDt(g(iTglDp)),
      pelunasan: Number(g(iPelunasan)) || 0,
      tanggalPelunasan: fDt(g(iTglPelunasan)),
      kotaAsalGrup: String(g(iKotaAsal) || ""),
      jumlahPax: iPax !== -1 ? (Number(row[iPax]) || 0) : 0,
      perluReschedule: String(g(iReschedule)).toLowerCase() === 'ya'
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

/************************************************************
 *  FORGOT / RESET PASSWORD (Self-Service, langsung timpa)
 *  User cukup masukkan email + password baru, langsung di-update
 *  di sheet Users. Tanpa kode verifikasi / email (biar gak
 *  kebentur izin MailApp.sendEmail).
 ************************************************************/
function resetPasswordDirect(email, newPassword) {
  try {
    const mail = String(email || "").trim().toLowerCase();
    if (!mail) return { success: false, message: "Email wajib diisi." };
    if (!newPassword || String(newPassword).length < 6) {
      return { success: false, message: "Password baru minimal 6 karakter." };
    }

    const usersSh = ensureSheet_(USERS_SHEET, ["Nama", "Email", "Password", "Jabatan", "Regional"]);
    const users = usersSh.getDataRange().getValues();
    let userRow = -1;
    for (let i = 1; i < users.length; i++) {
      if (String(users[i][1]).trim().toLowerCase() === mail) { userRow = i; break; }
    }
    if (userRow === -1) return { success: false, message: "Email tidak terdaftar." };

    // Update password (kolom C / index 2), 1-based row = userRow + 1
    usersSh.getRange(userRow + 1, 3).setValue(hashPassword(newPassword));

    return { success: true, message: "Password berhasil direset. Silakan login dengan password baru." };
  } catch (err) {
    return { success: false, message: "Error: " + err };
  }
}
