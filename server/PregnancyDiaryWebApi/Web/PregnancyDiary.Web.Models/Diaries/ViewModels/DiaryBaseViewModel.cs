namespace PregnancyDiary.Web.Models.Diaries.ViewModels
{
    using System;

    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Data.Models.Enums;
    using PregnancyDiary.Services.Mapping;

    public class DiaryBaseViewModel : IMapFrom<Diary>
    {
        public DateTime PositiveTest { get; set; }

        public string PositiveTestAsString
            => this.PositiveTest.ToShortDateString();

        public DateTime DueDate { get; set; }

        public string DueDateAsString
           => this.DueDate.ToShortDateString();

        public Gender Gender { get; set; }

        public string GenderAsString
            => this.Gender.ToString();
    }
}
