// Definir objetos para cada tipo de helado
const helados = [
    { nombre: "Pistacho", precio: 1200 },
    { nombre: "Chocolate", precio: 1300 },
    { nombre: "Frutilla", precio: 900 }
];

// Mostrar mensaje inicial al usuario con la lista de sabores y precios
let mensajeInicial = "¡Bienvenido a la heladería!\nTenemos los siguientes sabores:\n";
helados.forEach(helado => {
    mensajeInicial += `${helado.nombre}: $${helado.precio}\n`;
});
alert(mensajeInicial);

// Función para obtener el precio de un helado por su nombre
function obtenerPrecio(nombreHelado) {
    const helado = helados.find(helado => helado.nombre.toLowerCase() === nombreHelado.toLowerCase());
    return helado ? helado.precio : 0;
}

// Obtener pedidos del usuario
let pedido = [];
let sumaPedido = 0;

do {
    pedido = [];
    sumaPedido = 0;

    helados.forEach(helado => {
        const cantidad = parseInt(prompt(`Ingrese la cantidad de helados de ${helado.nombre}:`));
        pedido.push({ nombre: helado.nombre, cantidad });
        sumaPedido += cantidad;
    });

    if (sumaPedido === 0) {
        alert("Vuelva a ingresar su pedido por favor.");
    } else if (pedido.some(item => item.cantidad > 20)) {
        alert("Hablar con el Gerente por favor.");
    }
} while (sumaPedido === 0 || pedido.some(item => item.cantidad > 20));

// Calcular el total sin descuento
let totalSinDescuento = 0;
pedido.forEach(item => {
    totalSinDescuento += item.cantidad * obtenerPrecio(item.nombre);
});

// Calcular descuento según las reglas establecidas
let descuento = 0;
const sumaIndividual = pedido.reduce((total, item) => total + (item.cantidad >= 7 ? item.cantidad : 0), 0);
const sumaTotal = pedido.reduce((total, item) => total + item.cantidad, 0);

if (sumaIndividual >= 7 || sumaTotal >= 7) {
    descuento = sumaTotal >= 12 ? 0.5 : 0.3;
}

// Calcular el total con descuento
const totalConDescuento = totalSinDescuento * (1 - descuento);

// Ordenar el pedido por precio de forma descendente
pedido.sort((a, b) => obtenerPrecio(b.nombre) - obtenerPrecio(a.nombre));

// Mostrar el detalle del pedido al usuario
let mensajePedido = "Detalle del pedido:\n";
pedido.forEach(item => {
    const subtotal = item.cantidad * obtenerPrecio(item.nombre);
    mensajePedido += `${item.nombre}: ${item.cantidad} x $${obtenerPrecio(item.nombre)} = $${subtotal}\n`;
});
mensajePedido += `\nTotal: $${totalSinDescuento}\n`;

if (descuento > 0) {
    mensajePedido += `Descuento del ${descuento * 100}%: -$${totalSinDescuento * descuento}\n`;
    mensajePedido += `Total con descuento: $${totalConDescuento}\n`;
}

// Mostrar mensaje final y agradecimiento
alert(mensajePedido);
prompt("Gracias por su pedido. Presione OK para finalizar.");
