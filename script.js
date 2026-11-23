// ====== DATA FILM ======
// CARA TAMBAH FILM: salin satu baris, ganti id (harus beda), judul, genre, durasi, harga, dan gambar.
// Taruh gambar poster di folder "img" lalu tulis nama filenya di "gambar".
// Kalau gambar belum ada, otomatis tampil warna polos + judul film.
const films = [
  {id:1, judul:"DILAN",                  genre:"ROMANCE",         durasi:"2j 12m", harga:80000,  gambar:"img/romancedilan.jpeg", warna:["#2b2d42","#0b0c14"]},
  {id:3, judul:"HOME ALONE",             genre:"KOMEDI",        durasi:"2j 3m",  harga:35000,  gambar:"img/comedihomealone.jpeg", warna:["#2a9d8f","#16524b"]},
  {id:4, judul:"MALEFICENT",             genre:"ACTION",        durasi:"97m",    harga:35000,  gambar:"img/actionmale.jpeg", warna:["#d65a8a","#7a2349"]},
  {id:5, judul:"TITUT WAKTU MAGRIB",     genre:"HORMED",        durasi:"90m",    harga:50000, gambar:"img/horortitut.jpeg", warna:["#1d6fa5","#0b2f4a"]},
  {id:6, judul:"DANUR",                  genre:"HOROR",         durasi:"2j 5m",  harga:50000,  gambar:"img/horordanur.jpeg", warna:["#8a6d1f","#3d2f08"]},
  {id:7, judul:"ANCIKA",                 genre:"ROMANCE",       durasi:"2j",     harga:80000, gambar:"img/romanceancika.jpeg", warna:["#8a6d1f","#3d2f08"]},
  {id:8, judul:"SPONGEBOB",              genre:"COMEDI",        durasi:"90m",    harga:30000, gambar:"img/sepombob.jpeg", warna:["#1d6fa5","#0b2f4a"]},
  {id:9, judul:"SPIDERMAN",              genre:"ACTION",        durasi:"2j 5m",  harga:70000, gambar:"img/spidermen.jpeg", warna:["#8a6d1f","#3d2f08"]},
  {id:10, judul:"AVENGERS",              genre:"ACTION",        durasi:"2j",     harga:70000, gambar:"img/avengers.jpeg", warna:["#8a6d1f","#3d2f08"]},
  {id:11, judul:"AVATAR",                genre:"KOMEDI",        durasi:"2j 10m", harga:80000, gambar:"img/avatar.jpeg", warna:["#E4572E","#7a2a14"]},
  {id:12, judul:"KARATE KID",          genre:"ACTION",        durasi:"2j 12m", harga:35000,  gambar:"img/karatekid.jpeg", warna:["#2b2d42","#0b0c14"]},
  {id:13, judul:"IT CHAPTER TWO",        genre:"HOROR",         durasi:"2j 3m",  harga:40000, gambar:"img/it.jpeg", warna:["#2a9d8f","#16524b"]},
  {id:14, judul:"THE NUN",               genre:"HOROR",         durasi:"97m",    harga:50000,  gambar:"img/thenun.jpeg", warna:["#d65a8a","#7a2349"]},
  {id:15, judul:"TRAIN TO BUSAN",        genre:"THRILLER",        durasi:"90m",    harga:60000, gambar:"img/traintpbusan.jpeg", warna:["#1d6fa5","#0b2f4a"]},
  {id:16, judul:"THE MEG",               genre:"ACTION",        durasi:"2j 5m",  harga:50000, gambar:"img/themeg.jpeg", warna:["#8a6d1f","#3d2f08"]},
  {id:17, judul:"VENOM",                 genre:"ACTION",        durasi:"2j",     harga:70000, gambar:"img/venom.jpeg", warna:["#8a6d1f","#3d2f08"]},
  {id:18, judul:"BRIDS OF PREY",         genre:"ACTION/KOMEDI", durasi:"90m",    harga:70000,  gambar:"img/bridsofprey.jpeg", warna:["#1d6fa5","#0b2f4a"]},
  {id:19, judul:"BLACK X WIDOW",         genre:"ACTION",        durasi:"2j 5m",  harga:50000, gambar:"img/black.jpeg", warna:["#8a6d1f","#3d2f08"]},
  {id:20, judul:"FALL",                  genre:"ACTION/HOROR",  durasi:"2j",     harga:50000, gambar:"img/fall.jpeg", warna:["#8a6d1f","#3d2f08"]},
  {id:21, judul:"DAMSEL",                genre:"ACTION",        durasi:"2j",     harga:60000, gambar:"img/damsel.jpeg", warna:["#8a6d1f","#3d2f08"]},
];

