namespace PregnancyDiary.Services.Data.Dtos.Memories
{
    using System;

    public class CreateMemoryDto
    {
        public DateTime Date { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }
    }
}
