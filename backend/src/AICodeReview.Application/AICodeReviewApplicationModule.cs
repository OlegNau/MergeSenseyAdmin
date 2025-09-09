using Volo.Abp.Account;
using Volo.Abp.AutoMapper;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;


using Volo.Abp.Authorization.Permissions;
using AICodeReview.Permissions;

namespace AICodeReview;

[DependsOn(
    typeof(AICodeReviewDomainModule),
    typeof(AICodeReviewApplicationContractsModule),
    typeof(AbpAccountApplicationModule),
    typeof(AbpIdentityApplicationModule),
    typeof(AbpPermissionManagementApplicationModule),
    typeof(AbpTenantManagementApplicationModule),
    typeof(AbpFeatureManagementApplicationModule),
    typeof(AbpSettingManagementApplicationModule),
    typeof(AbpAutoMapperModule) 
)]
public class AICodeReviewApplicationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpAutoMapperOptions>(options =>
        {
            
            options.AddMaps<AICodeReviewApplicationModule>(validate: true);
        });

        
        Configure<AbpPermissionOptions>(options =>
        {
            options.DefinitionProviders.Add<AICodeReviewPermissionDefinitionProvider>();
        });
    }
}

