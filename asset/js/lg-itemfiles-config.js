(function($) {
    $(document).ready(function() {        
        var galleryState = ($('#itemfiles li').length > 1) ? true : false;

        var lgContainer = document.getElementById('itemfiles');
        var inlineGallery = lightGallery(lgContainer, {
            container: lgContainer,
            dynamic: false,
            hash: false,
            closable: false,
            thumbnail: true,
            selector: '.media.resource',
            exThumbImage: 'data-thumb',
            showMaximizeIcon: true,
            autoplayFirstVideo: false,
            zoom: 1,
            showZoomInOutIcons: true,
            actualSizeIcons: {
                zoomIn: 'hidden', 
                zoomOut: 'o-icon-undo',
            },
            plugins: [
                lgThumbnail,lgZoom,lgVideo,
            ],
        });

        inlineGallery.openGallery();

        // bouton visionneuse
        $("#btn-lg").click(function(){
            $("#itemfiles").toggle();
            $("#lg-container-1").toggleClass("lg-inline");
        });
        $(".lg-maximize").click(function(){
            $("#itemfiles").toggle();
        });

        $(".secondary-block .media img").click(function(){
            $("#itemfiles").toggle();
            let n = $(this).parent().index();
		    $("#lg-container-1").toggleClass("lg-inline");
            inlineGallery.slide(n-1);
        });
    });
})(jQuery)
