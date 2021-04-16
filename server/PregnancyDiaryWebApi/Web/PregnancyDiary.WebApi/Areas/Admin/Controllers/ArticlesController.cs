namespace PregnancyDiary.WebApi.Areas.Admin.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using PregnancyDiary.Common;
    using PregnancyDiary.Services.Data.Articles;
    using PregnancyDiary.Web.Models.Admin.Articles.InputModels;
    using PregnancyDiary.Web.Models.Admin.Articles.ViewModels;
    using PregnancyDiary.Web.Models.Common.ViewModels;
    using PregnancyDiary.WebApi.Controllers;

    [Route("api/admin/[controller]/[action]")]
    public class ArticlesController : ApiController
    {
        private readonly IArticlesService articlesService;

        public ArticlesController(IArticlesService articlesService)
        {
            this.articlesService = articlesService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Create([FromBody] ArticleInputModel input)
        {
            if (this.User.Identity.Name == GlobalConstants.Roles.Admin)
            {
                var isTitleAlreadyExisting = await this.articlesService.IsTitleAlreadyExistingAsync(input.Title);

                if (isTitleAlreadyExisting)
                {
                    return this.BadRequest(new BadRequestViewModel
                    {
                        Message = Messages.Error.AlreadyExistsTitle,
                    });
                }

                try
                {
                    await this.articlesService.CreateAsync(input.Title, input.Content, input.CategoryName, input.Picture);

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

            return this.Unauthorized();
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<IEnumerable<ArticleAdminViewModel>>> All()
        {
            if (this.User.Identity.Name == GlobalConstants.Roles.Admin)
            {
                try
                {
                    var articles = await this.articlesService.GetAllAsync<ArticleAdminViewModel>();

                    return this.Ok(articles);
                }
                catch (Exception ex)
                {
                    return this.BadRequest(new BadRequestViewModel
                    {
                        Message = ex.Message,
                    });
                }
            }

            return this.Unauthorized();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Delete(string id)
        {
            if (this.User.Identity.Name == GlobalConstants.Roles.Admin)
            {
                try
                {
                    await this.articlesService.DeleteAsync(id);

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

            return this.Unauthorized();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<ArticleUpdateInputModel>> ArticleForUpdate(string id)
        {
            if (this.User.Identity.Name == GlobalConstants.Roles.Admin)
            {
                try
                {
                    var article = await this.articlesService.GetDetailsAsync<ArticleUpdateInputModel>(id);

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

            return this.Unauthorized();
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Update(ArticleUpdateInputModel input)
        {
            if (this.User.Identity.Name == GlobalConstants.Roles.Admin)
            {
                try
                {
                    var isTitleAlreadyExisting = await this.articlesService.IsTitleAlreadyExistingAsync(input.Title);

                    if (isTitleAlreadyExisting)
                    {
                        var existingArticleId = await this.articlesService.GetIdByTitleAsync(input.Title);

                        if (existingArticleId != input.Id)
                        {
                            return this.BadRequest(new BadRequestViewModel
                            {
                                Message = Messages.Error.AlreadyExistsTitle,
                            });
                        }
                    }

                    await this.articlesService.UpdateAsync(input.Id, input.Title, input.Content, input.CategoryName, input.Picture);

                    return this.Ok(new
                    {
                        Message = Messages.Success.Updated,
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

            return this.Unauthorized();
        }
    }
}
