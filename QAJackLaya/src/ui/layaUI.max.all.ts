
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class cardsUI extends View {
		public cards:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":49,"height":67},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"cards","skin":"cards/0.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.cardsUI.uiView);
        }
    }
}

module ui {
    export class chipUI extends View {
		public bg:Laya.Image;
		public  chip:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":52,"height":58},"child":[{"type":"Image","props":{"y":0,"x":0,"width":52,"var":"bg","skin":"chip/chip01.png","height":58}},{"type":"Label","props":{"y":22,"x":5,"width":42,"var":" chip","text":"label","height":12,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.chipUI.uiView);
        }
    }
}

module ui {
    export class createroomUI extends View {
		public create:Laya.Button;
		public croomid:Laya.Label;
		public join:Laya.Button;
		public jroomid:Laya.TextInput;
		public close:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":768,"height":1024},"child":[{"type":"Image","props":{"y":0,"x":0,"width":768,"skin":"comp/bg.png","sizeGrid":"20,4,4,4","height":1024}},{"type":"Box","props":{"y":169,"x":96},"child":[{"type":"Image","props":{"width":556,"skin":"comp/bg.png","height":318}},{"type":"Button","props":{"y":202,"x":126,"width":267,"var":"create","skin":"comp/button.png","labelSize":30,"label":"创建房间","height":78}},{"type":"Label","props":{"y":115,"x":137,"width":254,"var":"croomid","text":"roomid","height":69,"fontSize":30,"align":"center"}}]},{"type":"Box","props":{"y":573,"x":96},"child":[{"type":"Image","props":{"width":556,"skin":"comp/bg.png","height":318}},{"type":"Button","props":{"y":203,"x":122,"width":267,"var":"join","skin":"comp/button.png","labelSize":30,"label":"加入房间","height":78}},{"type":"TextInput","props":{"y":127,"x":120,"width":289,"var":"jroomid","skin":"comp/textinput.png","height":56,"fontSize":30,"align":"center"}}]},{"type":"Button","props":{"y":25,"x":605,"width":139,"var":"close","skin":"comp/btn_close.png","height":82}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.createroomUI.uiView);
        }
    }
}

module ui {
    export class jdialogUI extends Dialog {
		public dclose:Laya.Button;
		public content:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":768,"height":1024},"child":[{"type":"Image","props":{"y":309,"x":-30,"width":768,"skin":"comp/bg.png","sizeGrid":"10,4,4,4","pivotY":-3.3333333333333712,"pivotX":-30,"height":400}},{"type":"Button","props":{"y":339,"x":672,"width":82,"var":"dclose","skin":"comp/btn_close.png","height":58}},{"type":"Label","props":{"y":430,"x":32,"wordWrap":true,"width":703,"var":"content","overflow":"scroll","height":161,"fontSize":24}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.jdialogUI.uiView);
        }
    }
}

module ui {
    export class loadingUI extends View {
		public bar:Laya.ProgressBar;

        public static  uiView:any ={"type":"View","props":{"width":768,"height":1024},"child":[{"type":"Image","props":{"y":0,"x":0,"width":768,"skin":"loading/bg.png","sizeGrid":"20,4,4,4","height":1024}},{"type":"ProgressBar","props":{"y":505,"x":79,"width":610,"var":"bar","value":0,"skin":"loading/progress.png","height":14}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.loadingUI.uiView);
        }
    }
}

module ui {
    export class loginUI extends View {
		public uname:Laya.TextInput;
		public pwd:Laya.TextInput;
		public login:Laya.Button;
		public register:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":768,"height":1024},"child":[{"type":"Image","props":{"y":-73,"x":0,"width":768,"skin":"comp/bg.png","sizeGrid":"22,4,4,4","pivotY":-73.33333333333334,"height":1024}},{"type":"Box","props":{"y":136,"x":43,"width":681,"height":78},"child":[{"type":"Label","props":{"y":25,"width":129,"text":"用户名:","height":30,"fontSize":30}},{"type":"TextInput","props":{"y":2,"x":120,"width":549,"var":"uname","skin":"comp/textinput.png","height":76,"fontSize":30}}]},{"type":"Box","props":{"y":227,"x":43,"width":671,"height":78},"child":[{"type":"Label","props":{"y":25,"width":129,"text":"密码:","height":30,"fontSize":30}},{"type":"TextInput","props":{"y":2,"x":120,"width":549,"var":"pwd","skin":"comp/textinput.png","height":76,"fontSize":30}}]},{"type":"Box","props":{"y":332,"x":255},"child":[{"type":"Button","props":{"width":202,"var":"login","skin":"comp/button.png","labelSize":30,"label":"登录","height":64}},{"type":"Button","props":{"x":253,"width":202,"var":"register","skin":"comp/button.png","labelSize":30,"label":"注册","height":64}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.loginUI.uiView);
        }
    }
}

