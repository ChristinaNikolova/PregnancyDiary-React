namespace PregnancyDiary.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Data.Common.BaseModels;
    using PregnancyDiary.Data.Models.Enums;

    public class Diary : BaseDeletableModel<string>
    {
        public Diary()
        {
            this.Id = Guid.NewGuid().ToString();
            this.IsBabyBorn = false;
            this.Weeks = new HashSet<Week>();
        }

        public DateTime PositiveTest { get; set; }

        public DateTime DueDate { get; set; }

        public Gender Gender { get; set; }

        public bool IsBabyBorn { get; set; }

        public string BabyId { get; set; }

        public virtual Baby Baby { get; set; }

        [Required]
        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }

        public virtual ICollection<Week> Weeks { get; set; }
    }
}
