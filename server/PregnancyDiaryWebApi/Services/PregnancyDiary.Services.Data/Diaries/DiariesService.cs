namespace PregnancyDiary.Services.Data.Diaries
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using PregnancyDiary.Common;
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
            var genderAsEnumName = GetGender(gender);

            var diary = new Diary()
            {
                PositiveTest = positiveTest,
                DueDate = dueDate,
                Gender = Enum.Parse<Gender>(genderAsEnumName),
                UserId = userId,
            };

            await this.diariesRepository.AddAsync(diary);
            await this.diariesRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(string id)
        {
            Diary diary = await this.GetByIdAsync(id);

            diary.IsDeleted = true;

            this.diariesRepository.Update(diary);
            await this.diariesRepository.SaveChangesAsync();
        }

        public async Task<T> GetDetailsAsync<T>(string id)
        {
            var diary = await this.diariesRepository
                .All()
                .Where(d => d.Id == id)
                .To<T>()
                .FirstOrDefaultAsync();

            return diary;
        }

        public async Task<IEnumerable<T>> GetDiariesAsync<T>(string userId)
        {
            var diaries = await this.diariesRepository
                .All()
                .Where(d => d.UserId == userId)
                .OrderByDescending(d => d.CreatedOn)
                .To<T>()
                .ToListAsync();

            return diaries;
        }

        public async Task UpdateAsync(string id, DateTime positiveTest, DateTime dueDate, string gender)
        {
            var genderAsEnumName = GetGender(gender);

            var diary = await this.GetByIdAsync(id);

            diary.PositiveTest = positiveTest;
            diary.DueDate = dueDate;
            diary.Gender = Enum.Parse<Gender>(genderAsEnumName);

            this.diariesRepository.Update(diary);
            await this.diariesRepository.SaveChangesAsync();
        }

        public async Task ChangeBabyBornAsync(string id)
        {
            var diary = await this.GetByIdAsync(id);

            var isBabyBorn = diary.IsBabyBorn;
            diary.IsBabyBorn = !isBabyBorn;

            this.diariesRepository.Update(diary);
            await this.diariesRepository.SaveChangesAsync();
        }

        private static string GetGender(string gender)
        {
            var genderAsEnumName = gender;

            if (gender == GlobalConstants.Gender.DontKnow)
            {
                genderAsEnumName = Gender.DontKnow.ToString();
            }

            return genderAsEnumName;
        }

        private async Task<Diary> GetByIdAsync(string id)
        {
            return await this.diariesRepository
                .All()
                .FirstOrDefaultAsync(d => d.Id == id);
        }
    }
}
