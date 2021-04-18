namespace PregnancyDiary.Services.Data.Comments
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using PregnancyDiary.Data.Common.Repositories;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class CommentsService : ICommentsService
    {
        private readonly IRepository<Comment> commentsRepository;

        public CommentsService(IRepository<Comment> commentsRepository)
        {
            this.commentsRepository = commentsRepository;
        }

        public async Task CreateAsync(string content, string articleId, string userId)
        {
            var comment = new Comment()
            {
                Content = content,
                ArticleId = articleId,
                UserId = userId,
            };

            await this.commentsRepository.AddAsync(comment);
            await this.commentsRepository.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAllCurrentArticleAsync<T>(string articleId)
        {
            var comments = await this.commentsRepository
                .All()
                .Where(c => c.ArticleId == articleId)
                .OrderByDescending(c => c.CreatedOn)
                .To<T>()
                .ToListAsync();

            return comments;
        }
    }
}
