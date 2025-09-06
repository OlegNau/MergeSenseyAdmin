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
            // Если в сущности Pipeline нет свойства Description — игнорируем его в DTO, чтобы не падала конфигурация.
            CreateMap<Pipeline, PipelineDto>()
                .ForMember(d => d.Description, opt => opt.Ignore());

            // DTO -> Entity
            // У сущности есть ExtraProperties, у DTO его нет — игнорируем.
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