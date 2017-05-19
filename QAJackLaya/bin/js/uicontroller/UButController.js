/*
* name;
*/
var UButController = (function () {
    function UButController(ubutton, startX, startY) {
        this.ubutton = ubutton;
        this.startX = startX;
        this.startY = startY;
        this.endX = 340;
        this.endY = 825;
        this.isOpen = true;
    }
    UButController.prototype.setButInfo = function (name, img) {
        this.ubutton.ublabel.text = name;
        this.ubutton.ubimg.skin = img;
    };
    return UButController;
}());
//# sourceMappingURL=UButController.js.map