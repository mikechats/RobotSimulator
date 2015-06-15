using System.Collections.Generic;

namespace ToyRobotSimulator.Models
{
    public class RobotMovement
    {
        public IEnumerable<RobotCommand> Commands { get; set; }
    }
}