namespace PregnancyDiary.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using PregnancyDiary.Common;
    using PregnancyDiary.Services.Data.Articles;
    using PregnancyDiary.Web.Models.Articles.ViewModels;
    using PregnancyDiary.Web.Models.Common.ViewModels;

    [Route("api/[controller]/[action]")]
    public class ArticlesController : ApiController
    {
        private readonly IArticlesService articlesService;

        public ArticlesController(IArticlesService articlesService)
        {
            this.articlesService = articlesService;
        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<IEnumerable<ArticleViewModel>>> All()
        {
            try
            {
                var articles = await this.articlesService.GetAllAsync<ArticleViewModel>();

                return this.Ok(articles);
            }
            catch (Exception)
            {
                return this.BadRequest(new BadRequestViewModel
                {
                    Message = Messages.Error.Unknown,
                });
            }
        }

        [HttpGet("{categoryId}")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<IEnumerable<ArticleViewModel>>> ByCategory(string categoryId)
        {
            try
            {
                var articles = await this.articlesService.GetAllCurrentCategoryAsync<ArticleViewModel>(categoryId);

                return this.Ok(articles);
            }
            catch (Exception)
            {
                return this.BadRequest(new BadRequestViewModel
                {
                    Message = Messages.Error.Unknown,
                });
            }
        }

        [HttpGet("{query}")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<IEnumerable<ArticleViewModel>>> Search(string query)
        {
            try
            {
                var articles = await this.articlesService.GetSearchedAsync<ArticleViewModel>(query);

                return this.Ok(articles);
            }
            catch (Exception)
            {
                return this.BadRequest(new BadRequestViewModel
                {
                    Message = Messages.Error.Unknown,
                });
            }
        }
    }
}
