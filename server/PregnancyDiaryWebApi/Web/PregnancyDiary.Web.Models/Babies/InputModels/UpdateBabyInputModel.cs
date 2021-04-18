namespace PregnancyDiary.Web.Models.Babies.InputModels
{
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class UpdateBabyInputModel : CreateBabyInputModel, IMapFrom<Baby>
    {
        [Required]
        public string Id { get; set; }

        public string GenderAsString
            => this.Gender.ToString();

        public string FormattedBirthDate
           => string.Join("-", this.BirthDate.Year, this.BirthDate.Month.ToString("d2"), this.BirthDate.Day.ToString("d2"));
    }
}
