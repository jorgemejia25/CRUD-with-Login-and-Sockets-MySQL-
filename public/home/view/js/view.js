var socket = io();

socket.emit('recibirBBDD')



socket.on('enviarBBDD', (bd) => {

    var pag = parseInt($('.pag').text().trim()) - 1


    arrayPaginado = [
        []
    ];

    for (let i in bd) {
        if (arrayPaginado[arrayPaginado.length - 1][17] == undefined) {
            arrayPaginado[arrayPaginado.length - 1].push(bd[i]);
        } else {
            arrayPaginado.push([]);
            arrayPaginado[arrayPaginado.length - 1].push(bd[i]);
        }
    }

    for (i in arrayPaginado[pag]) {
        $('table').find('tbody').append('<tr>')
        $('table').find('tbody').append('    <td class="textT" >' + arrayPaginado[pag][i].id + '</td>')
        $('table').find('tbody').append('    <td ><input type="text" id="tNombre' + arrayPaginado[pag][i].id + '" class="inputNombre inputT" value="' + arrayPaginado[pag][i].nombre + '"></td>')
        $('table').find('tbody').append('    <td ><input type="text" class="inputCategoria inputT"  id="tCategoria' + arrayPaginado[pag][i].id + '"value="' + arrayPaginado[pag][i].categoria + '"></td>')
        $('table').find('tbody').append('    <td class="textT">' + arrayPaginado[pag][i].id_cliente + '</td>')
        $('table').find('tbody').append('    <td class="textT"><button  class="botonG" idBoton="' + arrayPaginado[pag][i].id + '">Editar</button></td>')
        $('table').find('tbody').append('    <td class="textT"><button  class="botonB" idBoton="' + arrayPaginado[pag][i].id + '">Borrar</button></td>')

        $('table').find('tbody').append('</tr>')

    }
    var siguiente = pag + 2
    var refS = "http://localhost:3000/home/view/" + siguiente
    var refA = "http://localhost:3000/home/view/" + pag

    console.log(refS)

    if (pag < arrayPaginado.length - 1) $('.boton1ref').attr("href", refS)
    if (pag > 0) $('.boton2ref').attr("href", refA)

    $('.botonG').click(function() {
        idB = this.getAttribute('idBoton')
        tNombre = $('#tNombre' + idB).val()
        tCategoria = $('#tCategoria' + idB).val()


        socket.emit('editarProductos', { id: idB, nombre: tNombre, categoria: tCategoria })

    })
    $('.botonB').click(function() {
        idB = this.getAttribute('idBoton')
        socket.emit('borrarProducto', { id: idB })
    })
})


socket.on('datosActualizados', function() { location.reload() })
socket.on('datosBorrados', function() { location.reload() })