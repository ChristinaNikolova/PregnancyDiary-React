namespace PregnancyDiary.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using PregnancyDiary.Common;
    using PregnancyDiary.Services.Data.Weeks;
    using PregnancyDiary.Web.Models.Common.ViewModels;
    using PregnancyDiary.Web.Models.Weeks.InputModels;
    using PregnancyDiary.Web.Models.Weeks.ViewModels;

    [Route("api/[controller]/[action]")]
    public class WeeksController : ApiController
    {
        private readonly IWeeksService weeksService;

        public WeeksController(IWeeksService weeksService)
        {
            this.weeksService = weeksService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Create([FromBody] CreateWeekInputModel input)
        {
            try
            {
                var isWeekNumberAlreadyExisting = await this.weeksService.IsWeekNumberAlreadyExistingAsync(input.Number, input.DiaryId);

                if (isWeekNumberAlreadyExisting)
                {
                    return this.BadRequest(new BadRequestViewModel
                    {
                        Message = Messages.Error.AlreadyExistsNumber,
                    });
                }

                await this.weeksService.CreateAsync(input.Number, input.MyWeight, input.MyBellySize, input.Mood, input.BabyHeight, input.BabyWeight, input.DiaryId);

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
        public async Task<ActionResult<IEnumerable<WeekViewModel>>> AllCurrentDiary(string diaryId)
        {
            try
            {
                var weeks = await this.weeksService.GetAllCurrentDiaryAsync<WeekViewModel>(diaryId);

                return this.Ok(weeks);
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
                await this.weeksService.DeleteAsync(id);

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
        public async Task<ActionResult<UpdateWeekInputModel>> Update(string id)
        {
            try
            {
                var week = await this.weeksService.GetDetailsAsync<UpdateWeekInputModel>(id);

                return this.Ok(week);
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
        public async Task<ActionResult> Update(UpdateWeekInputModel input)
        {
            try
            {
                var isNumberAlreadyExisting = await this.weeksService.IsWeekNumberAlreadyExistingAsync(input.Number, input.DiaryId);

                if (isNumberAlreadyExisting)
                {
                    var existingWeekId = await this.weeksService.GetIdByNumberAsync(input.Number, input.DiaryId);

                    if (existingWeekId != input.Id)
                    {
                        return this.BadRequest(new BadRequestViewModel
                        {
                            Message = Messages.Error.AlreadyExistsNumber,
                        });
                    }
                }

                await this.weeksService.UpdateAsync(input.Id, input.Number, input.MyWeight, input.MyBellySize, input.Mood, input.BabyHeight, input.BabyWeight, input.DiaryId);

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
