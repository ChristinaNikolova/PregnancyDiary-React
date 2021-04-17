namespace PregnancyDiary.Services.Data.Memories
{
    using System;
    using System.Threading.Tasks;

    public interface IMemoriesService
    {
        Task CreateAsync(DateTime date, string title, string content, string weekId);
    }
}
