namespace PregnancyDiary.Web.Models.Weeks.ViewModels
{
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Data.Models.Enums;
    using PregnancyDiary.Services.Mapping;

    public class WeekViewModel : IMapFrom<Week>
    {
        public string Id { get; set; }

        public byte Number { get; set; }

        public Mood Mood { get; set; }

        public string MoodAsString
            => this.Mood.ToString();

        public int MomentsCount { get; set; }
    }
}