// ====== DATA TIM ======
// Taruh foto di folder "img" lalu tulis nama filenya di "foto".
// Kalau foto belum ada, otomatis tampil inisial nama.
const tim = [
  {nama:"Sefty Comala Sari", peran:"Desain Web", foto:"img/mala2.jpeg", warna:"#E4572E"},
  {nama:"Aliya Sahrin",      peran:"Desain Web", foto:"img/alya.jpeg",  warna:"#0F4C4A"},
  {nama:"Fauziah Hasanah",   peran:"PPT",        foto:"img/ziah.jpeg",  warna:"#d65a8a"},
  {nama:"Nadiya Septiyani",  peran:"PPT",        foto:"img/nadiya.jpeg",warna:"#1d6fa5"},
];
const metode = ["GoPay","OVO","DANA","ShopeePay","QRIS","Transfer BCA","Transfer Mandiri","Kartu Kredit"];
const BIAYA_LAYANAN = 3000;

// ====== STATE & STORAGE ======
const rp = n => "Rp" + n.toLocaleString("id-ID");
const load = (k,d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k,v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

let users = load("tk_users", []);
let session = load("tk_session", null);   // {nama,email}
let cart = load("tk_cart", []);
let selected = null, qty = 1, mode = "login";

const $ = id => document.getElementById(id);

// ====== NAVIGASI ======
function goPage(name){
  document.querySelectorAll(".page").forEach(p => p.classList.toggle("active", p.id === "page-" + name));
  document.querySelectorAll(".topbar nav button").forEach(b => b.classList.toggle("on", b.dataset.page === name));
  if(name === "keranjang") renderCart();
  if(name === "tiket") renderTickets();
  window.scrollTo(0,0);
}
document.querySelectorAll("[data-page]").forEach(el => el.addEventListener("click", e => {
  e.preventDefault(); goPage(el.dataset.page);
}));
function toast(msg){ const t=$("toast"); t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),2200); }

// ====== FILM ======
function renderFilms(){
  $("filmGrid").innerHTML = films.map(f => `
    <article class="film">
      <div class="poster" style="background:linear-gradient(160deg,${f.warna[0]},${f.warna[1]})">
        <img src="${f.gambar}" alt="Poster ${f.judul}" onerror="this.remove()">
        <span>${f.judul}</span>
      </div>
      <div class="film-body">
        <small>${f.genre} • ${f.durasi}</small>
        <div class="price">${rp(f.harga)} / tiket</div>
        <button class="btn full" style="margin-top:0" onclick="openFilm(${f.id})">Pilih jadwal</button>
      </div>
    </article>`).join("");
}
function today(){ const d=new Date(); d.setMinutes(d.getMinutes()-d.getTimezoneOffset()); return d.toISOString().slice(0,10); }
function openFilm(id){
  selected = films.find(f => f.id === id); qty = 1;
  $("mTitle").textContent = selected.judul;
  $("mInfo").textContent = `${selected.genre} • ${selected.durasi}`;
  $("mDate").min = today(); $("mDate").value = today();
  updatePrice();
  $("modalFilm").classList.remove("hidden");
}
function updatePrice(){ $("qVal").textContent = qty; $("mPrice").textContent = rp(selected.harga * qty); }
$("qMin").onclick = () => { if(qty>1){ qty--; updatePrice(); } };
$("qPlus").onclick = () => { if(qty<10){ qty++; updatePrice(); } };
$("btnAdd").onclick = () => {
  if(!$("mDate").value){ toast("Pilih tanggal dulu"); return; }
  cart.push({uid:Date.now(), filmId:selected.id, judul:selected.judul, tanggal:$("mDate").value,
             jam:$("mTime").value, qty, harga:selected.harga});
  save("tk_cart", cart); updateCount();
  $("modalFilm").classList.add("hidden");
  toast("Ditambahkan ke keranjang");
};

