namespace PregnancyDiary.Services.Data.Articles
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using PregnancyDiary.Data.Common.Repositories;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class ArticlesService : IArticlesService
    {
        private readonly IRepository<Article> articlesRepository;

        public ArticlesService(IRepository<Article> articlesRepository)
        {
            this.articlesRepository = articlesRepository;
        }

        public async Task<IEnumerable<T>> GetAllAsync<T>()
        {
            var articles = await this.articlesRepository
                .All()
                .OrderByDescending(a => a.CreatedOn)
                .ThenBy(a => a.Title)
                .To<T>()
                .ToListAsync();

            return articles;
        }

        public async Task<IEnumerable<T>> GetAllCurrentCategoryAsync<T>(string categoryId)
        {
            var articles = await this.articlesRepository
               .All()
               .Where(a => a.CategoryId == categoryId)
               .OrderByDescending(a => a.CreatedOn)
               .ThenBy(a => a.Title)
               .To<T>()
               .ToListAsync();

            return articles;
        }

        public async Task<IEnumerable<T>> GetSearchedAsync<T>(string query)
        {
            var articles = await this.articlesRepository
               .All()
               .Where(r => r.Title.ToLower().Contains(query.ToLower()))
               .OrderByDescending(r => r.CreatedOn)
               .To<T>()
               .ToListAsync();

            return articles;
        }
    }
}
