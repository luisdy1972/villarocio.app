// ocultar nav con el scrol

let ubicacionPrincipal = window.pageYOffset;
window.onscroll = function retraer_nav () {
    let DesplazamientoActual = window.pageYOffset;
    if (ubicacionPrincipal >= DesplazamientoActual) {
        document.getElementById('barraDeNavegacion').style.top = '0px';
    } else {
        document.getElementById('barraDeNavegacion').style.top = '-500px';
    }
    ubicacionPrincipal = DesplazamientoActual;
}
// función de copiado en el porta papeles
function copiarAlPortapapeles(id_elemento) {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    alert('Enlace copiado.');
}
