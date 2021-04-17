namespace PregnancyDiary.Services.Data.Diaries
{
    using System;
    using System.Threading.Tasks;

    using PregnancyDiary.Data.Common.Repositories;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Data.Models.Enums;

    public class DiariesService : IDiariesService
    {
        private readonly IRepository<Diary> diariesRepository;

        public DiariesService(IRepository<Diary> diariesRepository)
        {
            this.diariesRepository = diariesRepository;
        }

        public async Task CreateAsync(DateTime positiveTest, DateTime dueDate, string gender, string userId)
        {
            //10.7.2021 г. 0:00:00}
            var diary = new Diary()
            {
                PositiveTest = positiveTest,
                DueDate = dueDate,
                Gender = Enum.Parse<Gender>(gender),
                UserId = userId,
            };
            ;
            await this.diariesRepository.AddAsync(diary);
            await this.diariesRepository.SaveChangesAsync();
        }
    }
}
