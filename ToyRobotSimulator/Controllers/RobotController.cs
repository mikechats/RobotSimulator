using System.Collections.Generic;
using System.Web.Mvc;
using ToyRobotSimulator.Models;

namespace ToyRobotSimulator.Controllers
{
    public class RobotController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetTestData()
        {
            var testData = new List<RobotMovement>
            {
                new RobotMovement {
                    Commands = new List<RobotCommand>
                    {
                        new RobotCommand{Command = Command.Place, Direction = Direction.North, X = 1, Y = 1},
                        new RobotCommand{Command = Command.Move},
                        new RobotCommand{Command = Command.Move},
                        new RobotCommand{Command = Command.Left},
                        new RobotCommand{Command = Command.Report}
                    }
                },
                new RobotMovement {
                    Commands = new List<RobotCommand>
                    {
                        new RobotCommand{Command = Command.Place, Direction = Direction.North, X = 3, Y = 0},
                        new RobotCommand{Command = Command.Right},
                        new RobotCommand{Command = Command.Move},
                        new RobotCommand{Command = Command.Left},
                        new RobotCommand{Command = Command.Report}
                    }
                },
                new RobotMovement {
                    Commands = new List<RobotCommand>
                    {                   
                        new RobotCommand{Command = Command.Move},
                        new RobotCommand{Command = Command.Place, Direction = Direction.North, X = 1, Y = 1},
                        new RobotCommand{Command = Command.Report}
                    }
                },
                new RobotMovement {
                    Commands = new List<RobotCommand>
                    {                   
                        new RobotCommand{Command = Command.Move},
                        new RobotCommand{Command = Command.Right},
                        new RobotCommand{Command = Command.Report}
                    }
                }
            };

            return Json(testData, JsonRequestBehavior.AllowGet);
        }
    }
}