module ui {
    export class playerUI extends View {
		public head:Laya.Image;
		public uname:Laya.Label;
		public chip:Laya.Label;
		public umask:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":100,"height":144},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"game/userbg.png"}},{"type":"Image","props":{"y":23,"x":5,"var":"head","skin":"game/userheadbg.png"}},{"type":"Label","props":{"y":5,"x":12,"width":76,"var":"uname","text":"label","height":16,"align":"center"}},{"type":"Label","props":{"y":122,"x":12,"width":76,"var":"chip","text":"label","height":16,"align":"center"}},{"type":"Image","props":{"y":0,"x":0,"width":100,"var":"umask","skin":"game/mask.png","sizeGrid":"16,16,16,16","height":144}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.playerUI.uiView);
        }
    }
}

module ui {
    export class registerUI extends View {
		public uname:Laya.TextInput;
		public pwd:Laya.TextInput;
		public register:Laya.Button;
		public close:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":768,"height":1024},"child":[{"type":"Image","props":{"y":-74,"x":0,"width":768,"skin":"comp/bg.png","sizeGrid":"22,4,4,4","pivotY":-73.33333333333334,"height":1024}},{"type":"Box","props":{"y":166,"x":48,"width":673,"height":78},"child":[{"type":"Label","props":{"y":25,"width":129,"text":"用户名:","height":30,"fontSize":30}},{"type":"TextInput","props":{"y":2,"x":120,"width":544,"var":"uname","skin":"comp/textinput.png","height":76,"fontSize":30}}]},{"type":"Box","props":{"y":269,"x":50,"width":651,"height":78},"child":[{"type":"Label","props":{"y":25,"width":129,"text":"密码:","height":30,"fontSize":30}},{"type":"TextInput","props":{"y":2,"x":120,"width":546,"var":"pwd","skin":"comp/textinput.png","height":76,"fontSize":30}}]},{"type":"Button","props":{"y":371,"x":496,"width":202,"var":"register","skin":"comp/button.png","labelSize":30,"label":"注册","height":64}},{"type":"Button","props":{"y":4,"x":644,"width":99,"var":"close","skin":"comp/btn_close.png","height":70}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.registerUI.uiView);
        }
    }
}

