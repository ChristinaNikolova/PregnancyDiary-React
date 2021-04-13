namespace PregnancyDiary.Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Common;
    using PregnancyDiary.Data.Common.BaseModels;

    public class Moment : BaseDeletableModel<string>
    {
        public Moment()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public DateTime Date { get; set; }

        [Required]
        [MaxLength(DataValidation.Moment.TitleMaxLenght)]
        public string Title { get; set; }

        [MaxLength(DataValidation.Moment.DescriptionMaxLenght)]
        public string Description { get; set; }

        [Required]
        public string WeekId { get; set; }

        public virtual Week Week { get; set; }
    }
}
