namespace PregnancyDiary.WebApi.Controllers
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using PregnancyDiary.Common;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Web.Models.Account.InputModels;
    using PregnancyDiary.Web.Models.Account.ViewModels;
    using PregnancyDiary.Web.Models.Common.ViewModels;
    using PregnancyDiary.WebApi.Helpers;

    [AllowAnonymous]
    [Route("api/[controller]/[action]")]
    public class AccountController : ApiController
    {
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly JwtSettings jwtSettings;

        public AccountController(
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager,
            IOptions<JwtSettings> jwtSettings)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.jwtSettings = jwtSettings.Value;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public async Task<object> Login([FromBody] LoginInputModel model)
        {
            ;
            var user = this.userManager.Users.SingleOrDefault(r => r.Email == model.Email);

            if (user is null)
            {
                return this.BadRequest(new BadRequestViewModel
                {
                    Message = Messages.Error.InvalidCredentials,
                });
            }

            var result = await this.signInManager.PasswordSignInAsync(user.UserName, model.Password, false, false);

            var isAdmin = user.UserName == "Admin";

            if (result.Succeeded)
            {
                return new AuthenticationViewModel
                {
                    Username = user.UserName,
                    Message = Messages.Success.Login,
                    Token = this.GenerateJwtToken(user),
                    IsAdmin = isAdmin,
                };
            }

            return this.BadRequest(new BadRequestViewModel
            {
                Message = Messages.Error.InvalidCredentials,
            });
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public async Task<object> Register([FromBody] RegisterInputModel model)
        {
            var user = new ApplicationUser()
            {
                Email = model.Email,
                UserName = model.Username,
            };

            if (this.userManager.Users.Any(u => u.Email == model.Email))
            {
                return this.BadRequest(new BadRequestViewModel
                {
                    Message = Messages.Error.AlreadyTakenEmail,
                });
            }

            if (this.userManager.Users.Any(u => u.UserName == model.Username))
            {
                return this.BadRequest(new BadRequestViewModel
                {
                    Message = Messages.Error.AlreadyTakenUsername,
                });
            }

            var result = await this.userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                var addToRoleResult = await this.userManager.AddToRoleAsync(user, GlobalConstants.Roles.User);

                if (addToRoleResult.Succeeded)
                {
                    await this.signInManager.SignInAsync(user, false);

                    return new AuthenticationViewModel
                    {
                        Username = model.Username,
                        Message = Messages.Success.Register,
                        Token = this.GenerateJwtToken(user),
                    };
                }
            }

            return this.BadRequest(new BadRequestViewModel
            {
                Message = Messages.Error.Unknown,
            });
        }

        private string GenerateJwtToken(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.jwtSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(ClaimTypes.Name, user.UserName),
                        new Claim(ClaimTypes.Role, this.userManager.IsInRoleAsync(user, GlobalConstants.Roles.Admin).GetAwaiter().GetResult() ? GlobalConstants.Roles.Admin : GlobalConstants.Roles.User),
                    }),
                Expires = DateTime.UtcNow.AddDays(GlobalConstants.JWTExpiration.DefaultDaysExpiredToken),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
