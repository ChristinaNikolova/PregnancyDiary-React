namespace PregnancyDiary.Web.Models.Babies.ViewModels
{
    using System;

    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Data.Models.Enums;
    using PregnancyDiary.Services.Mapping;

    public class BabyDetailsViewModel : IMapFrom<Baby>
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public Gender Gender { get; set; }

        public string GenderAsString
            => this.Gender.ToString();

        public DateTime BirthDate { get; set; }

        public string FormattedBirthDate
            => this.BirthDate.ToShortDateString();

        public string BirthTime { get; set; }

        public double Height { get; set; }

        public double Weight { get; set; }

        public string Picture { get; set; }
    }
}
