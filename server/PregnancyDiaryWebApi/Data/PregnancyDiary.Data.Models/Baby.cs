namespace PregnancyDiary.Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Common;
    using PregnancyDiary.Data.Common.BaseModels;
    using PregnancyDiary.Data.Models.Enums;

    public class Baby : BaseDeletableModel<string>
    {
        public Baby()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        [Required]
        [MaxLength(DataValidation.Baby.NameMaxLenght)]
        public string Name { get; set; }

        public Gender Gender { get; set; }

        public DateTime BirthDate { get; set; }

        [Required]
        public string BirthTime { get; set; }

        public double Height { get; set; }

        public double Weight { get; set; }

        [Required]
        public string Picture { get; set; }

        [Required]
        public string DiaryId { get; set; }

        public virtual Diary Diary { get; set; }
    }
}
