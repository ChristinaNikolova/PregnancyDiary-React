namespace PregnancyDiary.Services.Data.Diaries
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using PregnancyDiary.Data.Common.Repositories;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Data.Models.Enums;
    using PregnancyDiary.Services.Mapping;

    public class DiariesService : IDiariesService
    {
        private readonly IRepository<Diary> diariesRepository;

        public DiariesService(IRepository<Diary> diariesRepository)
        {
            this.diariesRepository = diariesRepository;
        }

        public async Task CreateAsync(DateTime positiveTest, DateTime dueDate, string gender, string userId)
        {
            var diary = new Diary()
            {
                PositiveTest = positiveTest,
                DueDate = dueDate,
                Gender = Enum.Parse<Gender>(gender),
                UserId = userId,
            };

            await this.diariesRepository.AddAsync(diary);
            await this.diariesRepository.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetDiariesAsync<T>(string userId)
        {
            ;
            var diaries = await this.diariesRepository
                .All()
                .Where(d => d.UserId == userId)
                .OrderByDescending(d => d.CreatedOn)
                .To<T>()
                .ToListAsync();

            return diaries;
        }
    }
}
