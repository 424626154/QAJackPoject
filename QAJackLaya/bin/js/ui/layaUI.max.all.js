var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var cardsUI = (function (_super) {
        __extends(cardsUI, _super);
        function cardsUI() {
            return _super.call(this) || this;
        }
        cardsUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.cardsUI.uiView);
        };
        return cardsUI;
    }(View));
    cardsUI.uiView = { "type": "View", "props": { "width": 49, "height": 67 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "cards", "skin": "cards/0.png" } }] };
    ui.cardsUI = cardsUI;
})(ui || (ui = {}));
(function (ui) {
    var chipUI = (function (_super) {
        __extends(chipUI, _super);
        function chipUI() {
            return _super.call(this) || this;
        }
        chipUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.chipUI.uiView);
        };
        return chipUI;
    }(View));
    chipUI.uiView = { "type": "View", "props": { "width": 52, "height": 58 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 52, "var": "bg", "skin": "chip/chip01.png", "height": 58 } }, { "type": "Label", "props": { "y": 22, "x": 5, "width": 42, "var": " chip", "text": "label", "height": 12, "align": "center" } }] };
    ui.chipUI = chipUI;
})(ui || (ui = {}));
(function (ui) {
    var createroomUI = (function (_super) {
        __extends(createroomUI, _super);
        function createroomUI() {
            return _super.call(this) || this;
        }
        createroomUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.createroomUI.uiView);
        };
        return createroomUI;
    }(View));
    createroomUI.uiView = { "type": "View", "props": { "width": 768, "height": 1024 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 768, "skin": "comp/bg.png", "sizeGrid": "20,4,4,4", "height": 1024 } }, { "type": "Box", "props": { "y": 169, "x": 96 }, "child": [{ "type": "Image", "props": { "width": 556, "skin": "comp/bg.png", "height": 318 } }, { "type": "Button", "props": { "y": 202, "x": 126, "width": 267, "var": "create", "skin": "comp/button.png", "labelSize": 30, "label": "创建房间", "height": 78 } }, { "type": "Label", "props": { "y": 115, "x": 137, "width": 254, "var": "croomid", "text": "roomid", "height": 69, "fontSize": 30, "align": "center" } }] }, { "type": "Box", "props": { "y": 573, "x": 96 }, "child": [{ "type": "Image", "props": { "width": 556, "skin": "comp/bg.png", "height": 318 } }, { "type": "Button", "props": { "y": 203, "x": 122, "width": 267, "var": "join", "skin": "comp/button.png", "labelSize": 30, "label": "加入房间", "height": 78 } }, { "type": "TextInput", "props": { "y": 127, "x": 120, "width": 289, "var": "jroomid", "skin": "comp/textinput.png", "height": 56, "fontSize": 30, "align": "center" } }] }, { "type": "Button", "props": { "y": 25, "x": 605, "width": 139, "var": "close", "skin": "comp/btn_close.png", "height": 82 } }] };
    ui.createroomUI = createroomUI;
})(ui || (ui = {}));
(function (ui) {
    var jdialogUI = (function (_super) {
        __extends(jdialogUI, _super);
        function jdialogUI() {
            return _super.call(this) || this;
        }
        jdialogUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.jdialogUI.uiView);
        };
        return jdialogUI;
    }(Dialog));
    jdialogUI.uiView = { "type": "Dialog", "props": { "width": 768, "height": 1024 }, "child": [{ "type": "Image", "props": { "y": 309, "x": -30, "width": 768, "skin": "comp/bg.png", "sizeGrid": "10,4,4,4", "pivotY": -3.3333333333333712, "pivotX": -30, "height": 400 } }, { "type": "Button", "props": { "y": 339, "x": 672, "width": 82, "var": "dclose", "skin": "comp/btn_close.png", "height": 58 } }, { "type": "Label", "props": { "y": 430, "x": 32, "wordWrap": true, "width": 703, "var": "content", "overflow": "scroll", "height": 161, "fontSize": 24 } }] };
    ui.jdialogUI = jdialogUI;
})(ui || (ui = {}));
(function (ui) {
    var loadingUI = (function (_super) {
        __extends(loadingUI, _super);
        function loadingUI() {
            return _super.call(this) || this;
        }
        loadingUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.loadingUI.uiView);
        };
        return loadingUI;
    }(View));
    loadingUI.uiView = { "type": "View", "props": { "width": 768, "height": 1024 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 768, "skin": "loading/bg.png", "sizeGrid": "20,4,4,4", "height": 1024 } }, { "type": "ProgressBar", "props": { "y": 505, "x": 79, "width": 610, "var": "bar", "value": 0, "skin": "loading/progress.png", "height": 14 } }] };
    ui.loadingUI = loadingUI;
})(ui || (ui = {}));
(function (ui) {
    var loginUI = (function (_super) {
        __extends(loginUI, _super);
        function loginUI() {
            return _super.call(this) || this;
        }
        loginUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.loginUI.uiView);
        };
        return loginUI;
    }(View));
    loginUI.uiView = { "type": "View", "props": { "width": 768, "height": 1024 }, "child": [{ "type": "Image", "props": { "y": -73, "x": 0, "width": 768, "skin": "comp/bg.png", "sizeGrid": "22,4,4,4", "pivotY": -73.33333333333334, "height": 1024 } }, { "type": "Box", "props": { "y": 136, "x": 43, "width": 681, "height": 78 }, "child": [{ "type": "Label", "props": { "y": 25, "width": 129, "text": "用户名:", "height": 30, "fontSize": 30 } }, { "type": "TextInput", "props": { "y": 2, "x": 120, "width": 549, "var": "uname", "skin": "comp/textinput.png", "height": 76, "fontSize": 30 } }] }, { "type": "Box", "props": { "y": 227, "x": 43, "width": 671, "height": 78 }, "child": [{ "type": "Label", "props": { "y": 25, "width": 129, "text": "密码:", "height": 30, "fontSize": 30 } }, { "type": "TextInput", "props": { "y": 2, "x": 120, "width": 549, "var": "pwd", "skin": "comp/textinput.png", "height": 76, "fontSize": 30 } }] }, { "type": "Box", "props": { "y": 332, "x": 255 }, "child": [{ "type": "Button", "props": { "width": 202, "var": "login", "skin": "comp/button.png", "labelSize": 30, "label": "登录", "height": 64 } }, { "type": "Button", "props": { "x": 253, "width": 202, "var": "register", "skin": "comp/button.png", "labelSize": 30, "label": "注册", "height": 64 } }] }] };
    ui.loginUI = loginUI;
})(ui || (ui = {}));
(function (ui) {
    var playerUI = (function (_super) {
        __extends(playerUI, _super);
        function playerUI() {
            return _super.call(this) || this;
        }
        playerUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.playerUI.uiView);
        };
        return playerUI;
    }(View));
    playerUI.uiView = { "type": "View", "props": { "width": 100, "height": 144 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "game/userbg.png" } }, { "type": "Image", "props": { "y": 23, "x": 5, "var": "head", "skin": "game/userheadbg.png" } }, { "type": "Label", "props": { "y": 5, "x": 12, "width": 76, "var": "uname", "text": "label", "height": 16, "align": "center" } }, { "type": "Label", "props": { "y": 122, "x": 12, "width": 76, "var": "chip", "text": "label", "height": 16, "align": "center" } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 100, "var": "umask", "skin": "game/mask.png", "sizeGrid": "16,16,16,16", "height": 144 } }] };
    ui.playerUI = playerUI;
})(ui || (ui = {}));
(function (ui) {
    var registerUI = (function (_super) {
        __extends(registerUI, _super);
        function registerUI() {
            return _super.call(this) || this;
        }
        registerUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.registerUI.uiView);
        };
        return registerUI;
    }(View));
    registerUI.uiView = { "type": "View", "props": { "width": 768, "height": 1024 }, "child": [{ "type": "Image", "props": { "y": -74, "x": 0, "width": 768, "skin": "comp/bg.png", "sizeGrid": "22,4,4,4", "pivotY": -73.33333333333334, "height": 1024 } }, { "type": "Box", "props": { "y": 166, "x": 48, "width": 673, "height": 78 }, "child": [{ "type": "Label", "props": { "y": 25, "width": 129, "text": "用户名:", "height": 30, "fontSize": 30 } }, { "type": "TextInput", "props": { "y": 2, "x": 120, "width": 544, "var": "uname", "skin": "comp/textinput.png", "height": 76, "fontSize": 30 } }] }, { "type": "Box", "props": { "y": 269, "x": 50, "width": 651, "height": 78 }, "child": [{ "type": "Label", "props": { "y": 25, "width": 129, "text": "密码:", "height": 30, "fontSize": 30 } }, { "type": "TextInput", "props": { "y": 2, "x": 120, "width": 546, "var": "pwd", "skin": "comp/textinput.png", "height": 76, "fontSize": 30 } }] }, { "type": "Button", "props": { "y": 371, "x": 496, "width": 202, "var": "register", "skin": "comp/button.png", "labelSize": 30, "label": "注册", "height": 64 } }, { "type": "Button", "props": { "y": 4, "x": 644, "width": 99, "var": "close", "skin": "comp/btn_close.png", "height": 70 } }] };
    ui.registerUI = registerUI;
})(ui || (ui = {}));
(function (ui) {
    var roomUI = (function (_super) {
        __extends(roomUI, _super);
        function roomUI() {
            return _super.call(this) || this;
        }
        roomUI.prototype.createChildren = function () {
            View.regComponent("ui.playerUI", ui.playerUI);
            View.regComponent("ui.ubuttonUI", ui.ubuttonUI);
            _super.prototype.createChildren.call(this);
            this.createView(ui.roomUI.uiView);
        };
        return roomUI;
    }(View));
    roomUI.uiView = { "type": "View", "props": { "width": 768, "height": 1024 }, "child": [{ "type": "Image", "props": { "y": -56, "x": -41, "width": 771, "skin": "room_bg.png", "pivotY": -57.14285714285717, "pivotX": -42.85714285714283, "height": 1024 } }, { "type": "Image", "props": { "y": 19, "x": 321, "width": 126, "skin": "game/npc.png", "height": 152 } }, { "type": "player", "props": { "y": 284, "x": 44, "var": "player01", "runtime": "ui.playerUI" } }, { "type": "player", "props": { "y": 524, "x": 44, "var": "player02", "runtime": "ui.playerUI" } }, { "type": "player", "props": { "y": 284, "x": 623, "var": "player05", "runtime": "ui.playerUI" } }, { "type": "player", "props": { "y": 524, "x": 623, "var": "player04", "runtime": "ui.playerUI" } }, { "type": "player", "props": { "y": 790, "x": 338, "var": "player03", "runtime": "ui.playerUI" } }, { "type": "ubutton", "props": { "y": 845, "x": 175, "var": "ubut01", "runtime": "ui.ubuttonUI" } }, { "type": "ubutton", "props": { "y": 720, "x": 223, "var": "ubut02", "runtime": "ui.ubuttonUI" } }, { "type": "ubutton", "props": { "y": 678, "x": 344, "var": "ubut03", "runtime": "ui.ubuttonUI" } }, { "type": "ubutton", "props": { "y": 720, "x": 461, "var": "ubut04", "runtime": "ui.ubuttonUI" } }, { "type": "ubutton", "props": { "y": 845, "x": 515, "var": "ubut05", "runtime": "ui.ubuttonUI" } }, { "type": "Label", "props": { "y": 228, "x": 338, "width": 100, "var": "round", "text": "第1/15轮", "height": 19, "align": "center" } }, { "type": "Label", "props": { "y": 249, "x": 341, "width": 94, "var": "allchip", "text": "allchip", "height": 21, "align": "center" } }, { "type": "Image", "props": { "y": 13, "x": 18, "width": 62, "var": "showmenu", "skin": "game/room_menu.png", "height": 62 } }, { "type": "Box", "props": { "y": 5, "x": 17, "width": 126, "var": "menu", "height": 144 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 120, "skin": "game/menu_bg.png", "sizeGrid": "10,10,10,10", "height": 188 } }, { "type": "Image", "props": { "y": 72, "x": 19, "var": "zhanqi", "skin": "game/menuitem01.png" } }, { "type": "Image", "props": { "y": 119, "x": 19, "var": "huanzhuo", "skin": "game/menuitem02.png" } }, { "type": "Image", "props": { "y": 22, "x": 19, "var": "fanhui", "skin": "game/menuitem00.png" } }] }] };
    ui.roomUI = roomUI;
})(ui || (ui = {}));
(function (ui) {
    var testUI = (function (_super) {
        __extends(testUI, _super);
        function testUI() {
            return _super.call(this) || this;
        }
        testUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.testUI.uiView);
        };
        return testUI;
    }(View));
    testUI.uiView = { "type": "View", "props": { "width": 768, "height": 1024 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 768, "skin": "comp/bg.png", "sizeGrid": "20,4,4,4", "height": 1024 } }, { "type": "Box", "props": { "y": 373, "x": 138 }, "child": [{ "type": "Label", "props": { "y": -15, "x": 2, "width": 129, "text": "用户名", "height": 39, "fontSize": 30, "align": "center" } }, { "type": "TextInput", "props": { "y": -41, "x": 150, "width": 342, "var": "uname", "skin": "comp/textinput.png", "height": 91, "fontSize": 30 } }] }, { "type": "Box", "props": { "y": 443, "x": 138 }, "child": [{ "type": "Label", "props": { "y": 25, "x": 0, "width": 129, "text": "房间", "height": 40, "fontSize": 30, "align": "center" } }, { "type": "TextInput", "props": { "y": 0, "x": 150, "width": 342, "var": "room", "skin": "comp/textinput.png", "height": 87, "fontSize": 30 } }] }, { "type": "Button", "props": { "y": 556, "x": 137, "width": 489, "var": "start", "skin": "comp/button.png", "labelSize": 30, "label": "进入", "height": 90 } }] };
    ui.testUI = testUI;
})(ui || (ui = {}));
(function (ui) {
    var ubuttonUI = (function (_super) {
        __extends(ubuttonUI, _super);
        function ubuttonUI() {
            return _super.call(this) || this;
        }
        ubuttonUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.ubuttonUI.uiView);
        };
        return ubuttonUI;
    }(View));
    ubuttonUI.uiView = { "type": "View", "props": { "width": 88, "height": 110 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "ubimg", "skin": "game/ubut01.png" } }, { "type": "Label", "props": { "y": 90, "x": 0, "width": 88, "var": "ublabel", "text": "label", "height": 20, "align": "center" } }] };
    ui.ubuttonUI = ubuttonUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map