var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var JDialogUI = (function (_super) {
    __extends(JDialogUI, _super);
    function JDialogUI(contentStr) {
        var _this = _super.call(this) || this;
        _this.contentStr = contentStr;
        _this.content.text = contentStr;
        _this.dclose.on(Laya.Event.CLICK, _this, function () {
            _this.close();
        });
        return _this;
    }
    return JDialogUI;
}(ui.jdialogUI));
//# sourceMappingURL=JDialogUI.js.map