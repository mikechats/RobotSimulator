using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ToyRobotSimulator.Startup))]
namespace ToyRobotSimulator
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
