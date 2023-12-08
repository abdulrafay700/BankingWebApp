

setTimeout(()=>{
    let logobody = document.querySelector("#logo")
    logobody.style.transform = "0.3s ease-in"
    logobody.style.display = "none"
},1000)

setInterval(()=>{
    document.querySelector(".main-container").style.display = "block"
},2000)