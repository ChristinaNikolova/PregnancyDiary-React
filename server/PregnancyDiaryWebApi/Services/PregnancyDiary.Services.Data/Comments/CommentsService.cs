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

        public async Task<IEnumerable<T>> GetAllCurrentRecipeAsync<T>(string articleId)
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
