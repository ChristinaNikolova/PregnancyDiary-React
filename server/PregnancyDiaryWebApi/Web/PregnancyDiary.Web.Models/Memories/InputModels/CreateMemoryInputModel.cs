namespace PregnancyDiary.Web.Models.Memories.InputModels
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Common;
    using PregnancyDiary.Web.Infrastructure.ValidationAttributes;

    public class CreateMemoryInputModel
    {
        [IsDateAfterTodayAttribute]
        public DateTime Date { get; set; }

        [Required]
        [StringLength(DataValidation.Moment.TitleMaxLenght, ErrorMessage = Messages.Error.RequiredMinMaxLength, MinimumLength = DataValidation.Moment.TitleMinLenght)]
        public string Title { get; set; }

        [MaxLength(DataValidation.Moment.DescriptionMaxLenght)]
        public string Content { get; set; }
    }
}
