using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace AICodeReview.Branches.Dtos;

public interface IBranchAppService : ICrudAppService<BranchDto, Guid, BranchGetListInput, BranchCreateDto, BranchUpdateDto>
{
}
