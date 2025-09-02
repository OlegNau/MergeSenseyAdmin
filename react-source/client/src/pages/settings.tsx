import { Save, Building2, Users, Shield, Bell, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/contexts/language-context";

export function Settings() {
  const { t, language, setLanguage } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" data-testid="text-settings-title">
          {t('settings.title')}
        </h1>
        <p className="text-muted-foreground mt-1" data-testid="text-settings-subtitle">
          {t('settings.subtitle')}
        </p>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company" data-testid="tab-company">
            <Building2 className="w-4 h-4 mr-2" />
            {t('settings.company')}
          </TabsTrigger>
          <TabsTrigger value="team" data-testid="tab-team">
            <Users className="w-4 h-4 mr-2" />
            {t('settings.team')}
          </TabsTrigger>
          <TabsTrigger value="security" data-testid="tab-security">
            <Shield className="w-4 h-4 mr-2" />
            {t('settings.security')}
          </TabsTrigger>
          <TabsTrigger value="notifications" data-testid="tab-notifications">
            <Bell className="w-4 h-4 mr-2" />
            {t('settings.notifications')}
          </TabsTrigger>
          <TabsTrigger value="language" data-testid="tab-language">
            <Globe className="w-4 h-4 mr-2" />
            {t('settings.language')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <Card data-testid="card-company-info">
            <CardHeader>
              <CardTitle>{t('settings.companyInfo')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">{t('settings.companyName')}</Label>
                  <Input
                    id="company-name"
                    defaultValue="Acme Corporation"
                    data-testid="input-company-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-website">{t('settings.website')}</Label>
                  <Input
                    id="company-website"
                    defaultValue="https://acme.com"
                    data-testid="input-company-website"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-description">{t('settings.description')}</Label>
                <Textarea
                  id="company-description"
                  placeholder={t('settings.descriptionPlaceholder')}
                  defaultValue={language === 'ru' ? 'Ведущая технологическая компания, специализирующаяся на инновационных решениях.' : 'Leading technology company focused on innovative solutions.'}
                  data-testid="textarea-company-description"
                />
              </div>
              <Button data-testid="button-save-company">
                <Save className="w-4 h-4 mr-2" />
                {t('settings.saveChanges')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card data-testid="card-team-settings">
            <CardHeader>
              <CardTitle>{t('settings.teamSettings')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('settings.autoAddMembers')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.autoAddMembersDesc')}
                  </p>
                </div>
                <Switch data-testid="switch-auto-add-members" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('settings.requireApproval')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.requireApprovalDesc')}
                  </p>
                </div>
                <Switch defaultChecked data-testid="switch-require-approval" />
              </div>
              <Button data-testid="button-save-team">
                <Save className="w-4 h-4 mr-2" />
                {t('settings.saveChanges')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card data-testid="card-security-settings">
            <CardHeader>
              <CardTitle>{t('settings.securitySettings')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('settings.twoFactor')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.twoFactorDesc')}
                  </p>
                </div>
                <Switch defaultChecked data-testid="switch-2fa" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('settings.sessionTimeout')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.sessionTimeoutDesc')}
                  </p>
                </div>
                <Switch defaultChecked data-testid="switch-session-timeout" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('settings.ipRestrictions')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.ipRestrictionsDesc')}
                  </p>
                </div>
                <Switch data-testid="switch-ip-restrictions" />
              </div>
              <Button data-testid="button-save-security">
                <Save className="w-4 h-4 mr-2" />
                {t('settings.saveChanges')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card data-testid="card-notification-settings">
            <CardHeader>
              <CardTitle>{t('settings.notificationPreferences')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('settings.pipelineFailures')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.pipelineFailuresDesc')}
                  </p>
                </div>
                <Switch defaultChecked data-testid="switch-pipeline-failures" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('settings.securityAlerts')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.securityAlertsDesc')}
                  </p>
                </div>
                <Switch defaultChecked data-testid="switch-security-alerts" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('settings.weeklyReports')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.weeklyReportsDesc')}
                  </p>
                </div>
                <Switch defaultChecked data-testid="switch-weekly-reports" />
              </div>
              <Button data-testid="button-save-notifications">
                <Save className="w-4 h-4 mr-2" />
                {t('settings.saveChanges')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          <Card data-testid="card-language-settings">
            <CardHeader>
              <CardTitle>{t('settings.languageSettings')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t('settings.selectLanguage')}</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-48" data-testid="select-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">{t('settings.english')}</SelectItem>
                    <SelectItem value="ru">{t('settings.russian')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button data-testid="button-save-language">
                <Save className="w-4 h-4 mr-2" />
                {t('settings.saveChanges')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}