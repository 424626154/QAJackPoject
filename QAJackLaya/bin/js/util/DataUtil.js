/*
* name;
*/
var DataUtil = (function () {
    function DataUtil() {
    }
    DataUtil.locationsS2C = function (slocations, baseUid) {
        var clocations = new Array();
        var mylocation = 0;
        for (var i = 0; i < slocations.length; i++) {
            if (slocations[i] == baseUid) {
                mylocation = i;
                break;
            }
        }
        var devlocation = 0; //偏移量
        devlocation = mylocation - 2;
        for (var i = 0; i < 5; i++) {
            var index = i + devlocation;
            if (index < 0) {
                index = 5 + index;
            }
            else if (index >= 5) {
                index = index - 5;
            }
            clocations[i] = slocations[index];
        }
        console.log('slocations:', slocations, 'clocations:', clocations, 'mylocation:', mylocation);
        return clocations;
    };
    DataUtil.locationsAddS2C = function (slocations, clocations, sUid, mUid) {
        var mylocation = 0;
        if (sUid != mUid) {
            var userlocation = 0;
            for (var i = 0; i < slocations.length; i++) {
                if (slocations[i] == sUid) {
                    userlocation = i;
                    break;
                }
            }
            for (var i = 0; i < slocations.length; i++) {
                if (slocations[i] == mUid) {
                    mylocation = i;
                    break;
                }
            }
            var devlocation = 0; //偏移量
            devlocation = userlocation - mylocation;
            var showindex = 2 + userlocation;
            if (showindex < 0) {
                showindex = 5 + showindex;
            }
            else if (showindex >= 5) {
                showindex = showindex - 5;
            }
            clocations[showindex] = slocations[userlocation];
            return showindex;
        }
        console.log('slocations:', slocations, 'clocations:', clocations, 'mylocation:', mylocation);
    };
    return DataUtil;
}());
//# sourceMappingURL=DataUtil.js.map