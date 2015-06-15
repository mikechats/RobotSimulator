var robotSimulator = (function () {

    //valid commands
    var COMMANDS = {
        PLACE: "PLACE",
        MOVE: "MOVE",
        LEFT: "LEFT",
        RIGHT: "RIGHT",
        REPORT: "REPORT",
    };

    //directions object
    var DIRECTIONS = {
        NORTH: { name: "NORTH", rotation: 0 },
        EAST: { name: "EAST", rotation: 90 },
        SOUTH: { name: "SOUTH", rotation: 180 },
        WEST: { name: "WEST", rotation: 270 }
    };

    var defaultOptions = {
        table: {
        },
        robot: {
            direction: DIRECTIONS.EAST,
            x: 0,
            y: 0,
            active: false
        }
    };

    var robotCanvas;
    var firstCmd = true;

    //draws the robot in the correct position
    var drawRobot = function (x, y, direction, clear) {
        if (isValidLocation(x, y, defaultOptions.table.cells)) {
            if (clear) {
                robotCanvas.clearRobot(defaultOptions.robot.x, defaultOptions.robot.y);
            }

            if (!defaultOptions.robot.active) {
                log("Robot has not been placed yet.");
                return false;
            }

            robotCanvas.drawRobot(x, y, direction.name);
            defaultOptions.robot.x = x;
            defaultOptions.robot.y = y;
            defaultOptions.robot.direction = direction;

            firstCmd = false;

            return true;
        }

        return false;
    };

    //Check if the location exists on the table
    var isValidLocation = function (x, y, tableCells) {

        if (x < 0 || x >= tableCells) {
            log("X co-ordinate is out of range. [" + x + "]");
            return false;
        }
        if (y < 0 || y >= tableCells) {
            log("Y co-ordinate is out of range. [" + y + "]");
            return false;
        }

        return true;
    };

    //initialise components and listeners
    var init = function (cvs) {
        robotCanvas = cvs;
        defaultOptions = $.extend(true, defaultOptions, robotCanvas.options);

        getTestData();

        $("form").submit(function (e) {
            e.preventDefault();
        });

        //Set event handlers
        $("#btnExecute").on("click", function (e) {
            e.preventDefault();

            var commands = $("#cmdText").val().split('\n');

            //remove any empty elements
            commands = $.grep(commands, function (cmd) {
                return cmd.trim() !== "";
            });

            executeCommand(commands);
        });
    }

    var getTestData = function() {

        $.get('/Robot/GetTestData').done(function(result) {
            $.each(result, function (i, movement) {
                $.each(movement.Commands, function (j, cmd) {
                    var command = cmd.Name.toUpperCase();

                    console.log(cmd);
                    if (command == COMMANDS.PLACE)
                        command += " " + cmd.X + "," + cmd.Y + "," + cmd.DirectionName.toUpperCase();

                    $("#testData").append(command + "<br/>");
                    
                });

                $("#testData").append("<hr/>");
            });
        });

    };

    //simple log function
    var log = function (message) {
        $("#robotLog").prepend(message + "<br/>");
    };

    //executes an array of commands
    var executeCommand = function (commands) {

        $.each(commands, function (i, commandText) {
            var cmdParts = commandText.split(' ');
            var command = cmdParts[0].toUpperCase();
            var args = commandText.replace(command, '').replace(' ', '');

            switch (command) {
                case COMMANDS.PLACE:
                    placeRobot(args);
                    break;
                case COMMANDS.MOVE:
                    moveRobot();
                    break;
                case COMMANDS.LEFT:
                    rotateRobotLeft();
                    break;
                case COMMANDS.RIGHT:
                    rotateRobotRight();
                    break;
                case COMMANDS.REPORT:
                    reportRobotLocation();
                    break;
                default:
                    log("Command is not recognised.");
                    break;
            }
        });
    };

    //Places the robot in a valid location on the table
    var placeRobot = function(args) {
        var coords = args.split(',');

        defaultOptions.robot.active = true;

        if (drawRobot(coords[0], coords[1], DIRECTIONS[coords[2]] || defaultOptions.robot.direction, true)) {
            log("Robot is active.");
        } else if (firstCmd) {
            defaultOptions.robot.active = false;
        }
    };

    //Moves robot 1 space forward
    var moveRobot = function() {
        var x = defaultOptions.robot.x;
        var y = defaultOptions.robot.y;

        switch (defaultOptions.robot.direction) {
            case DIRECTIONS.NORTH:
                y++;
                break;
            case DIRECTIONS.EAST:
                x++;
                break;
            case DIRECTIONS.SOUTH:
                y--;
                break;
            case DIRECTIONS.WEST:
                x--;
                break;
        }

        if (drawRobot(x, y, defaultOptions.robot.direction, true)) {
            log("Move 1 place " + defaultOptions.robot.direction.name);
        }
    };

    //rotates robot 90 degrees left
    var rotateRobotLeft = function() {
        var newDir = defaultOptions.robot.direction.rotation;

        if (newDir <= 0)
            newDir = 360;

        newDir -= 90;

        $.each(DIRECTIONS, function (i, dir) {
            if (dir.rotation == newDir) {

                if (drawRobot(defaultOptions.robot.x, defaultOptions.robot.y, dir, true)) {
                    log("Rotate left 90");
                }
            }
        });
    };

    //rotates robot 90 degrees right
    var rotateRobotRight = function() {
        var newDir = defaultOptions.robot.direction.rotation;

        newDir += 90;

        if (newDir >= 360)
            newDir = 0;

        $.each(DIRECTIONS, function (i, dir) {
            if (dir.rotation == newDir) {
                if (drawRobot(defaultOptions.robot.x, defaultOptions.robot.y, dir, true)) {
                    log("Rotate right 90");
                }
            }
        });
    };

    //reports the current location of the robot
    var reportRobotLocation = function () {
        if (defaultOptions.robot.active) {
            //read in html template
            var template = $("#robotReportTemplate").html();

            template = template.replace("{X}", defaultOptions.robot.x);
            template = template.replace("{Y}", defaultOptions.robot.y);
            template = template.replace("{F}", defaultOptions.robot.direction.name);

            $("#robotReport").empty();
            $("#robotReport").html(template);

            $("#tabReport").click();
        }
    };

    return {
        init: init
    };

})();