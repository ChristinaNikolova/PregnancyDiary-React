namespace PregnancyDiary.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Common;
    using PregnancyDiary.Data.Common.BaseModels;

    public class Category : BaseDeletableModel<string>
    {
        public Category()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Articles = new HashSet<Article>();
        }

        [Required]
        [MaxLength(DataValidation.Category.CategoryNameMaxLenght)]
        public string Name { get; set; }

        public virtual ICollection<Article> Articles { get; set; }
    }
}
