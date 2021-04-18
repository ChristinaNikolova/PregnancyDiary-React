namespace PregnancyDiary.Web.Models.Diaries.InputModels
{
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class UpdateDiaryInputModel : CreateDiaryInputModel, IMapFrom<Diary>
    {
        [Required]
        public string Id { get; set; }

        public string FormattedPositiveTest
           => string.Join("-", this.PositiveTest.Year, this.PositiveTest.Month.ToString("d2"), this.PositiveTest.Day.ToString("d2"));

        public string FormattedDueDate
           => string.Join("-", this.DueDate.Year, this.DueDate.Month.ToString("d2"), this.DueDate.Day.ToString("d2"));

        public string GenderAsString
            => this.Gender.ToString();
    }
}
