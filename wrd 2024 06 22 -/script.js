
let globalPodaci = [];
let globalID;
let k1_preuzmiDrzave = () => {
    //https://wrd-fit.info/ -> Ispit20240622 -> GetPonuda

    let url = `https://wrd-fit.info/Ispit20240622/GetNovePonude`
    destinacije.innerHTML = '';//brisemo destinacije
    fetch(url)
        .then(r => {
            if (r.status !== 200) {
                //greska
                return;
            }
            r.json().then(t => {

                let b = 0;
                globalPodaci = t.podaci //setujemo globalnu varijablu

                //28.06.2024. naknadni komentar: ovo je dorađena for-petlja koja sadrži podatke sa API-a
                //ova dorada nije tražena u tekstu zadataka, stoga nije obavezna, ali je preporučena radi lakšeg testiranja pretrage
                for (const x of t.podaci) {
                    destinacije.innerHTML += `
                     <div class="col-md-4 col-sm-6 col-xs-12 drzava" style="margin-bottom:40px">
                    <div class="featured-item">
                        <div class="thumb">
                            <img src="${x.imageUrl}" alt="">
                            
                            <div class="date-content">
                                <h6>${x.naredniPolazak.zaDana}</h6>
                                <span>dana</span>
                            </div>
                        </div>
                        <div class="down-content">
                            <h4>${x.drzava}</h4>
                            <span>${x.naredniPolazak.datumPolaska} | Slobodno mjesta: ${x.naredniPolazak.brojSlobodnihMjesta} </span>
                            <p>${x.opisPonude}</p>
                            <p>${prikaziGradove(x)}</p>
                            <div class="row">
                                <div class="text-button">
                                    <button onclick="k2_odaberiDestinaciju(${b})">Odaberi destinaciju</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    `
                    b++;
                }
            })
        })
       
}

let prikaziGradove=(x)=>{
    let s ="<table style='width:100%; '>";
    
    for (const g of x.boravakGradovi) {
        s += `<tr>
        <td>${g.nazivGrada}</td>
        <td>${g.hotelNaziv}</td>
        <td>${g.brojNocenja} dana</td>
            
        </tr>`
    }
    s+= "</table>"
    return s;
}

let k2_odaberiDestinaciju=(rbDrzave)=>{

    let destinacijObj = globalPodaci[rbDrzave];
    drzavaText.value=destinacijObj.drzava;

    drzavaSpan.innerHTML = destinacijObj.drzava

    let s = "";
    let rbPolaska=0;
    for (const o of destinacijObj.planiranaPutovanja) {
        s += `
        <tr>
            <td>ID ${o.id}</td>
            <td>${o.datumPolaska}</td>
            <td>${o.datumPovratka}</td>
            <td>${o.brojSlobodnihMjesta}</td>
            <td>${o.brojDana}</td>
            <td>${o.cijenaPoOsobiEUR} €</td>
            <td><button onclick="odaberiPutovanje('${o.datumPolaska}', '${o.cijenaPoOsobiEUR}', '${o.id}')">K3 Odaberi putovanje</button></td>
        </tr>`
        rbPolaska++;
    }
    putovanjaTabela.innerHTML = s;

  
   
}
function odaberiPutovanje(datum, cijena, id){
    document.getElementById('datumPolaska').value = datum;
    document.getElementById('cijenaPoGostu').value = cijena;
    apdejtujSumarno();

    globalID = id;
}
let ErrorBackgroundColor = "#FE7D7D";
let OkBackgroundColor = "#DFF6D8";

let posalji = () => {
    //https://wrd-fit.info/ -> Ispit20240622 -> Dodaj

    let jsObjekat = new Object();

    jsObjekat.id = globalID;
    jsObjekat.drzava = document.getElementById('drzavaText').value;
    jsObjekat.mobitel = document.getElementById('phone').value;
    jsObjekat.datumPolaska = document.getElementById('datumPolaska').value;
    jsObjekat.gostiPutovanja = [];
    jsObjekat.brojIndeksa = document.getElementById('brojIndeksa').value;

    let gostiImena = document.getElementsByClassName('fakatKlasa');

    for(let i = 0; i<gostiImena.length; i++){
        jsObjekat.gostiPutovanja.push(gostiImena[i].value);
    }
   
   
    let jsonString = JSON.stringify(jsObjekat);

    console.log(jsonString);

    let url = "https://wrd-fit.info/Ispit20240622/Dodaj";

   

    // // fetch tipa "POST" i saljemo "jsonString"
    fetch(url, {
        method: "POST",
        body: jsonString,
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(r => {
            if (r.status != 200) {
                alert("Greška")
                return;
            }

            r.json().then(t => {
                
                //28.06.2024. naknadni komentar: umjesto "t.idRezervacije>0" sada je "t.idRezervacije.length>0"
                //jer idRezervacije nije brojčani podatak, već string
                if (t.idRezervacije.length>0 && Number(ukupnaCijena.value)>0)
                {
                    //28.06.2024. naknadni komentar: sada su dodati JS i CSS fajlovi za dialogSuccess
                    //alternativa dialogu je JS alert
                    dialogSuccess(`Idi na placanje rezervacije broj ${t.idRezervacije} - iznos ${ukupnaCijena.value} EUR`, ()=>{
                        window.location = `https://www.paypal.com/cgi-bin/webscr?business=adil.joldic@yahoo.com&cmd=_xclick&currency_code=EUR&amount=${ukupnaCijena.value}&item_name=Dummy invoice`
                    });
                }
            })

        })
}


let promjenaBrojaGostiju = () => {
    let brojGostiju = document.getElementById('brojGostiju').value;
    document.getElementById('gosti').innerHTML='';
    for(let i = 0; i<brojGostiju; i++){
        document.getElementById('gosti').innerHTML+=
        `
             <div class="gosti">
                <div id="gost${i}">
                    <label for="input">Gost ${i + 1}</label>
                    <input type="text" class="fakatKlasa">
                </div>
            </div>
        `
    }

    apdejtujSumarno();
    
}
function apdejtujSumarno(){
    document.getElementById('ukupnaCijena').value =
    Number(document.getElementById('brojGostiju').value) *
    Number(document.getElementById('cijenaPoGostu').value);
}

let provjeriTelefon=()=> {
    let r = /^[+]\d{3}[-]\d{2}[-]\d{3}[-]\d{3}$/;
    if (!r.test(phone.value)) {
        document.getElementById('phone').style.backgroundColor = ErrorBackgroundColor;
    }
    else {
        document.getElementById('phone').style.backgroundColor = OkBackgroundColor;
    }
}

let provjeriBrojIndeksa=()=>{
    let r = /^IB[0-9]{6}$/;
    if (!r.test(brojIndeksa.value)) {
        document.getElementById('brojIndeksa').style.backgroundColor = ErrorBackgroundColor;
    }
    else {
        document.getElementById('brojIndeksa').style.backgroundColor = OkBackgroundColor;
    }
}

k1_preuzmiDrzave();

