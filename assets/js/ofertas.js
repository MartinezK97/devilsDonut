$(window).on('load', function () {
    const $content = $('#content');
    const $slider = $('#slider');
    const $bodyBG = $('.bodyBG');

    // Configuración inicial y recálculo en resize
    function initScroll() {
        $slider.scrollTop($slider[0].scrollHeight);
        $content.scrollTop(0); // Reset al inicio
    }

    // Ejecutar al cargar y en cada resize
    initScroll();
    $(window).on('resize', initScroll);

    // Manejo del evento scroll con throttling
    let isScrolling = false;
    $content.on('scroll', function () {
        if (isScrolling) return;
        isScrolling = true;

        requestAnimationFrame(() => {
            const contentScrollTop = $content.scrollTop();
            const contentHeight = $content.outerHeight();
            const contentScrollHeight = $content[0].scrollHeight;

            const sliderHeight = $slider.outerHeight();
            const sliderScrollHeight = $slider[0].scrollHeight;

            const bodyBGWdth = $bodyBG.outerWidth();
            const bodyBGScrollWdth = $bodyBG[0].scrollWidth;

            // Validación de máximos
            const contentMaxScroll = Math.max(contentScrollHeight - contentHeight, 1);
            const sliderMaxScroll = Math.max(sliderScrollHeight - sliderHeight, 1);
            const bodyBGMaxScroll = Math.max(bodyBGScrollWdth - bodyBGWdth, 1);

            // Cálculos con límites
            const sliderPosition = Math.round(sliderMaxScroll - (contentScrollTop * sliderMaxScroll / contentMaxScroll));
            const bodyBGPosition = Math.round(contentScrollTop * bodyBGMaxScroll / contentMaxScroll);

            // Aplicación con verificación
            if ($slider.scrollTop() !== sliderPosition) {
                $slider.scrollTop(sliderPosition);
            }

            if ($bodyBG.scrollLeft() !== bodyBGPosition) {
                $bodyBG.scrollLeft(bodyBGPosition);
            }

            isScrolling = false;
        });
    });
});