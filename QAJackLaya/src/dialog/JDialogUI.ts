/*
* name;
*/
class JDialogUI extends ui.jdialogUI{
    contentStr:string;
    constructor(contentStr:string){
        super();
        this.contentStr = contentStr;
        this.content.text = contentStr;
        this.dclose.on(Laya.Event.CLICK,this,()=>{
            this.close();
        })
    }

    
}