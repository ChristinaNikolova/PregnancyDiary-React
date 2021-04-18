namespace PregnancyDiary.Web.Models.Memories.InputModels
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class UpdateMemoryInputModel : CreateMemoryInputModel, IMapFrom<Moment>
    {
        [Required]
        public string Id { get; set; }

        public string FormattedDate
            => string.Join("-", this.Date.Year, this.Date.Month.ToString("d2"), this.Date.Day);

        public int Day
            => this.Date.Day;

        public string Month
            => this.Date.Month.ToString("d2");

        public int Year
            => this.Date.Year;
    }
}
