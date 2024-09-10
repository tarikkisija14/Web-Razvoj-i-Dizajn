
let globalPodaci = [];
let preuzmi = () => {
  
  //https://restapiexample.wrd.app.fit.ba/ -> Ispit20230715 -> GetPonuda

   fetch(`https://wrd-fit.info/Ispit20230715/GetPonuda?travelfirma=${firma.value}`)
   .then(r=>{
    r.json().then(pr=>{
      document.getElementById('destinacije').innerHTML="";
      globalPodaci=pr.podaci;
      for(let i=0;i<globalPodaci.length;i++){
        document.getElementById('destinacije').innerHTML += 
        `<article class="offer">
                        <div class="akcija">Polazak za <br>${globalPodaci[i].naredniPolazak.zaDana} dana</div>
                        <div class="offer-image" style="background-image: url('${globalPodaci[i].imageUrl}');" ></div>
                        <div class="offer-details">
                            <div class="offer-destination">${globalPodaci[i].mjestoDrzava}</div> 
                            <div class="offer-description">${globalPodaci[i].opisPonude} </div>                                       
                            <div class="offer-description">${globalPodaci[i].opisPonude} </div>                                       
                            <div class="offer-price">${globalPodaci[i].naredniPolazak.cijenaEUR} €</div>
                            <br> 
                            <div class="offer-free">
                                <label>
                                    Slobodno mjesta: 
                                </label>
                                <span>
                                    ${globalPodaci[i].naredniPolazak.brojSlobodnihMjesta}
                                </span>
                            </div> 
                        </div>
                        


                        <div class="offer-footer">
                            <div class="ponuda-dugme" onclick="odaberiDestinaciju(${i})">Pogledaj</div>
                        </div>
                    </article>`
      }
    })
   })

  



 
 

}

let odaberiDestinaciju=(rb)=>{
   let plan= globalPodaci[rb].planiranaPutovanja;
   document.getElementById('destinacija').value=globalPodaci[rb].mjestoDrzava;
   document.getElementById('putovanjaTabela').innerHTML="";
   for(let i=0;i<plan.length;i++){
    document.getElementById('putovanjaTabela').innerHTML +=
    ` <tr>
                <th>${plan[i].id}</th>
                <th>${plan[i].datumPolaska}</th>
                <th>${plan[i].datumPovratka}</th>
                <th>${plan[i].hotelOpis}</th>
                <th>${plan[i].vrstaPrevoza}</th>
                <th>${plan[i].cijenaEUR}</th>
                <th><button onclick="odaberiPutovanje('${plan[i].datumPolaska}',${plan[i].cijenaEUR})">Odaberi</button></th>
                

            </tr>`
   }
 
  


}



let odaberiPutovanje=(datumPolaskaValue, cijenaEUR)=>{
  document.getElementById('datumPolaska').value=datumPolaskaValue;
  document.getElementById('cijenaPoGostu').value=cijenaEUR;
  promjenaBrojaGostiju();
}



let promjenaBrojaGostiju=()=>{
 document.getElementById('ukupnaCijena').value=Number(document.getElementById('cijenaPoGostu').value)*Number(document.getElementById('brojGostiju').value) ;
 
generisiGosteInput();
}



let ErrorBackgroundColor = "#FE7D7D";
let OkBackgroundColor = "#DFF6D8";

let posalji = () => {
    //https://restapiexample.wrd.app.fit.ba/ -> Ispit20230715 -> Add

    let obj= new Object();

    /*
     "travelFirma": "string",
  "destinacijaDrzava": "string",
  "brojIndeksa": "string",
  "gosti": [
    "string"
  ],
  "poruka": "string",
  "telefon": "string",
  "datumPolaska": "string"
    
    */
    
    obj.travelFirma=document.getElementById('firma').value;
    obj.destinacijaDrzava=document.getElementById('destinacija').value;
    obj.brojIndeksa=document.getElementById('brojIndeksa').value;
    obj.gosti=[];
    obj.poruka=document.getElementById('messagetxt').value;
    obj.telefon=document.getElementById('phone').value;
    obj.datumPolaska=document.getElementById('datumPolaska').value;

    let gostiinput=document.getElementsByClassName('imegostaklasa')
    for(let i=0;i<gostiinput.length;i++){
      obj.gosti.push(gostiinput[i].value);
    }
   


   let jsonObj=JSON.stringify(obj);

   fetch('https://restapiexample.wrd.app.fit.ba/Ispit20230715/Add',{
    method:"POST",
    body:jsonObj,
    headers:{"Content-Type":" application/json"}

   })
   .then(r=>{
    r.json().then(pr=>{
      dialogSuccess("uspjesno",()=>{
        console.log(pr);
      });
    })
   })


   


   
  
}
let popuniFimeUCombox = () => {
   let url=`https://wrd-fit.info/Ispit20230715/GetTravelFirme`
  
  fetch(url)
  .then(r=>{
    r.json().then(pr=>{
      for(let i=0;i<pr.length;i++){
        document.getElementById('firma').innerHTML += 
        `<option>${pr[i].naziv}</option>`
      }
    })
  })

}


popuniFimeUCombox();





let generisiGosteInput =()=>{
  let brojac=document.getElementById('brojGostiju').value;
  document.getElementById('gosti').innerHTML="";
  for(let i=0;i<brojac;i++){
    document.getElementById('gosti').innerHTML +=
    `<div>
  <label>Ime Gosta ${i+1}</label>
  <input class="imegostaklasa" />
</div>`
  }

}



let provjeriTelefon=()=> {
   let r = /^[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{3}$/
   
   let fon = document.getElementById('phone').value;
   
   if(!r.test(fon)){
    document.getElementById('phone').style.backgroundColor = ErrorBackgroundColor;
   
   }
   else
   {
    document.getElementById('phone').style.backgroundColor = OkBackgroundColor


   }
   
   
}

let provjeriBrojIndeksa=()=>{
     let r= /^IB[0-9]{6}$/
    if(!r.test(brojIndeksa.value)){
      brojIndeksa.style.backgroundColor=ErrorBackgroundColor;

    }
    else{
      brojIndeksa.style.backgroundColor=OkBackgroundColor;
    }


}