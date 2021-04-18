namespace PregnancyDiary.Services.Data.Weeks
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

    public class WeeksService : IWeeksService
    {
        private readonly IRepository<Week> weeksRepository;

        public WeeksService(IRepository<Week> weeksRepository)
        {
            this.weeksRepository = weeksRepository;
        }

        public async Task CreateAsync(byte number, double weight, double bellySize, string mood, double babyHeight, double babyWeight, string diaryId)
        {
            var week = new Week()
            {
                Number = number,
                MyWeight = weight,
                MyBellySize = bellySize,
                Mood = Enum.Parse<Mood>(mood),
                BabyHeight = babyHeight,
                BabyWeight = babyWeight,
                DiaryId = diaryId,
            };

            await this.weeksRepository.AddAsync(week);
            await this.weeksRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(string id, byte number, double weight, double bellySize, string mood, double babyHeight, double babyWeight, string diaryId)
        {
            var week = await this.GetByIdAsync(id);

            week.Number = number;
            week.MyWeight = weight;
            week.MyBellySize = bellySize;
            week.Mood = Enum.Parse<Mood>(mood);
            week.BabyHeight = babyHeight;
            week.BabyWeight = babyWeight;

            this.weeksRepository.Update(week);
            await this.weeksRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(string id)
        {
            var week = await this.GetByIdAsync(id);

            week.IsDeleted = true;

            this.weeksRepository.Update(week);
            await this.weeksRepository.SaveChangesAsync();
        }

        public async Task<T> GetDetailsAsync<T>(string id)
        {
            var week = await this.weeksRepository
                 .All()
                 .Where(w => w.Id == id)
                 .To<T>()
                 .FirstOrDefaultAsync();

            return week;
        }

        public async Task<IEnumerable<T>> GetAllCurrentDiaryAsync<T>(string diaryId)
        {
            var weeks = await this.weeksRepository
                .All()
                .Where(w => w.DiaryId == diaryId)
                .OrderBy(w => w.Number)
                .To<T>()
                .ToListAsync();

            return weeks;
        }

        public async Task<string> GetIdByNumberAsync(byte number, string diaryId)
        {
            var weekId = await this.weeksRepository
                .All()
                .Where(w => w.Number == number && w.DiaryId == diaryId)
                .Select(w => w.Id)
                .FirstOrDefaultAsync();

            return weekId;
        }

        public async Task<bool> IsWeekNumberAlreadyExistingAsync(byte number, string diaryId)
        {
            var isAlreadyExisting = await this.weeksRepository
                .All()
                .AnyAsync(w => w.DiaryId == diaryId && w.Number == number);

            return isAlreadyExisting;
        }

        private async Task<Week> GetByIdAsync(string id)
        {
            return await this.weeksRepository
                .All()
                .FirstOrDefaultAsync(w => w.Id == id);
        }
    }
}
