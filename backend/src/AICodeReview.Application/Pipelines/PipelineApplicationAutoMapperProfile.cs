using AutoMapper;
using Volo.Abp.AutoMapper;

using AICodeReview.Pipelines;
using AICodeReview.Pipelines.Dtos;

namespace AICodeReview.Pipelines
{
    public class PipelineApplicationAutoMapperProfile : Profile
    {
        public PipelineApplicationAutoMapperProfile()
        {
            // Entity -> DTO
            
            CreateMap<Pipeline, PipelineDto>()
                .ForMember(d => d.Description, opt => opt.Ignore());

            // DTO -> Entity
            
            CreateMap<CreateUpdatePipelineDto, Pipeline>()
                .IgnoreFullAuditedObjectProperties()
                .ForMember(x => x.ExtraProperties,   opt => opt.Ignore())
                .ForMember(x => x.Id,               opt => opt.Ignore())
                .ForMember(x => x.TenantId,         opt => opt.Ignore())
                .ForMember(x => x.ConcurrencyStamp, opt => opt.Ignore())
                .ForMember(x => x.Project,          opt => opt.Ignore())
                .ForMember(x => x.Status,           opt => opt.Ignore())
                .ForMember(x => x.StartedAt,        opt => opt.Ignore())
                .ForMember(x => x.FinishedAt,       opt => opt.Ignore())
                .ForMember(x => x.DurationSeconds,  opt => opt.Ignore());
        }
    }
}