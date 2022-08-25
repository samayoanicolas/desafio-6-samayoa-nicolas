//https://socket.io/docs/v4/server-initialization/
const express = require("express");
const app = express();

//IMPLEMENTACION
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

httpServer.listen( process.env.PORT || 8080, () => console.log("SERVER ON"));

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

let productsHC = [
  { id: 1, title: 'nike ball', price: 101, thumbnail: 'http://localhost:8080/public/nike-ball.jpg' },
  { id: 2, title: 'nike shoes', price: 102, thumbnail: 'http://localhost:8080/public/nike-shoes.jpg' },
  { id: 3, title: 'adidas shoes', price: 102, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
];

let chat=[];

app.get('/form', (req, res) => {
  res.render('pages/form', { title: 'Carga de productos',products: productsHC});
});
app.post('/products', (req, res) => {
  const  {body}  = req;
  productsHC.push(body);
  res.render('pages/index', { title: 'listado de productos', products: productsHC });
});

io.on('connection', socket => {
  console.log('Usuario conectado'+ socket.id);
  chat.push("se unio al chat   ", socket.id)
  io.sockets.emit("arr-chat", chat);
  setTimeout(() => {
    socket.emit("data-generica", "hace 4 seg que estas conectado");   
  }, 4000);

  socket.on('data-generica', data =>{
    chat.push(data);                        
    io.sockets.emit("arr-chat", chat);
  })


});