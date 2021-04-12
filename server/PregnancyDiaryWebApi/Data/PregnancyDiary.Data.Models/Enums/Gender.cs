namespace PregnancyDiary.Data.Models.Enums
{
    using System.ComponentModel;

    public enum Gender
    {
        Default = 0,
        Girl = 1,
        Boy = 2,
        [Description("I don't know yet")]
        DontKnow = 3,
        [Description("It's a surprice")]
        Surprice = 4,
    }
}
