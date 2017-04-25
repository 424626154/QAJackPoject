/*
* name;
*/
class UButController{
    
    startX:number;
    startY:number;

    endX:number;
    endY:number;


    isOpen:boolean;

    ubutton:ui.ubuttonUI;

    constructor(ubutton:ui.ubuttonUI,startX:number,startY:number){
        this.ubutton = ubutton;
        this.startX = startX;
        this.startY = startY;
        this.endX = 340
        this.endY = 825;
        this.isOpen = true;
    }
}