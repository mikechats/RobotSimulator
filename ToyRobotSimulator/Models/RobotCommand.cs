namespace ToyRobotSimulator.Models
{
    public class RobotCommand
    {
        public Command Command { get; set; }
        public string Name {
            get { return Command.ToString(); }
        }
        public string DirectionName
        {
            get { return Direction.ToString(); }
        }
        public int X { get; set; }
        public int Y { get; set; }
        public Direction Direction { get; set; }
    }
}