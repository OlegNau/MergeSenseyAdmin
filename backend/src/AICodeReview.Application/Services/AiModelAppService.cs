using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using AICodeReview.Permissions;
using AICodeReview.AiModels;
using AICodeReview.AiModels.Dtos;

namespace AICodeReview.Services;

[Authorize(AICodeReviewPermissions.AiModels.Default)]
public class AiModelAppService :
    CrudAppService<AiModel, AiModelDto, Guid, AiModelGetListInput, AiModelCreateDto, AiModelUpdateDto>,
    IAiModelAppService
{
    protected override string GetPolicyName { get; set; } = AICodeReviewPermissions.AiModels.Default;
    protected override string GetListPolicyName { get; set; } = AICodeReviewPermissions.AiModels.Default;
    protected override string CreatePolicyName { get; set; } = AICodeReviewPermissions.AiModels.Create;
    protected override string UpdatePolicyName { get; set; } = AICodeReviewPermissions.AiModels.Update;
    protected override string DeletePolicyName { get; set; } = AICodeReviewPermissions.AiModels.Delete;

    public AiModelAppService(IRepository<AiModel, Guid> repository)
        : base(repository)
    {
    }

    protected override async Task<IQueryable<AiModel>> CreateFilteredQueryAsync(AiModelGetListInput input)
    {
        var query = await base.CreateFilteredQueryAsync(input);
        if (!string.IsNullOrWhiteSpace(input.Filter))
        {
            query = query.Where(x => x.Name.Contains(input.Filter!) || x.Model.Contains(input.Filter!));
        }
        if (!string.IsNullOrWhiteSpace(input.Provider))
        {
            query = query.Where(x => x.Provider == input.Provider);
        }
        return input.IsActive.HasValue ? query.Where(x => x.IsActive == input.IsActive) : query;
    }

}