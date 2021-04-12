namespace PregnancyDiary.Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Data.Common.BaseModels;

    public class Week : BaseDeletableModel<string>
    {
        public Week()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public byte Number { get; set; }

        //[Required]
        //public Mood Mood { get; set; }

        [Required]
        public string DiaryId { get; set; }

        public virtual Diary Diary { get; set; }

    }
}
