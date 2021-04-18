namespace PregnancyDiary.WebApi.Controllers
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using PregnancyDiary.Common;
    using PregnancyDiary.Services.Data.Babies;
    using PregnancyDiary.Web.Models.Babies.InputModels;
    using PregnancyDiary.Web.Models.Babies.ViewModels;
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
                await this.babiesService.CreateAsync(input.Name, input.BirthDate, input.BirthTime, input.Gender, input.Height, input.Weight, input.Picture, input.DiaryId);

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

        [HttpGet("{diaryId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<BabyDetailsViewModel>> Details(string diaryId)
        {
            try
            {
                var baby = await this.babiesService.GetDetailsAsync<BabyDetailsViewModel>(diaryId);

                return this.Ok(baby);
            }
            catch (Exception)
            {
                return this.BadRequest(new BadRequestViewModel
                {
                    Message = Messages.Error.Unknown,
                });
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Delete(string id)
        {
            try
            {
                await this.babiesService.DeleteAsync(id);

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

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<UpdateBabyInputModel>> Update(string id)
        {
            try
            {
                var baby = await this.babiesService.GetDetailsAsync<UpdateBabyInputModel>(id);

                return this.Ok(baby);
            }
            catch (Exception)
            {
                return this.BadRequest(new BadRequestViewModel
                {
                    Message = Messages.Error.Unknown,
                });
            }
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Update(UpdateBabyInputModel input)
        {
            try
            {
                await this.babiesService.UpdateAsync(input.Id, input.Name, input.BirthDate, input.BirthTime, input.Gender, input.Height, input.Weight, input.Picture, input.DiaryId);

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
    }
}
