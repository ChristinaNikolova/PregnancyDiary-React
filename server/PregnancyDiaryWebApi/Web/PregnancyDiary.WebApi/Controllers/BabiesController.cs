namespace PregnancyDiary.WebApi.Controllers
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using PregnancyDiary.Common;
    using PregnancyDiary.Services.Data.Babies;
    using PregnancyDiary.Web.Models.Babies.InputModels;
    using PregnancyDiary.Web.Models.Common.ViewModels;

    [Route("api/[controller]/[action]")]
    public class BabiesController : ApiController
    {
        private readonly IBabiesService babiesService;

        public BabiesController(IBabiesService babiesService)
        {
            this.babiesService = babiesService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Create([FromBody] CreateBabyInputModel input)
        {
            try
            {
                await this.babiesService.CreateAsync(input.Name, input.BirthDate, input.BirthTime, input.Gender, input.Height, input.Weight, input.DiaryId);

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
    }
}
