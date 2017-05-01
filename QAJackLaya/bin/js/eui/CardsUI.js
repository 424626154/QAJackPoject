var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var CardsUI = (function (_super) {
    __extends(CardsUI, _super);
    function CardsUI(index) {
        var _this = _super.call(this) || this;
        _this.index = index;
        if (index = -1) {
            _this.cards.skin = "cards/back.png";
        }
        else {
            _this.cards.skin = "cards/" + index + ".png";
        }
        return _this;
    }
    return CardsUI;
}(ui.cardsUI));
//# sourceMappingURL=CardsUI.js.map