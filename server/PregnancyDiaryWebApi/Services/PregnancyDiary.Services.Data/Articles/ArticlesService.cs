namespace PregnancyDiary.Services.Data.Articles
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using PregnancyDiary.Common;
    using PregnancyDiary.Data.Common.Repositories;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Data.Categories;
    using PregnancyDiary.Services.Mapping;

    public class ArticlesService : IArticlesService
    {
        private readonly IRepository<Article> articlesRepository;
        private readonly ICategoriesService categoriesService;

        public ArticlesService(
            IRepository<Article> articlesRepository,
            ICategoriesService categoriesService)
        {
            this.articlesRepository = articlesRepository;
            this.categoriesService = categoriesService;
        }

        public async Task CreateAsync(string title, string content, string categoryName, string picture)
        {
            ;
            var categoryId = await this.categoriesService.GetIdByNameAsync(categoryName);

            var article = new Article()
            {
                Title = title,
                Content = content,
                CategoryId = categoryId,
                Picture = picture,
            };

            await this.articlesRepository.AddAsync(article);
            await this.articlesRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(string id)
        {
            var article = await this.GetByIdAsync(id);

            article.IsDeleted = true;

            this.articlesRepository.Update(article);
            await this.articlesRepository.SaveChangesAsync();
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

        public async Task<T> GetDetailsAsync<T>(string id)
        {
            var article = await this.articlesRepository
                .All()
                .Where(a => a.Id == id)
                .To<T>()
                .FirstOrDefaultAsync();

            return article;
        }

        public async Task<IEnumerable<T>> GetOrderAsync<T>(string criteria)
        {
            var criteriaToLower = criteria.ToLower();

            var query = this.articlesRepository
                .All();

            if (criteriaToLower == GlobalConstants.OrderCriteria.Old)
            {
                query = query
                    .OrderBy(r => r.CreatedOn);
            }
            else if (criteriaToLower == GlobalConstants.OrderCriteria.New)
            {
                query = query
                    .OrderByDescending(r => r.CreatedOn);
            }
            else if (criteriaToLower == GlobalConstants.OrderCriteria.LikesCount)
            {
                query = query
                   .OrderByDescending(r => r.Likes.Count);
            }
            else if (criteriaToLower == GlobalConstants.OrderCriteria.CommentsCount)
            {
                query = query
                   .OrderByDescending(r => r.Comments.Count);
            }

            var articles = await query
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

        public async Task<bool> IsTitleAlreadyExistingAsync(string title)
        {
            var isTitleExisting = await this.articlesRepository
                .All()
                .AnyAsync(a => a.Title.ToLower() == title.ToLower());

            return isTitleExisting;
        }

        private async Task<Article> GetByIdAsync(string id)
        {
            return await this.articlesRepository
                .All()
                .FirstOrDefaultAsync(a => a.Id == id);
        }
    }
}
