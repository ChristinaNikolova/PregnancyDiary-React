namespace PregnancyDiary.Data.Seeding.CustomSeeder
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using Newtonsoft.Json;
    using PregnancyDiary.Common;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Data.Seeding.Dtos;

    public class ArticlesSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            if (!dbContext.Articles.Any())
            {
                var articlesData = JsonConvert
                    .DeserializeObject<List<ArticleDto>>(File.ReadAllText(GlobalConstants.SeedersPath.Article))
                    .ToList();

                List<Article> articles = new List<Article>();

                foreach (var currentArticleData in articlesData)
                {
                    var category = await dbContext.Categories
                        .FirstOrDefaultAsync(c => c.Name == currentArticleData.CategoryName);

                    var article = new Article()
                    {
                        Title = currentArticleData.Title,
                        Content = currentArticleData.Content,
                        Picture = currentArticleData.Picture,
                        CategoryId = category.Id,
                    };

                    articles.Add(article);
                }

                await dbContext.Articles.AddRangeAsync(articles);
                await dbContext.SaveChangesAsync();
            }
        }
    }
}