// ====== KERANJANG ======
function updateCount(){ $("cartCount").textContent = cart.reduce((a,c)=>a+c.qty,0); }
function fmtTgl(s){ return new Date(s+"T00:00").toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"}); }
function renderCart(){
  $("cartList").innerHTML = cart.length ? cart.map(c => `
    <div class="cart-item">
      <div><b>${c.judul}</b><small class="muted">${fmtTgl(c.tanggal)} • ${c.jam} • ${c.qty} tiket</small></div>
      <div style="text-align:right"><b>${rp(c.harga*c.qty)}</b><button class="rm" onclick="removeItem(${c.uid})">Hapus</button></div>
    </div>`).join("") : `<div class="empty">Keranjang masih kosong. Pilih film dulu di halaman Film.</div>`;
  const sub = cart.reduce((a,c)=>a+c.harga*c.qty,0), fee = cart.length ? BIAYA_LAYANAN : 0;
  $("subtotal").textContent = rp(sub); $("fee").textContent = rp(fee); $("total").textContent = rp(sub+fee);
}
function removeItem(uid){ cart = cart.filter(c => c.uid !== uid); save("tk_cart", cart); updateCount(); renderCart(); }

// ====== PEMBAYARAN ======
$("payMethods").innerHTML = metode.map((m,i) =>
  `<label><input type="radio" name="metode" value="${m}" ${i===0?"checked":""}> ${m}</label>`).join("");

$("btnPay").onclick = () => {
  const msg = $("payMsg"); msg.textContent = "";
  if(!session){ msg.textContent = "Masuk dulu untuk membayar."; openAuth(); return; }
  if(!cart.length){ msg.textContent = "Keranjang masih kosong."; return; }
  const m = document.querySelector("input[name=metode]:checked").value;
  const btn = $("btnPay"); btn.disabled = true; btn.textContent = "Memproses pembayaran...";
  setTimeout(() => {
    const tickets = load("tk_tickets_" + session.email, []);
    cart.forEach(c => {
      for(let i=0;i<c.qty;i++){
        tickets.push({kode:"TKT-"+Math.random().toString(36).slice(2,8).toUpperCase(),
          judul:c.judul, tanggal:c.tanggal, jam:c.jam,
          kursi:String.fromCharCode(65+Math.floor(Math.random()*8))+(1+Math.floor(Math.random()*12)),
          metode:m, harga:c.harga});
      }
    });
    save("tk_tickets_" + session.email, tickets);
    cart = []; save("tk_cart", cart); updateCount();
    btn.disabled = false; btn.textContent = "Bayar sekarang";
    toast("Pembayaran via " + m + " berhasil"); goPage("tiket");
  }, 1500);
};

// ====== TIKET ======
function renderTickets(){
  if(!session){ $("ticketList").innerHTML = `<div class="empty">Masuk untuk melihat tiket kamu.</div>`; return; }
  const list = load("tk_tickets_" + session.email, []).slice().reverse();
  $("ticketList").innerHTML = list.length ? list.map(t => `
    <div class="ticket">
      <div class="t-main">
        <h4>${t.judul}</h4>
        <p>${fmtTgl(t.tanggal)}</p><p>Jam ${t.jam}</p>
        <p class="muted">Dibayar via ${t.metode} • ${rp(t.harga)}</p>
      </div>
      <div class="t-stub"><span>Kursi</span><b>${t.kursi}</b><span class="code">${t.kode}</span></div>
    </div>`).join("") : `<div class="empty">Belum ada tiket. Setelah membayar, tiket muncul di sini.</div>`;
}

// ====== LOGIN / DAFTAR ======
function setMode(m){
  mode = m; const reg = m === "daftar";
  $("authTitle").textContent = reg ? "Daftar akun" : "Masuk";
  $("btnSubmitAuth").textContent = reg ? "Daftar" : "Masuk";
  $("nameWrap").classList.toggle("hidden", !reg);
  $("switchAuth").textContent = reg ? "Sudah punya akun? Masuk" : "Belum punya akun? Daftar";
  $("authMsg").textContent = "";
}
function openAuth(){ setMode("login"); $("modalLogin").classList.remove("hidden"); }
function renderAuth(){
  $("userName").textContent = session ? "Hai, " + session.nama.split(" ")[0] : "";
  $("btnAuth").textContent = session ? "Keluar" : "Masuk";
}
$("btnAuth").onclick = () => {
  if(session){ session = null; save("tk_session", null); renderAuth(); renderTickets(); toast("Kamu sudah keluar"); }
  else openAuth();
};
$("switchAuth").onclick = e => { e.preventDefault(); setMode(mode==="login" ? "daftar" : "login"); };
$("btnSubmitAuth").onclick = () => {
  const email = $("aEmail").value.trim().toLowerCase(), pass = $("aPass").value, nama = $("aName").value.trim();
  const msg = $("authMsg");
  if(!email.includes("@")){ msg.textContent = "Isi email dengan benar."; return; }
  if(pass.length < 4){ msg.textContent = "Kata sandi minimal 4 karakter."; return; }
  if(mode === "daftar"){
    if(!nama){ msg.textContent = "Isi nama lengkap."; return; }
    if(users.some(u => u.email === email)){ msg.textContent = "Email sudah terdaftar. Silakan masuk."; return; }
    users.push({nama,email,pass}); save("tk_users", users);
    session = {nama,email};
  } else {
    const u = users.find(u => u.email === email && u.pass === pass);
    if(!u){ msg.textContent = "Email atau kata sandi salah."; return; }
    session = {nama:u.nama, email:u.email};
  }
  save("tk_session", session); renderAuth();
  $("modalLogin").classList.add("hidden");
  $("aPass").value = ""; toast("Selamat datang, " + session.nama.split(" ")[0]);
};

// ====== PROFIL TIM ======
$("teamGrid").innerHTML = tim.map(t => `
  <div class="member">
    <div class="avatar" style="background:${t.warna}">
      ${t.nama.split(" ").map(w=>w[0]).slice(0,2).join("")}
      <img src="${t.foto}" alt="Foto ${t.nama}" onerror="this.remove()">
    </div>
    <h3>${t.nama}</h3><small>${t.peran}</small>
  </div>`).join("");

// ====== MODAL CLOSE ======
document.querySelectorAll("[data-close]").forEach(b => b.onclick = () => b.closest(".modal").classList.add("hidden"));
document.querySelectorAll(".modal").forEach(m => m.addEventListener("click", e => { if(e.target === m) m.classList.add("hidden"); }));

// ====== MULAI ======
renderFilms(); renderAuth(); updateCount(); goPage("film");

// =====================================================================
// FITUR TAMBAHAN: pilih kursi, cari/filter, kode promo, riwayat, mode terang
// (bagian ini harus tetap di paling bawah file)
// =====================================================================
/* ===== TAMBAHAN FITUR =====
   Dimuat SETELAH script.js. Fitur: pilih kursi, cari/filter film, kode promo,
   riwayat transaksi, mode gelap. Tidak mengubah daftar film kamu. */
(function(){
  const ROWS = "ABCDEFGH".split(""), COLS = 10;

  // ---------- PROMO ----------
  const PROMO = {
    HEMAT10:   {ket:"Diskon 10%",                    hit:(s)=>Math.round(s*0.10)},
    BIOSKOP20: {ket:"Diskon 20% (maks Rp20.000)",    hit:(s)=>Math.min(Math.round(s*0.20),20000)},
    PELAJAR:   {ket:"Potongan Rp5.000",              hit:(s)=>Math.min(5000,s)},
    GRATISFEE: {ket:"Gratis biaya layanan",          hit:(s,fee)=>fee},
  };
  let promoKode = null;

  function hitung(){
    const sub = cart.reduce((a,c)=>a+c.harga*c.qty,0);
    const fee = cart.length ? BIAYA_LAYANAN : 0;
    const diskon = (promoKode && cart.length) ? PROMO[promoKode].hit(sub,fee) : 0;
    return {sub, fee, diskon, total: sub+fee-diskon};
  }

  // ---------- KURSI ----------
  const showKey = (judul,tgl,jam) => judul+"|"+tgl+"|"+jam;
  function hash(s){ let h=0; for(const ch of s) h=(h*31+ch.charCodeAt(0))>>>0; return h; }

  function seatsTerisiNyata(key){            // kursi yg benar2 sudah dibeli di web ini
    const set = new Set();
    try{
      for(let i=0;i<localStorage.length;i++){
        const k = localStorage.key(i);
        if(k.startsWith("tk_tickets_")){
          (JSON.parse(localStorage.getItem(k))||[]).forEach(t=>{
            if(showKey(t.judul,t.tanggal,t.jam)===key) set.add(t.kursi);
          });
        }
      }
    }catch{}
    return set;
  }
  function seatsTerisi(key){                 // + kursi "terisi" acak biar terlihat ramai
    const set = seatsTerisiNyata(key);
    let h = hash(key);
    ROWS.forEach(r=>{ for(let c=1;c<=COLS;c++){ h=(h*1103515245+12345)>>>0; if(h%100<18) set.add(r+c); } });
    return set;
  }

  let ctx = null, picked = [];
  function openSeat(){
    ctx = {film:selected, tanggal:$("mDate").value, jam:$("mTime").value, qty:qty};
    picked = [];
    const key = showKey(ctx.film.judul, ctx.tanggal, ctx.jam);
    const taken = seatsTerisi(key);
    cart.forEach(c=>{ if(showKey(c.judul,c.tanggal,c.jam)===key && c.kursi) c.kursi.forEach(k=>taken.add(k)); });
    $("sInfo").textContent = `${ctx.film.judul} • ${fmtTgl(ctx.tanggal)} • ${ctx.jam}`;
    $("seatMap").innerHTML = ROWS.map(r =>
      `<div class="seat-row"><span class="lbl">${r}</span>` +
      Array.from({length:COLS},(_,i)=>{
        const id = r+(i+1);
        return `<button class="seat${taken.has(id)?" taken":""}" data-id="${id}" ${taken.has(id)?"disabled":""} aria-label="Kursi ${id}">${i+1}</button>`;
      }).join("") + `</div>`).join("");
    updateSeatInfo();
    $("modalSeat").classList.remove("hidden");
  }
  function updateSeatInfo(){
    $("sPick").textContent = "Kursi: " + (picked.length ? picked.join(", ") : "-");
    $("sNeed").textContent = `${picked.length}/${ctx.qty}`;
  }

  // ---------- RIWAYAT ----------
  function renderOrders(){
    const box = $("orderList");
    if(!session){ box.innerHTML = `<div class="empty">Masuk untuk melihat riwayat transaksi.</div>`; return; }
    const list = load("tk_orders_"+session.email, []).slice().reverse();
    box.innerHTML = list.length ? list.map(o => `
      <div class="order">
        <div class="order-head"><div><b>${o.id}</b><br><small class="muted">${new Date(o.waktu).toLocaleString("id-ID")} • ${o.metode}</small></div><span class="status">${o.status}</span></div>
        <ul>
          ${o.items.map(i=>`<li><span>${i.judul} • ${i.jam} • ${i.qty} tiket${i.kursi?` (${i.kursi.join(", ")})`:""}</span><b>${rp(i.harga*i.qty)}</b></li>`).join("")}
          <li><span>Biaya layanan</span><span>${rp(o.fee)}</span></li>
          ${o.diskon?`<li><span>Promo ${o.promo}</span><span>-${rp(o.diskon)}</span></li>`:""}
          <li><b>Total</b><b>${rp(o.total)}</b></li>
        </ul>
      </div>`).join("") : `<div class="empty">Belum ada transaksi.</div>`;
  }

  // ---------- SUNTIK HTML ----------
  document.body.insertAdjacentHTML("beforeend", `
    <div id="modalSeat" class="modal hidden"><div class="modal-box wide">
      <button class="close" id="seatClose">&times;</button>
      <h3>Pilih kursi</h3><p id="sInfo" class="muted"></p>
      <div class="screen">LAYAR</div>
      <div id="seatMap" class="seatmap"></div>
      <div class="legend"><span><i></i>Tersedia</span><span><i class="p"></i>Dipilih</span><span><i class="t"></i>Terisi</span></div>
      <div class="row total"><span id="sPick">Kursi: -</span><b id="sNeed"></b></div>
      <button id="btnSeatOk" class="btn full">Masukkan ke keranjang</button>
    </div></div>`);

  $("page-film").querySelector(".hero").insertAdjacentHTML("afterend", `
    <div class="filter">
      <input id="cari" type="search" placeholder="Cari judul film...">
      <div id="chips" class="chips"></div>
    </div>`);
  $("filmGrid").insertAdjacentHTML("afterend", `<p id="noFilm" class="empty hidden">Film tidak ditemukan.</p>`);

  document.querySelector("main").insertAdjacentHTML("beforeend",
    `<section id="page-riwayat" class="page"><h2>Riwayat transaksi</h2><div id="orderList"></div></section>`);
  const navTiket = document.querySelector('nav [data-page="tiket"]');
  navTiket.insertAdjacentHTML("afterend", `<button data-page="riwayat">Riwayat</button>`);
  document.querySelector('nav [data-page="riwayat"]').onclick = () => goPage("riwayat");

  const totalRow = $("total").parentElement;
  totalRow.insertAdjacentHTML("beforebegin", `
    <div class="row disc hidden" id="discRow"><span id="discName"></span><b id="discVal"></b></div>
    <div class="promo"><input id="promoIn" placeholder="Kode promo"><button id="promoBtn" class="btn small">Pakai</button></div>
    <p id="promoMsg" class="promo-msg"></p>`);


  // ---------- TEMA (default beludru gelap, tombol untuk mode terang) ----------
  document.querySelector(".auth").insertAdjacentHTML("afterbegin", `<button id="btnTheme" class="btn small theme"></button>`);
  function setTema(terang){
    document.documentElement.classList.toggle("light", terang);
    $("btnTheme").textContent = terang ? "Mode gelap" : "Mode terang";
    save("tk_theme", terang ? "light" : "dark");
  }
  $("btnTheme").onclick = () => setTema(!document.documentElement.classList.contains("light"));
  setTema(load("tk_theme","dark") === "light");

  // ---------- CARI & FILTER ----------
  let genreAktif = "Semua";
  const tokens = g => g.split("/").map(x => x.trim().toUpperCase().replace("COMEDI","KOMEDI"));
  const genres = ["Semua", ...new Set(films.flatMap(f => tokens(f.genre)))];
  $("chips").innerHTML = genres.map(g => `<button class="chip${g==="Semua"?" on":""}" data-g="${g}">${g}</button>`).join("");
  function terapkanFilter(){
    const q = $("cari").value.trim().toLowerCase();
    const kartu = [...$("filmGrid").children];
    let n = 0;
    films.forEach((f,i)=>{
      if(!kartu[i]) return;
      const ok = (genreAktif==="Semua" || tokens(f.genre).includes(genreAktif)) && f.judul.toLowerCase().includes(q);
      kartu[i].classList.toggle("hidden", !ok);
      if(ok) n++;
    });
    $("noFilm").classList.toggle("hidden", n>0);
  }
  $("cari").oninput = terapkanFilter;
  $("chips").onclick = e => {
    const b = e.target.closest(".chip"); if(!b) return;
    genreAktif = b.dataset.g;
    document.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c===b));
    terapkanFilter();
  };
  const renderFilmsAsli = renderFilms;
  renderFilms = function(){ renderFilmsAsli(); terapkanFilter(); };

  // ---------- ALUR KURSI ----------
  $("btnAdd").textContent = "Pilih kursi";
  $("btnAdd").onclick = () => {
    if(!$("mDate").value){ toast("Pilih tanggal dulu"); return; }
    openSeat();
  };
  $("seatMap").onclick = e => {
    const b = e.target.closest(".seat"); if(!b || b.disabled) return;
    const id = b.dataset.id;
    if(picked.includes(id)) picked = picked.filter(x => x!==id);
    else if(picked.length < ctx.qty) picked.push(id);
    else { toast(`Maksimal ${ctx.qty} kursi sesuai jumlah tiket`); return; }
    b.classList.toggle("pick", picked.includes(id));
    updateSeatInfo();
  };
  $("btnSeatOk").onclick = () => {
    if(picked.length !== ctx.qty){ toast(`Pilih ${ctx.qty} kursi dulu`); return; }
    cart.push({uid:Date.now(), filmId:ctx.film.id, judul:ctx.film.judul, tanggal:ctx.tanggal,
               jam:ctx.jam, qty:ctx.qty, harga:ctx.film.harga, kursi:picked.slice().sort()});
    save("tk_cart", cart); updateCount();
    $("modalSeat").classList.add("hidden"); $("modalFilm").classList.add("hidden");
    toast("Ditambahkan ke keranjang");
  };
  $("seatClose").onclick = () => $("modalSeat").classList.add("hidden");
  $("modalSeat").addEventListener("click", e => { if(e.target.id==="modalSeat") e.target.classList.add("hidden"); });

  // ---------- KERANJANG + PROMO ----------
  const renderCartAsli = renderCart;
  renderCart = function(){
    renderCartAsli();
    document.querySelectorAll("#cartList .cart-item").forEach((el,i)=>{
      const c = cart[i], sm = el.querySelector("small");
      if(c && c.kursi && sm) sm.textContent += " • Kursi " + c.kursi.join(", ");
    });
    const h = hitung();
    $("subtotal").textContent = rp(h.sub);
    $("fee").textContent = rp(h.fee);
    $("discRow").classList.toggle("hidden", !h.diskon);
    if(h.diskon){ $("discName").textContent = "Promo " + promoKode; $("discVal").textContent = "-" + rp(h.diskon); }
    $("total").textContent = rp(h.total);
  };
  $("promoBtn").onclick = () => {
    const k = $("promoIn").value.trim().toUpperCase(), m = $("promoMsg");
    if(!cart.length){ m.className="promo-msg err"; m.textContent="Keranjang masih kosong."; return; }
    if(!PROMO[k]){ promoKode=null; m.className="promo-msg err"; m.textContent="Kode promo tidak valid."; }
    else { promoKode=k; m.className="promo-msg ok"; m.textContent="Berhasil: " + PROMO[k].ket; }
    renderCart();
  };
  const removeAsli = removeItem;
  removeItem = function(uid){ removeAsli(uid); };   // renderCart sudah ikut versi baru

  // ---------- PEMBAYARAN + RIWAYAT ----------
  $("btnPay").onclick = () => {
    const msg = $("payMsg"); msg.textContent = "";
    if(!session){ msg.textContent = "Masuk dulu untuk membayar."; openAuth(); return; }
    if(!cart.length){ msg.textContent = "Keranjang masih kosong."; return; }

    // cek kursi belum diambil orang lain
    for(const c of cart){
      const terisi = seatsTerisiNyata(showKey(c.judul,c.tanggal,c.jam));
      if(c.kursi && c.kursi.some(k => terisi.has(k))){
        msg.textContent = `Kursi untuk "${c.judul}" sudah terisi. Item dihapus, silakan pilih ulang.`;
        removeItem(c.uid); return;
      }
    }
    const m = document.querySelector("input[name=metode]:checked").value;
    const h = hitung();
    const btn = $("btnPay"); btn.disabled = true; btn.textContent = "Memproses pembayaran...";
    setTimeout(() => {
      const tickets = load("tk_tickets_"+session.email, []);
      cart.forEach(c => {
        for(let i=0;i<c.qty;i++){
          tickets.push({kode:"TKT-"+Math.random().toString(36).slice(2,8).toUpperCase(),
            judul:c.judul, tanggal:c.tanggal, jam:c.jam,
            kursi:(c.kursi && c.kursi[i]) || "A1", metode:m, harga:c.harga});
        }
      });
      save("tk_tickets_"+session.email, tickets);

      const orders = load("tk_orders_"+session.email, []);
      orders.push({id:"INV-"+Date.now().toString().slice(-8), waktu:new Date().toISOString(),
        items:cart.map(c=>({judul:c.judul,tanggal:c.tanggal,jam:c.jam,qty:c.qty,harga:c.harga,kursi:c.kursi})),
        fee:h.fee, diskon:h.diskon, promo:promoKode, total:h.total, metode:m, status:"Lunas"});
      save("tk_orders_"+session.email, orders);

      cart = []; save("tk_cart", cart); promoKode = null;
      $("promoIn").value = ""; $("promoMsg").textContent = "";
      updateCount();
      btn.disabled = false; btn.textContent = "Bayar sekarang";
      toast("Pembayaran via " + m + " berhasil"); goPage("tiket");
    }, 1500);
  };

  // ---------- NAVIGASI RIWAYAT ----------
  const goPageAsli = goPage;
  goPage = function(name){ goPageAsli(name); if(name==="riwayat") renderOrders(); };

  terapkanFilter();
})();


