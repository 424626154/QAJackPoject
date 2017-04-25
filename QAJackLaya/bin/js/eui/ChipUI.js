var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var ChipUI = (function (_super) {
    __extends(ChipUI, _super);
    function ChipUI(chipnum) {
        var _this = _super.call(this) || this;
        _this.chipNum = chipnum;
        return _this;
        // this.chip.text = chipnum+"";
    }
    return ChipUI;
}(ui.chipUI));
//# sourceMappingURL=ChipUI.js.map