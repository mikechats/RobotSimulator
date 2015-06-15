var robotCanvas = (function () {

    var defaultOptions = {
        table: {
            width: 500,
            cellWidth: 100,
            cellPadding: 5,
            cells: 5
        },
        robot: {
            image: '/Content/images/robot_{DIRECTION}.png',
            width: 89,
            height: 89,
        }
    };

    //private variables
    var canvas = $("#rbtCanvas");
    var context = canvas[0].getContext("2d");

    //private functions
    var drawCanvas = function () {
        //Sets the border of the table top
        drawTableBorder();

        for (var i = 0; i <= defaultOptions.table.width; i += defaultOptions.table.cellWidth) {
            context.moveTo(i, 0);
            context.lineTo(i, defaultOptions.table.width);
        }

        for (var j = 0; j <= defaultOptions.table.width; j += defaultOptions.table.cellWidth) {
            context.moveTo(0, j);
            context.lineTo(defaultOptions.table.width, j);
        }

        context.setLineDash([2, 5]);
        context.strokeStyle = "#AAA";
        context.stroke();
    }

    var drawTableBorder = function () {
        context.moveTo(0, 0);
        context.lineTo(0, defaultOptions.table.width);

        context.moveTo(0, 0);
        context.lineTo(defaultOptions.table.width, 0);

        context.moveTo(defaultOptions.table.width, 0);
        context.lineTo(defaultOptions.table.width, defaultOptions.table.width);

        context.moveTo(0, defaultOptions.table.width);
        context.lineTo(defaultOptions.table.width, defaultOptions.table.width);

        context.stroke();
    };

    var clearRobot = function (x, y) {
        context.clearRect(getXOffSet(x),
            getYOffSet(y),
            defaultOptions.robot.width,
            defaultOptions.robot.height);
    };

    var drawRobot = function (x, y, directionName) {                 
        var img = document.getElementById("robot_"+directionName.toLowerCase());
        context.drawImage(img, getXOffSet(x), getYOffSet(y));
    };

    var getXOffSet = function(x) {
        return x * defaultOptions.table.cellWidth + defaultOptions.table.cellPadding;
    };

    var getYOffSet = function (y) {
        return ((defaultOptions.table.cells - y) * defaultOptions.table.cellWidth) - (defaultOptions.robot.width + defaultOptions.table.cellPadding);
    };

    var init = function (options) {
        $.extend(true, defaultOptions, options);

        //set up canvas
        drawCanvas();
    }

    return {
        init: init,
        drawRobot: drawRobot,
        options: defaultOptions,
        clearRobot: clearRobot
    };

})();