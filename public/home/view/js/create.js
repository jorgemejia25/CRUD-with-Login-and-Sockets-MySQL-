var socket = io();
console.log($('.invisible').text().trim());


$('.btn').click(function(e) {
    e.preventDefault();
    var nombre = $('#nombre').val();
    var categoria = $("#categoria").val();
    var idCliente = $("#IdCliente").val();
    if ((nombre == '') || (String(idCliente) == '') || (categoria == '')) {
        alert('Debes llenar todos los campos.')
    } else {
        socket.emit('enviarCliente', { nombre: nombre, categoria: categoria, idCliente: idCliente });

    }
})

socket.on('ingresoExitoso', function() {
    console.log('Datos ingresados con exito');


    $(".mensaje").animate({
        top: 30,
    }, 1000);


    $(".mensaje").animate({
        top: -90,
    }, 1000);
})