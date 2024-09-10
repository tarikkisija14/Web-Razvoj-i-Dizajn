
let globalPodaci=[];
function skiniFirme(){
    let url = `https://wrd-fit.info/Ispit20220924/GetTravelFirme` ;

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
skiniFirme();


   



let preuzmi = () => {
     
   
    let b=0;
    
    let url=`https://wrd-fit.info/Ispit20230923/GetPonuda?travelfirma=${firma.value}`;

    fetch(url)
    .then(r=>{
        r.json().then(pr=>{
            document.getElementById('destinacije').innerHTML ="";
            for(const x of pr.podaci){
                document.getElementById('destinacije').innerHTML +=
                `<article class="offer">
                    <div class="akcija">${x.akcijaPoruka}</div>
                    <div  class="offer-image" style="background-image: url('${x.imageUrl}');" ></div>
                    <div class="offer-details">
                        <div class="offer-destination">${x.mjestoDrzava}</div>
                        <div class="offer-price">${x.cijenaDolar}</div>
                        <div class="offer-description">${x.opisPonude}</div>
                        <div class="offer-firma">${x.travelFirma}</div>
                        <select id="s${b}" class="offer-option">
                         ${generisiOpcije(x)}
                        </select>
                    </div>
                    <div class="ponuda-dugme-1" onclick="odaberiDestinaciju1('${x.mjestoDrzava}',${x.cijenaDolar},${b})" >Odaberi za destinaciju 1</div>
                    <div class="ponuda-dugme-2" onclick="odaberiDestinaciju2('${x.mjestoDrzava}',${x.cijenaDolar},${b})">Odaberi za destinaciju 2</div>
                </article>`
  ;             b++;

            }
        })
    })



    



}

    



function generisiOpcije(x)
{
let s="";
  for(const o of x.opcije){
    s +=`<option>${o}</option>`
  }
  return s;
}




function odaberiDestinaciju1(drzava,cijena,id){
 



  
}
function odaberiDestinaciju2(drzava,cijena,id){
   

}



let ErrorBackgroundColor = "#FE7D7D";
let OkBackgroundColor = "#DFF6D8";

let posalji = () => {
    //https://restapiexample.wrd.app.fit.ba/ -> Ispit20220924 -> Add

    let url = `https://restapiexample.wrd.app.fit.ba/Ispit20220924/Add`

   /*
   {
  "destinacija1Soba": "string",
  "destinacija2Soba": "string",
  "imeGosta": "string",
  "prezimeGosta": "string",
  "poruka": "string",
  "email": "string",
  "telefon": "string"
}*/ 

  let obj=new Object();

 
     

  let jsonObj = JSON.stringify(obj);


fetch(url,{
    method:"POST",
    body:jsonObj,
    headers:{"Content-Type":" application/json"}
})
    .then(r=>{
        r.json().then(pr=>{
            alert("uspjesna rezervacija.");
        })
    })  





}

function test_email()
{
    let r = /^[a-zA-Z0-9]+@edu\.fit\.ba$/
    if(!r.test(email.value)){
        document.getElementById('email').style.backgroundColor =ErrorBackgroundColor;
    }
    else{
        document.getElementById('email').style.backgroundColor =OkBackgroundColor;
    }
}

function test_phone()
{
    let r = /^[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{3}$/
    if(!r.test(phone.value)){
        document.getElementById('phone').style.backgroundColor =ErrorBackgroundColor;
    }
    else{
        document.getElementById('phone').style.backgroundColor =OkBackgroundColor;
    }
}