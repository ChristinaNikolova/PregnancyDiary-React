namespace PregnancyDiary.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using PregnancyDiary.Common;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Data.ArticleLikes;
    using PregnancyDiary.Services.Data.Articles;
    using PregnancyDiary.Web.Models.Articles.ViewModels;
    using PregnancyDiary.Web.Models.Common.ViewModels;

    [Route("api/[controller]/[action]")]
    public class ArticlesController : ApiController
    {
        private readonly IArticlesService articlesService;
        private readonly IUserArticleLikesService userArticleLikesService;
        private readonly UserManager<ApplicationUser> userManager;

        public ArticlesController(
            IArticlesService articlesService,
            IUserArticleLikesService userArticleLikesService,
            UserManager<ApplicationUser> userManager)
        {
            this.articlesService = articlesService;
            this.userArticleLikesService = userArticleLikesService;
            this.userManager = userManager;
        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<IEnumerable<ArticleBaseViewModel>>> All()
        {
            try
            {
                var articles = await this.articlesService.GetAllAsync<ArticleBaseViewModel>();

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
        public async Task<ActionResult<IEnumerable<ArticleBaseViewModel>>> ByCategory(string categoryId)
        {
            try
            {
                var articles = await this.articlesService.GetAllCurrentCategoryAsync<ArticleBaseViewModel>(categoryId);

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
        public async Task<ActionResult<IEnumerable<ArticleBaseViewModel>>> Search(string query)
        {
            try
            {
                var articles = await this.articlesService.GetSearchedAsync<ArticleBaseViewModel>(query);

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

        [HttpGet("{criteria}")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<IEnumerable<ArticleBaseViewModel>>> Order(string criteria)
        {
            //check with more articles
            try
            {
                var recipes = await this.articlesService.GetOrderAsync<ArticleBaseViewModel>(criteria);

                return this.Ok(recipes);
            }
            catch (Exception)
            {
                return this.BadRequest(new BadRequestViewModel
                {
                    Message = Messages.Error.Unknown,
                });
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<ArticleDetailsViewModel>> Details(string id)
        {
            try
            {
                var article = await this.articlesService.GetDetailsAsync<ArticleDetailsViewModel>(id);

                var user = await this.userManager.FindByNameAsync(this.User.Identity.Name);

                article.IsFavourite = await this.userArticleLikesService.IsFavouriteAsync(user.Id, id);

                return this.Ok(article);
            }
            catch (Exception)
            {
                return this.BadRequest(new BadRequestViewModel
                {
                    Message = Messages.Error.Unknown,
                });
            }
        }

        [HttpPost("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Like(string id)
        {
            try
            {
                var user = await this.userManager.FindByNameAsync(this.User.Identity.Name);

                await this.userArticleLikesService.LikeAsync(user.Id, id);

                return this.Ok(new
                {
                    Message = Messages.Success.Added,
                });
            }
            catch (Exception)
            {
                return this.BadRequest(new BadRequestViewModel
                {
                    Message = Messages.Error.Unknown,
                });
            }
        }

        [HttpPost("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Dislike(string id)
        {
            try
            {
                var user = await this.userManager.FindByNameAsync(this.User.Identity.Name);

                await this.userArticleLikesService.DislikeAsync(user.Id, id);

                return this.Ok(new
                {
                    Message = Messages.Success.Deleted,
                });
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
