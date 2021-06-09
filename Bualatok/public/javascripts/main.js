
var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
    document.querySelector(".header").style.height = "250px";
    
})

// Funcion JQuery para modificar el id del producto seleccionado en el modal de compra
$(document).on("click", ".buy-button", function () {
    var productId = $(this).data('id');
    console.log(productId);
    $(".modal-footer #idproducto").val( productId );
});