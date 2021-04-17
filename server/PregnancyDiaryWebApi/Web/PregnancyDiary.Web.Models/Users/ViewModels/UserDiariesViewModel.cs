namespace PregnancyDiary.Web.Models.Users.ViewModels
{
    using System;

    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Data.Models.Enums;
    using PregnancyDiary.Services.Mapping;

    public class UserDiariesViewModel : IMapFrom<Diary>
    {
        public string Id { get; set; }

        public DateTime PositiveTest { get; set; }

        public string PositiveTestAsString
            => this.PositiveTest.ToShortDateString();

        public DateTime DueDate { get; set; }

        public string DueDateAsString
           => this.DueDate.ToShortDateString();

        public Gender Gender { get; set; }

        public string GenderAsString
            => this.Gender.ToString();

        public int WeeksCount { get; set; }
    }
}
