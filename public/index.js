const socket = io ();

socket.on("connect", ()=>{
    console.log("Me Conecte!!!")
})

socket.on("data-generica", data =>{
   console.log(data)
})
socket.on("arr-chat", data =>{
    const html = data.reduce((html,item)=>'<div>'+ item +'</div>' + html, "");

    document.getElementById('div-chats').innerHTML=html;
 });



function enviar(){
   
const nombre = document.getElementById("caja-nombre").value;
const msg = document.getElementById("caja-msg").value;
socket.emit("data-generica", nombre +" "+"dice"+" "+msg);
}