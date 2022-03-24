// button
body = document.querySelector("body");
btns = document.querySelectorAll("button");

for (var i = 0; i < btns.length; i++){
    btns[i].addEventListener('click', function() {
        if(!body.classList.contains('btnClicked')){
            body.classList.add('btnClicked');
        }
    });
}

// form with multiple steps
var currTab = 0,
page = 1,
progressWidth = 1;
showTab(currTab);

$('form').on('submit', function(e){
    e.preventDefault()
    let dataArray = {
        nim: nim.value,
        nama: namaDpn.value + " " + namaBlkng.value,
        nm_mk: namaMK.value,
        Ntugas: tugas.value,
        Nkuis: kuis.value,
        Nuts: uts.value,
        Nuas: uas.value
    }

    $.ajax({
        url: '/nilai',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({dataArray}),
        success: function(res){
            $('#nilaiAkhir').toggleClass("d-none");
            $('#nilaiAkhir').html(`<h1>${res.total}</h1>`)
            nim.value = "";
            namaDpn.value = "";
            namaBlkng.value = "";
            namaMK.value = "";
            tugas.value = "";
            kuis.value = "";
            uts.value = "";
            uas.value = "";
        }
    })
})

function showTab(n){
    var x = document.getElementsByClassName("tab"),
    prevBtn = document.getElementById("prevBtn"),
    nextBtn = document.getElementById("nextBtn");
    var progressBar = document.getElementById("progressBar");
    
    x[n].style.display = "block";
    
    if(n == 0){
        prevBtn.style.display = "none";
    } else {
        prevBtn.style.display = "inline";
    }
    if(n == (x.length - 1)){
        nextBtn.value = "Simpan";
    } else {
        nextBtn.value = "Selanjutnya";
    }

    progressBar.style.width = progressWidth + "%";
    progressBar.ariaValueNow = progressWidth;
}

function nextPrev(n){
    var x = document.getElementsByClassName("tab"),
    prevBtn = document.getElementById("prevBtn"),
    nextBtn = document.getElementById("nextBtn"),
    z = document.getElementById("tambah");

    if(n == 1 && !validateForm()) return false;
    x[currTab].style.display = "none";
    currTab = currTab + n;

    if(n == 0){
        progressWidth = 1;
    } else if(n - 1){
        progressWidth = progressWidth - 33;
    } else if(n){
        progressWidth = progressWidth + 33;
    }
    
    if(currTab >= x.length){
        nextBtn.type = "submit";
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        z.innerText = "Hasil Akhir Nilai";
        progressWidth = 100;
        progressBar.style.width = progressWidth + "%";
        progressBar.ariaValueNow = progressWidth;
        return false;
    }

    showTab(currTab);
}

var nim = document.getElementById("nim"),
namaDpn = document.getElementById("namaDpn"),
namaBlkng = document.getElementById("namaBlkng"),
namaMK = document.getElementById("namaMK"),
tugas = document.getElementById("tugas"),
kuis = document.getElementById("kuis"),
uts = document.getElementById("uts"),
uas = document.getElementById("uas"),

msgNim = "Masukkan NIM",
msgNamaDpn = document.getElementById("invalid-namaDpn").innerHTML = "Masukkan Nama Depan";
msgNamaMK = document.getElementById("invalid-namaMK").innerHTML = "Masukkan Nama Mata Kuliah";
msgTugas = document.getElementById("invalid-tugas").innerHTML = "Masukkan Nilai Tugas";
msgKuis = document.getElementById("invalid-kuis").innerHTML = "Masukkan Nilai Kuis";
msgUts = document.getElementById("invalid-uts").innerHTML = "Masukkan Nilai Ujian Tengah Semester";
msgUas = document.getElementById("invalid-uas").innerHTML = "Masukkan Nilai Ujian Akhir Semester";

function validateForm() {
    var x, y, i, valid = true, valid3 = true,
    x = document.getElementsByClassName("tab"),
    y = x[currTab].getElementsByTagName("input");
    
    for(i = 0; i < y.length; i++) {
      if(y[i].value == "") {
        if(currTab == 0 && i == 2){
            valid3 = true;
        } else {
            y[i].classList.add("is-invalid");
            valid = false;
        }

        msgNim;
        msgNamaDpn;
        msgNamaMK;
        msgTugas;
        msgKuis;
        msgUts;
        msgUas;
      }
    }
    nimValidate();
    // console.log("valid:"+valid)
    // console.log("valid2:"+valid2)
    // console.log("valid3:"+valid3)
    if(valid == valid2 == valid3){
        return valid;
    }
}

nim.oninput = function() {nimValidate()};
namaDpn.oninput = function() {onInputValidate(namaDpn)};
//namaBlkng.oninput = function() {onInputValidate(namaBlkng)};
namaMK.oninput = function() {onInputValidate(namaMK)};
tugas.oninput = function() {onInputValidate(tugas)};
kuis.oninput = function() {onInputValidate(kuis)};
uts.oninput = function() {onInputValidate(uts)};
uas.oninput = function() {onInputValidate(uas)};

function onInputValidate(name){
    if(name.value == ""){
        name.classList.add("is-invalid");
    } else {
        name.className="form-control is-valid";
    }
}

function nimValidate(){
    valid2 = true;
    if(isNaN(nim.value)){
        msgNim = "NIM tidak valid!";
        valid2 = false;
    } else if(nim.value.length < 7 && nim.value.length >= 1){
        msgNim = "NIM minimal 7 angka!";
        valid2 = false;
    } else if(nim.value == ""){
        msgNim = msgNim;
        valid2 = false;
    } else {
        nim.className="form-control is-valid";
        valid2 = true;
    }

    if(valid2 == false){
        nim.classList.add("is-invalid");
        document.getElementById("invalid-nim").innerHTML = msgNim;
    }
}

$('.score').bind('keypress', function (event) {
    var regex = new RegExp("^[0-9.\b]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
});