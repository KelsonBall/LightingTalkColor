namespace LightingTalkColor
{
    public class ColorPoint
    {
        public double hue { get; set; }
        public double x { get; set; }
        public double y { get; set; }

        public override string ToString()
            => $"({hue} <{x},{y}>)";
    }
}
