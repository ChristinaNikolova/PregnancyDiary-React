namespace PregnancyDiary.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Data.Common.BaseModels;
    using PregnancyDiary.Data.Models.Enums;

    public class Week : BaseDeletableModel<string>
    {
        public Week()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Moments = new HashSet<Moment>();
        }

        public byte Number { get; set; }

        // mom
        public Mood Mood { get; set; }

        public double MyWeight { get; set; }

        public double MyBellySize { get; set; }

        // baby
        public double BabyWeight { get; set; }

        public double BabyHeight { get; set; }

        [Required]
        public string DiaryId { get; set; }

        public virtual Diary Diary { get; set; }

        public virtual ICollection<Moment> Moments { get; set; }
    }
}
