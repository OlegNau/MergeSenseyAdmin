using System;
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
}
