namespace PregnancyDiary.Services.Data.Categories
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using PregnancyDiary.Data.Common.Repositories;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class CategoriesService : ICategoriesService
    {
        private readonly IRepository<Category> categoriesRepository;

        public CategoriesService(IRepository<Category> categoriesRepository)
        {
            this.categoriesRepository = categoriesRepository;
        }

        public async Task CreateAsync(string name, string picture)
        {
            var category = new Category()
            {
                Name = name,
                Picture = picture,
            };

            await this.categoriesRepository.AddAsync(category);
            await this.categoriesRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(string id)
        {
            var category = await this.GetCategoryByIdAsync(id);

            category.IsDeleted = true;

            this.categoriesRepository.Update(category);
            await this.categoriesRepository.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAllForAdminAsync<T>()
        {
            var categories = await this.categoriesRepository
                 .All()
                 .OrderBy(c => c.Name)
                 .ThenByDescending(c => c.Articles.Count())
                 .To<T>()
                 .ToListAsync();

            return categories;
        }

        public async Task<IEnumerable<T>> GetArticlesCountByCategoriesAsync<T>()
        {
            var categories = await this.categoriesRepository
                .All()
                .OrderBy(c => c.Name)
                .ThenByDescending(c => c.Articles.Count())
                .To<T>()
                .ToListAsync();

            return categories;
        }

        public async Task<T> GetDetailsAsync<T>(string id)
        {
            var category = await this.categoriesRepository
                  .All()
                  .Where(c => c.Id == id)
                  .To<T>()
                  .FirstOrDefaultAsync();

            return category;
        }

        public async Task<string> GetNameByIdAsync(string categoryId)
        {
            var name = await this.categoriesRepository
                .All()
                .Where(c => c.Id == categoryId)
                .Select(c => c.Name)
                .FirstOrDefaultAsync();

            return name;
        }

        public async Task<bool> IsCategoryAlreadyExistingAsync(string name)
        {
            var isAlreadyExisting = await this.categoriesRepository
                .All()
                .AnyAsync(c => c.Name.ToLower() == name.ToLower());

            return isAlreadyExisting;
        }

        public async Task UpdateAsync(string id, string name, string picture)
        {
            var category = await this.GetCategoryByIdAsync(id);

            category.Name = name;
            category.Picture = picture;

            this.categoriesRepository.Update(category);
            await this.categoriesRepository.SaveChangesAsync();
        }

        private async Task<Category> GetCategoryByIdAsync(string id)
        {
            return await this.categoriesRepository
                .All()
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
