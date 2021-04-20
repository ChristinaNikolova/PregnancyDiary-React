namespace PregnancyDiary.Web.Models.Memories.InputModels
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class AllMemoriesInputModel
    {
        public IEnumerable<CreateMemoryInputModel> Memories { get; set; }

        [Required]
        public string WeekId { get; set; }
    }
}
