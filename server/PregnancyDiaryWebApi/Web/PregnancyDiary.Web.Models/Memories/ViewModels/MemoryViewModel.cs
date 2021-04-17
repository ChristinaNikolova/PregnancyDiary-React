namespace PregnancyDiary.Web.Models.Memories.ViewModels
{
    using System;

    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class MemoryViewModel : IMapFrom<Moment>
    {
        public string Id { get; set; }

        public DateTime Date { get; set; }

        public string DateAsString
            => this.Date.ToShortDateString();

        public string Title { get; set; }

        public string Content { get; set; }
    }
}
