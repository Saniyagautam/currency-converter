const baseUrl= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


//adding all countries in select
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
        //when select option changes, change the flag as well
        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);
        });
    }
}

//changing flags 
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

//making button working
button.addEventListener("click",async(evt)=>{
    evt.preventDefault();//stop the default working of btn
    let amount=document.querySelector(".amount input");
    let amt=amount.value;
    if(amt==="" || amt<1){
        amt=1;
        amt.value="1";
    }

    //updating msg and fetching api
    // console.log(fromCurr.value,toCurr.value);
    const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    // console.log(response);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];

    let finalamt=amt*rate;
    msg.innerText=`${amt} ${fromCurr.value}=${finalamt} ${toCurr.value}`;


});

