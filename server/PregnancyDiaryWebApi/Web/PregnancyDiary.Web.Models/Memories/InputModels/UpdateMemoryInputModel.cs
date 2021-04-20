namespace PregnancyDiary.Web.Models.Memories.InputModels
{
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class UpdateMemoryInputModel : CreateMemoryInputModel, IMapFrom<Moment>
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string WeekId { get; set; }

        public string FormattedDate
            => string.Join("-", this.Date.Year, this.Date.Month.ToString("d2"), this.Date.Day.ToString("d2"));
    }
}
