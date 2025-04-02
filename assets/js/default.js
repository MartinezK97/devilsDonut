$(document).ready(function () {
    const scrollV = document.querySelector("#content-all"); // Contenedor con scroll vertical
    const scrollH = document.querySelector(".scrollH"); // Contenedor con scroll horizontal
    const products = document.querySelectorAll(".product"); // Lista de productos
    const productImages = document.querySelectorAll(".product img");

    if (scrollV && scrollH && products.length > 0) {
        const countElems = products.length; // Cantidad de elementos
        const elemV = products[0].clientHeight; // Altura de un producto
        const elemH = document.querySelector(".product-content").clientWidth; // Ancho de un producto horizontal

        console.log("Altura de cada producto:", elemV);
        console.log("Ancho de cada producto:", elemH);

        // Máximo desplazamiento
        const maxScrollVertical = scrollV.scrollHeight - scrollV.clientHeight;
        const maxScrollHorizontal = scrollH.scrollWidth - scrollH.clientWidth;

        console.log("Máximo scroll vertical:", maxScrollVertical);
        console.log("Máximo scroll horizontal:", maxScrollHorizontal);
        console.log("Cantidad de productos:", countElems);

        // Evento para detectar scroll vertical
        scrollV.addEventListener("scroll", function () {
            var scrollTop = scrollV.scrollTop;
            var scrollPercent = (scrollTop / maxScrollVertical) * 100; // Porcentaje de desplazamiento
            console.log("Scroll vertical en %", scrollPercent);
            calcScrollH = (scrollPercent * maxScrollHorizontal) / 100; // Calcular el desplazamiento horizontal correspondiente
            scrollH.scrollLeft = calcScrollH; // Aplicar el desplazamiento horizontal


            const radioDona = elemH / 2.25;
            const circunferencia = 2 * Math.PI * radioDona;
            const gradosRotacion = (calcScrollH / circunferencia) * 360;
            console.log(gradosRotacion);
            // Aplicar la rotación a todas las imágenes
            productImages.forEach(img => {
                img.style.transform = `rotateZ(-${gradosRotacion}deg)`;
            });
            // $(".product img").css('transform', 'rotateZ(-' + (scrollPercent * 5) + 'deg)')
        });
    } else {
        console.error("Error: No se encontraron los elementos necesarios o no tienen scroll.");
    }




    //Reducir la velocidad del video de portada

});

document.addEventListener("DOMContentLoaded", function () {
    const video = document.querySelector("#portada video");
    if (video) {
        video.playbackRate = 0.5; // Reduce la velocidad a la mitad

        // Forzar la velocidad cada 500ms si el navegador la ignora
        setInterval(() => {
            if (video.playbackRate !== 0.75) {
                video.playbackRate = 0.75;
            }
        }, 500);
    }
});