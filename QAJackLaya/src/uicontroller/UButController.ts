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
    setButInfo(name:string,img:string):void{
        this.ubutton.ublabel.text = name;
        this.ubutton.ubimg.skin = img;
    }
}