// =====================================================================
// FITUR: HALAMAN DETAIL FILM (sinopsis, pemeran, rating usia, trailer)
// Cara isi/ubah: edit objek "detailFilm" di bawah, kuncinya = id film.
// Film yang belum ditulis di sini tetap punya detail otomatis (bawaan).
// =====================================================================
const detailFilm = {
  3:  {rating:"SU",  pemeran:"Macaulay Culkin, Joe Pesci, Daniel Stern", sinopsis:"Anak 8 tahun tertinggal sendirian di rumah saat keluarganya berlibur, lalu harus menjaga rumah dari dua pencuri dengan jebakan buatannya sendiri."},
  4:  {rating:"13+", pemeran:"Angelina Jolie, Elle Fanning, Sharlto Copley", sinopsis:"Penyihir bersayap yang dikhianati memutuskan mengutuk seorang putri, tetapi lama-lama justru menyayanginya."},
  5:  {rating:"13+", pemeran:"", sinopsis:"Kejadian-kejadian aneh muncul menjelang azan magrib, menegangkan sekaligus mengocok perut."},
  6:  {rating:"13+", pemeran:"Prilly Latuconsina, Sandrinna Michelle, Shareefa Daanish", sinopsis:"Seorang gadis yang bisa melihat hantu anak-anak berteman dengan mereka, sampai muncul sosok yang jauh lebih menyeramkan."},
  7:  {rating:"13+", pemeran:"", sinopsis:"Kisah cinta remaja era 90-an yang manis, rumit, dan penuh kenangan."},
  8:  {rating:"SU",  pemeran:"Tom Kenny (suara)", sinopsis:"Spons kuning yang ceria dan sahabat-sahabatnya menjalani petualangan kocak di dasar laut Bikini Bottom."},
  9:  {rating:"13+", pemeran:"", sinopsis:"Remaja biasa dengan kekuatan laba-laba menjaga kotanya sambil tetap menjalani hidup sebagai pelajar."},
  10: {rating:"13+", pemeran:"Robert Downey Jr., Chris Evans, Scarlett Johansson, Chris Hemsworth", sinopsis:"Para pahlawan super bersatu menghadapi ancaman yang terlalu besar untuk dihadapi sendirian."},
  11: {rating:"13+", pemeran:"Sam Worthington, Zoe Saldaña, Sigourney Weaver", sinopsis:"Seorang mantan tentara menjelajahi planet Pandora yang indah dan terjebak di antara dua pihak yang bertikai."},
  12: {rating:"13+", pemeran:"", sinopsis:"Seorang anak belajar bela diri dari guru yang sabar, menghadapi perundungan, dan menemukan kepercayaan dirinya."},
  13: {rating:"17+", pemeran:"Jessica Chastain, James McAvoy, Bill Hader", sinopsis:"Para sahabat yang sudah dewasa kembali ke kota asal untuk menghadapi badut yang meneror masa kecil mereka."},
  14: {rating:"17+", pemeran:"Taissa Farmiga, Demián Bichir, Jonas Bloquet", sinopsis:"Seorang pastor dan biarawati muda menyelidiki kematian misterius di sebuah biara terpencil."},
  15: {rating:"17+", pemeran:"Gong Yoo, Ma Dong-seok, Jung Yu-mi", sinopsis:"Para penumpang kereta berjuang selamat dari wabah zombie dalam perjalanan menuju Busan."},
  16: {rating:"13+", pemeran:"Jason Statham, Li Bingbing, Rainn Wilson", sinopsis:"Tim penyelam laut dalam menemukan hiu purba raksasa yang akhirnya naik ke permukaan."},
  17: {rating:"13+", pemeran:"Tom Hardy", sinopsis:"Seorang jurnalis bersatu dengan makhluk luar angkasa yang memberinya kekuatan sekaligus masalah."},
  18: {rating:"17+", pemeran:"Margot Robbie, Mary Elizabeth Winstead", sinopsis:"Harley Quinn bersama sekelompok wanita tangguh melawan penjahat yang mengincar seorang gadis kecil."},
  19: {rating:"13+", pemeran:"Scarlett Johansson, Florence Pugh, David Harbour", sinopsis:"Natasha Romanoff menghadapi masa lalunya dan keluarga yang dulu terpisah."},
  20: {rating:"17+", pemeran:"Grace Caroline Currey, Virginia Gardner", sinopsis:"Dua sahabat memanjat menara yang sangat tinggi dan terjebak di puncaknya tanpa jalan turun."},
  21: {rating:"13+", pemeran:"Millie Bobby Brown, Ray Winstone, Angela Bassett", sinopsis:"Seorang putri dinikahkan dengan pangeran, lalu sadar bahwa ia dikorbankan untuk seekor naga."},
};
function infoFilm(f){
  const d = detailFilm[f.id] || {};
  return {
    rating: d.rating || "13+",
    pemeran: d.pemeran || "",
    sinopsis: d.sinopsis || `Film ${f.genre.toLowerCase()} berdurasi ${f.durasi} yang siap menemani waktu nontonmu. Sinopsis lengkap segera menyusul.`
  };
}

