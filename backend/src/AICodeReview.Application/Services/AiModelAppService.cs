using System;
using System.Linq;
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

    protected override IQueryable<AiModel> CreateFilteredQuery(AiModelGetListInput input)
    {
        var q = base.CreateFilteredQuery(input);
        if (!input.Filter.IsNullOrWhiteSpace())
        {
            q = q.Where(x => x.Name.Contains(input.Filter!) || x.Model.Contains(input.Filter!));
        }
        if (!input.Provider.IsNullOrWhiteSpace())
        {
            q = q.Where(x => x.Provider == input.Provider);
        }
        if (input.IsActive.HasValue) q = q.Where(x => x.IsActive == input.IsActive);
        return q;
    }
}
