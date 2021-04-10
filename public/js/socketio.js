const socket = io("http://127.0.0.1:3000/");
const chatBox= document.querySelector(".chat-box");
const btnEnviar = document.querySelector("#btn-enviar");
const msg = document.querySelector("#msg");
const author = document.getElementById("author");
let scroll =0;


function renderMsg(value){ 
    let p = document.createElement("p");
    p.classList.add("texto-chat")
    p.innerHTML= `<strong>${value.name}: </strong>${value.msg}<br>`
    chatBox.appendChild(p);   
    chatBox.scrollTop = 99999*99999;  
}
    socket.on("persist", persistMsg=>{ 
        console.log("....>>>>", persistMsg)
       
        persistMsg.forEach(el=>{
            renderMsg(el)
        }) 
    })

function enviar(e){ 
    e.preventDefault();
    let obj={
        name:author.value,
        msg:msg.value
    }
    socket.emit("chat", obj);      
    msg.value=""; 
    renderMsg(obj)    
}
socket.on("chatClient", socket=>{  
    renderMsg(socket)
  

}) 

window.addEventListener("keypress", e=>{
    if(e.keyCode == 13){
        btnEnviar.click()
    }
})

btnEnviar.addEventListener("click", enviar);