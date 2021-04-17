namespace PregnancyDiary.Web.Models.Comments.InputModels
{
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Common;

    public class CreateCommentInputModel
    {
        [Required]
        public string ArticleId { get; set; }

        [Required]
        [StringLength(DataValidation.Comment.ContentMaxLenght, ErrorMessage = Messages.Error.RequiredMinMaxLength, MinimumLength = DataValidation.Comment.ContentMinLenght)]
        public string Content { get; set; }
    }
}
