var imgs;
var websiteObject = {
    viewerOriginalWidth: null,
    windowWidth: null,
    windowHeight: null,
    setupSizes: function() {
        windowWidth = window.outerWidth;
        windowHeight = window.outerHeight;
    },
    setupGallery: function() {
        $("#thumbnails").justifiedGallery({
            rowHeight : 100,
            lastRow : 'justify',
            margins : 5
        }).on('jg.complete', function (e) {
            console.log("done");
        });
    },
    updateViewer: function(identity) {
        $(document).on('click', identity, function() {
            var trigger = $(this),
                bgSrc = trigger.attr('data-large-img'),
                viewer = $('#viewer'),
                bg = 'url('+bgSrc+')',
                loader = $('.loader'),
                mainLoader = $('.main-loader');
                titleBox = $('.viewer-title'),
                title = trigger.attr('data-title');
                imgs=bgSrc
                console.log(bgSrc)

            if(windowWidth <= 600) {
                viewer.css("background-image", bg);
                mainLoader.fadeIn();
                setTimeout(function() {
                    titleBox.html(title);
                    mainLoader.fadeOut(300);
                }, 4000);
                setTimeout(function() {
                    viewer.fadeIn("slow");
                }, 500);
            } else {
                loader.fadeIn();
                setTimeout(function() {
                    viewer.css("background-image", bg);
                }, 500);
                setTimeout(function() {
                    titleBox.html(title);
                    loader.fadeOut(300);
                }, 3000);
            }
        });
    },
    expandViewer: function(identity) {
        $(document).on('click', identity, function() {
            var trigger = $(this),
                viewer = $('#viewer'),
                infoBox = $('#information'),
                shrinkTrigger = $('.shrink-viewer');

            if(windowWidth <= 600) {
                viewer.fadeOut("slow");
                return;
            }
            viewerOriginalWidth = viewer.css('width');
            trigger.fadeOut();
            viewer.css('width', '100%');
            shrinkTrigger.fadeIn();
        });
    },
    shrinkViewer: function(identity) {
        $(document).on('click', identity, function() {
            var trigger = $(this),
                viewer = $('#viewer'),
                expandTrigger = $('.expand-viewer');

            trigger.fadeOut();
            viewer.css('width', viewerOriginalWidth);
            expandTrigger.fadeIn();
        });
    },
    init: function() {
        websiteObject.setupGallery();
        websiteObject.setupSizes();
    }
};

$(document).ready(function() {
    websiteObject.init();
});
(function() {
    websiteObject.updateViewer('.img-thumb');
    websiteObject.expandViewer('.expand-viewer');
    websiteObject.shrinkViewer('.shrink-viewer');
    websiteObject.expandViewer('.close-btn');
})();

function Downloadpdf() {
    var imgSrc = document.getElementById('viewer');
    var styles = window.getComputedStyle(imgSrc);
    const image = styles.backgroundImage;
    var imageUrl = image.slice(4, -1).replace(/"/g, '');
   console.log(imageUrl)
   // Function to download image as PDF
function downloadImageAsPdf(imageUrl) {
  // Fetch the image data
  fetch(imageUrl)
    .then(response => response.blob())
    .then(blob => {
      // Convert the image data to Base64-encoded string
      const reader = new FileReader();
      reader.onloadend = function() {
        const base64Data = reader.result;

        // Create a new instance of jsPDF
        const doc = new jsPDF();

        // Add the image to the PDF document
        doc.addImage(base64Data, 'JPEG', 10, 10, 100, 100); // Adjust the coordinates and dimensions as needed

        // Save the PDF document
        doc.save('image.pdf');
      };

      reader.readAsDataURL(blob);
    });
};
downloadImageAsPdf(imageUrl);
}
      
  // new download
    // Create a new jsPDF instance
    