document.body.insertAdjacentHTML("beforeend", `
  <div id="modalDetail" class="modal hidden"><div class="modal-box detail">
    <button class="close" id="detailClose">&times;</button>
    <div id="dPoster" class="d-poster"></div>
    <h3 id="dTitle"></h3>
    <p class="muted"><span id="dMeta"></span> <span id="dRating" class="rating"></span></p>
    <h4>Sinopsis</h4><p id="dSinopsis"></p>
    <div id="dCastWrap"><h4>Pemeran</h4><p id="dCast"></p></div>
    <a id="dTrailer" class="btn ghost full" target="_blank" rel="noopener">Tonton trailer</a>
    <button id="dPilih" class="btn full">Pilih jadwal</button>
  </div></div>`);

function bukaDetail(f){
  const d = infoFilm(f);
  $("dPoster").style.background = `linear-gradient(160deg,${f.warna[0]},${f.warna[1]})`;
  $("dPoster").innerHTML = `<img src="${f.gambar}" alt="Poster ${f.judul}" onerror="this.remove()">`;
  $("dTitle").textContent = f.judul;
  $("dMeta").textContent = `${f.genre} • ${f.durasi} • ${rp(f.harga)}`;
  $("dRating").textContent = d.rating;
  $("dSinopsis").textContent = d.sinopsis;
  $("dCast").textContent = d.pemeran;
  $("dCastWrap").classList.toggle("hidden", !d.pemeran);
  $("dTrailer").href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(f.judul + " official trailer");
  $("dPilih").onclick = () => { $("modalDetail").classList.add("hidden"); openFilm(f.id); };
  $("modalDetail").classList.remove("hidden");
}
$("detailClose").onclick = () => $("modalDetail").classList.add("hidden");
$("modalDetail").addEventListener("click", e => { if(e.target.id==="modalDetail") e.target.classList.add("hidden"); });

// pasang lencana rating + tombol "Detail" di tiap kartu film
const renderFilmsSebelumDetail = renderFilms;
renderFilms = function(){
  renderFilmsSebelumDetail();
  [...$("filmGrid").children].forEach((card,i)=>{
    const f = films[i]; if(!f || card.querySelector(".rating-badge")) return;
    card.querySelector(".poster").insertAdjacentHTML("beforeend", `<em class="rating-badge">${infoFilm(f).rating}</em>`);
    card.querySelector(".poster").classList.add("klik");
    card.querySelector(".film-body").insertAdjacentHTML("beforeend", `<button class="btn ghost full btn-detail">Lihat detail</button>`);
  });
};
$("filmGrid").addEventListener("click", e => {
  const card = e.target.closest(".film"); if(!card) return;
  if(e.target.closest(".btn-detail") || e.target.closest(".poster")){
    bukaDetail(films[[...$("filmGrid").children].indexOf(card)]);
  }
});
renderFilms();
