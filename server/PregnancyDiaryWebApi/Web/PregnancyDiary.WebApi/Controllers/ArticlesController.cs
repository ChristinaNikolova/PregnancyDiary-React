using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PregnancyDiary.Common;
using PregnancyDiary.Services.Data.Articles;
using PregnancyDiary.Web.Models.Articles.ViewModels;
using PregnancyDiary.Web.Models.Common.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PregnancyDiary.WebApi.Controllers
{
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
        public async Task<IActionResult> All()
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
    }
}
