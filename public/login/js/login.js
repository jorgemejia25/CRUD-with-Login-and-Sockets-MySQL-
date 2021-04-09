var socket = io();
var x = true;

$(".form_group").validate();

$('.badlogin').hide()
$('.form_group').submit(function(e) {
    if (x === true) {
        e.preventDefault();
        socket.emit('login', { user: $('#user').val(), pass: $('#pass').val() })
    } else {
        e.returnValue = true;

    }
});

socket.on('goodLogin', () => {
    x = false
    $(".form_group").submit();
    console.log('good login :D')

})

socket.on('badLogin', () => {

    console.log('bad login :c')
    $('.badlogin').fadeIn(300)

})