module ui {
    export class roomUI extends View {
		public player01:ui.playerUI;
		public player02:ui.playerUI;
		public player05:ui.playerUI;
		public player04:ui.playerUI;
		public player03:ui.playerUI;
		public ubut01:ui.ubuttonUI;
		public ubut02:ui.ubuttonUI;
		public ubut03:ui.ubuttonUI;
		public ubut04:ui.ubuttonUI;
		public ubut05:ui.ubuttonUI;
		public round:Laya.Label;
		public allchip:Laya.Label;
		public showmenu:Laya.Image;
		public menu:Laya.Box;
		public zhanqi:Laya.Image;
		public huanzhuo:Laya.Image;
		public fanhui:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":768,"height":1024},"child":[{"type":"Image","props":{"y":-56,"x":-41,"width":771,"skin":"room_bg.png","pivotY":-57.14285714285717,"pivotX":-42.85714285714283,"height":1024}},{"type":"Image","props":{"y":19,"x":321,"width":126,"skin":"game/npc.png","height":152}},{"type":"player","props":{"y":284,"x":44,"var":"player01","runtime":"ui.playerUI"}},{"type":"player","props":{"y":524,"x":44,"var":"player02","runtime":"ui.playerUI"}},{"type":"player","props":{"y":284,"x":623,"var":"player05","runtime":"ui.playerUI"}},{"type":"player","props":{"y":524,"x":623,"var":"player04","runtime":"ui.playerUI"}},{"type":"player","props":{"y":790,"x":338,"var":"player03","runtime":"ui.playerUI"}},{"type":"ubutton","props":{"y":845,"x":175,"var":"ubut01","runtime":"ui.ubuttonUI"}},{"type":"ubutton","props":{"y":720,"x":223,"var":"ubut02","runtime":"ui.ubuttonUI"}},{"type":"ubutton","props":{"y":678,"x":344,"var":"ubut03","runtime":"ui.ubuttonUI"}},{"type":"ubutton","props":{"y":720,"x":461,"var":"ubut04","runtime":"ui.ubuttonUI"}},{"type":"ubutton","props":{"y":845,"x":515,"var":"ubut05","runtime":"ui.ubuttonUI"}},{"type":"Label","props":{"y":228,"x":338,"width":100,"var":"round","text":"第1/15轮","height":19,"align":"center"}},{"type":"Label","props":{"y":249,"x":341,"width":94,"var":"allchip","text":"allchip","height":21,"align":"center"}},{"type":"Image","props":{"y":13,"x":18,"width":62,"var":"showmenu","skin":"game/room_menu.png","height":62}},{"type":"Box","props":{"y":5,"x":17,"width":126,"var":"menu","height":144},"child":[{"type":"Image","props":{"y":0,"x":0,"width":120,"skin":"game/menu_bg.png","sizeGrid":"10,10,10,10","height":188}},{"type":"Image","props":{"y":72,"x":19,"var":"zhanqi","skin":"game/menuitem01.png"}},{"type":"Image","props":{"y":119,"x":19,"var":"huanzhuo","skin":"game/menuitem02.png"}},{"type":"Image","props":{"y":22,"x":19,"var":"fanhui","skin":"game/menuitem00.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.playerUI",ui.playerUI);
			View.regComponent("ui.ubuttonUI",ui.ubuttonUI);

            super.createChildren();
            this.createView(ui.roomUI.uiView);
        }
    }
}

module ui {
    export class testUI extends View {
		public uname:Laya.TextInput;
		public room:Laya.TextInput;
		public start:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":768,"height":1024},"child":[{"type":"Image","props":{"y":0,"x":0,"width":768,"skin":"comp/bg.png","sizeGrid":"20,4,4,4","height":1024}},{"type":"Box","props":{"y":373,"x":138},"child":[{"type":"Label","props":{"y":-15,"x":2,"width":129,"text":"用户名","height":39,"fontSize":30,"align":"center"}},{"type":"TextInput","props":{"y":-41,"x":150,"width":342,"var":"uname","skin":"comp/textinput.png","height":91,"fontSize":30}}]},{"type":"Box","props":{"y":443,"x":138},"child":[{"type":"Label","props":{"y":25,"x":0,"width":129,"text":"房间","height":40,"fontSize":30,"align":"center"}},{"type":"TextInput","props":{"y":0,"x":150,"width":342,"var":"room","skin":"comp/textinput.png","height":87,"fontSize":30}}]},{"type":"Button","props":{"y":556,"x":137,"width":489,"var":"start","skin":"comp/button.png","labelSize":30,"label":"进入","height":90}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.testUI.uiView);
        }
    }
}

module ui {
    export class ubuttonUI extends View {
		public ubimg:Laya.Image;
		public ublabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":88,"height":110},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"ubimg","skin":"game/ubut01.png"}},{"type":"Label","props":{"y":90,"x":0,"width":88,"var":"ublabel","text":"label","height":20,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ubuttonUI.uiView);
        }
    }
}
