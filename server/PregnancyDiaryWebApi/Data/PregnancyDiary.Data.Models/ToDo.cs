namespace PregnancyDiary.Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Common;
    using PregnancyDiary.Data.Common.BaseModels;

    public class ToDo : BaseDeletableModel<string>
    {
        public ToDo()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public DateTime Date { get; set; }

        [Required]
        [MaxLength(DataValidation.ToDo.DescriptionMaxLenght)]
        public string Description { get; set; }

        [Required]
        public string WeekId { get; set; }

        public virtual Week Week { get; set; }
    }
}
