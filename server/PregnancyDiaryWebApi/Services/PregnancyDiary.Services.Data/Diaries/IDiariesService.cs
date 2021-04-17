namespace PregnancyDiary.Services.Data.Diaries
{
    using System;
    using System.Threading.Tasks;

    public interface IDiariesService
    {
        Task CreateAsync(DateTime positiveTest, DateTime dueDate, string gender, string userId);
    }
}
