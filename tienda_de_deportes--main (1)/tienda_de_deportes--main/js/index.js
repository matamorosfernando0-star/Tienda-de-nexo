var botonesFiltro = document.getElementsByClassName('filtro');
var tarjetas = document.getElementsByClassName('tarjeta');       
var modal = document.getElementById('modal');                    


var tallaElegida = '';
var colorElegido = '';

function filtrar(categoria) {
  for (var i = 0; i < tarjetas.length; i++) {
    var categoriaTarjeta = tarjetas[i].getAttribute('data-categoria');

    if (categoria == 'Todos' || categoriaTarjeta == categoria) {
      tarjetas[i].classList.remove('oculta');   
    } else {
      tarjetas[i].classList.add('oculta');     
    }
  }
}


function activarBotonFiltro(boton) {
  boton.onclick = function () {
  
    for (var i = 0; i < botonesFiltro.length; i++) {
      botonesFiltro[i].classList.remove('activo');
    }
  
    boton.classList.add('activo');
   
    filtrar(boton.getAttribute('data-filtro'));
  };
}


for (var i = 0; i < botonesFiltro.length; i++) {
  activarBotonFiltro(botonesFiltro[i]);
}




function codigoColor(nombre) {
  if (nombre == 'Negro') return '#111111';
  if (nombre == 'Gris') return '#6b7280';
  if (nombre == 'Blanco') return '#f1f5f9';
  if (nombre == 'Azul medianoche') return '#0b1d4a';
  if (nombre == 'Turquesa') return '#14b8a6';
  return '#888888';   // si el color no está en la lista
}


function mostrarSeleccion() {
  document.getElementById('modalSeleccion').textContent =
    'Talla: ' + tallaElegida + '  ·  Color: ' + colorElegido;
}


function elegirTalla(boton) {
  var botones = document.getElementById('modalTallas').children;
  for (var i = 0; i < botones.length; i++) {
    botones[i].classList.remove('activo');
  }
  boton.classList.add('activo');
  tallaElegida = boton.getAttribute('data-valor');
  mostrarSeleccion();
}


function elegirColor(boton) {
  var botones = document.getElementById('modalColores').children;
  for (var i = 0; i < botones.length; i++) {
    botones[i].classList.remove('activo');
  }
  boton.classList.add('activo');
  colorElegido = boton.getAttribute('data-valor');
  mostrarSeleccion();
}


function crearTallas(lista) {
  var caja = document.getElementById('modalTallas');
  caja.innerHTML = '';   

  for (var i = 0; i < lista.length; i++) {
    var boton = document.createElement('button');
    boton.className = 'opcion';
    boton.textContent = lista[i];
    boton.setAttribute('data-valor', lista[i]);
    boton.onclick = function () {
      elegirTalla(this);  
    };
    caja.appendChild(boton);
  }
  elegirTalla(caja.children[0]);  
}


function crearColores(lista) {
  var caja = document.getElementById('modalColores');
  caja.innerHTML = '';

  for (var i = 0; i < lista.length; i++) {
    var boton = document.createElement('button');
    boton.className = 'opcion muestra';
    boton.style.background = codigoColor(lista[i]);
    boton.title = lista[i];
    boton.setAttribute('data-valor', lista[i]);
    boton.onclick = function () {
      elegirColor(this);
    };
    caja.appendChild(boton);
  }
  elegirColor(caja.children[0]);  
}


function abrirModal(tarjeta) {
  
  document.getElementById('modalImg').src = tarjeta.getElementsByTagName('img')[0].src;
  document.getElementById('modalCat').textContent = tarjeta.getAttribute('data-categoria');
  document.getElementById('modalNombre').textContent = tarjeta.getElementsByTagName('h3')[0].textContent;
  document.getElementById('modalPrecio').textContent = tarjeta.getElementsByClassName('precio')[0].textContent;
  document.getElementById('modalDesc').textContent = tarjeta.getElementsByTagName('p')[0].textContent;

  
  crearTallas(tarjeta.getAttribute('data-tallas').split(','));
  crearColores(tarjeta.getAttribute('data-colores').split(','));

  modal.classList.add('abierto');  
}


function cerrarModal() {
  modal.classList.remove('abierto');
}


function activarTarjeta(tarjeta) {
  tarjeta.onclick = function () {
    abrirModal(tarjeta);
  };
}

for (var j = 0; j < tarjetas.length; j++) {
  activarTarjeta(tarjetas[j]);
}



document.getElementById('modalCerrar').onclick = cerrarModal;


modal.onclick = function (evento) {
  if (evento.target == modal) {
    cerrarModal();
  }
};


document.onkeydown = function (evento) {
  if (evento.key == 'Escape') {
    cerrarModal();
  }
};



var carrito = [];


function abrirCarrito() {
  document.getElementById('carritoPanel').classList.add('activo');
  document.getElementById('overlay').classList.add('activo');
}

function cerrarCarrito() {
  document.getElementById('carritoPanel').classList.remove('activo');
  document.getElementById('overlay').classList.remove('activo');
}

function agregarAlCarrito() {
  var nombre = document.getElementById('modalNombre').textContent;
  var foto = document.getElementById('modalImg').src;


  var textoPrecio = document.getElementById('modalPrecio').textContent;
  var precio = Number(textoPrecio.replace('$', '').replace('.', ''));

  
  var producto = {
    nombre: nombre,
    precio: precio,
    talla: tallaElegida,
    color: colorElegido,
    foto: foto
  };
  carrito.push(producto);

  mostrarCarrito();
  cerrarModal();     
  abrirCarrito();   
}

function quitarDelCarrito(posicion) {
  carrito.splice(posicion, 1);   
  mostrarCarrito();
}


function mostrarCarrito() {
  var caja = document.getElementById('carritoItems');
  var total = 0;


  if (carrito.length == 0) {
    caja.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
  } else {
    caja.innerHTML = '';  

    for (var i = 0; i < carrito.length; i++) {
      var p = carrito[i];
      total = total + p.precio;

      caja.innerHTML = caja.innerHTML +
        '<div class="carrito-item">' +
          '<img src="' + p.foto + '" alt="' + p.nombre + '">' +
          '<div class="carrito-item-info">' +
            '<h4>' + p.nombre + '</h4>' +
            '<small>Talla: ' + p.talla + ' · Color: ' + p.color + '</small>' +
            '<p>$' + p.precio.toLocaleString('es-CO') + '</p>' +
          '</div>' +
          '<button class="btn-eliminar" onclick="quitarDelCarrito(' + i + ')">🗑</button>' +
        '</div>';
    }
  }

  
  document.getElementById('carritoTotal').textContent = '$' + total.toLocaleString('es-CO');
  document.getElementById('carritoCount').textContent = carrito.length;
}


function finalizarCompra() {
  if (carrito.length == 0) {
    alert('Tu carrito está vacío');
  } else {
    alert('¡Gracias por tu compra en Nexo!');
    carrito = [];          // vaciamos la lista
    mostrarCarrito();
    cerrarCarrito();
  }
}

var escAnterior = document.onkeydown;
document.onkeydown = function (evento) {
  escAnterior(evento);
  if (evento.key == 'Escape') {
    cerrarCarrito();
  }
};