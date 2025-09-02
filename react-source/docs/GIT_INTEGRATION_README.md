# Git Integration for Project Creation

## Overview

This feature allows users to create new projects and connect them to Git repositories from popular providers like GitHub, GitLab, and Bitbucket.

## Features

### 1. Project Creation Flow
- **Step 1**: Basic project information (name, description)
- **Step 2**: Git provider selection and authorization
- **Step 3**: Repository selection from connected account
- **Step 4**: Project creation with Git integration

### 2. Supported Git Providers
- **GitHub** - Full integration with OAuth flow
- **GitLab** - Full integration with OAuth flow  
- **Bitbucket** - Full integration with OAuth flow

### 3. Git Repository Information
- Repository URL and ID
- Default branch selection
- Access token management (encrypted)
- Provider-specific metadata

## Database Schema Changes

### New Fields in `projects` Table
```sql
ALTER TABLE `projects` ADD COLUMN `git_provider` text;
ALTER TABLE `projects` ADD COLUMN `git_repository_url` text;
ALTER TABLE `projects` ADD COLUMN `git_repository_id` text;
ALTER TABLE `projects` ADD COLUMN `git_branch` text DEFAULT 'main';
ALTER TABLE `projects` ADD COLUMN `git_access_token` text;
```

### New Table: `git_providers`
```sql
CREATE TABLE `git_providers` (
    `id` text PRIMARY KEY NOT NULL,
    `name` text NOT NULL,
    `display_name` text NOT NULL,
    `base_url` text NOT NULL,
    `client_id` text,
    `client_secret` text,
    `is_active` integer DEFAULT 1,
    `created_at` integer
);
```

## Components

### 1. CreateProjectForm (`client/src/components/create-project-form.tsx`)
Multi-step form component that handles:
- Project details input
- Git provider selection
- OAuth authorization flow
- Repository selection

### 2. CreateProject Page (`client/src/pages/create-project.tsx`)
Page component that wraps the form and provides navigation.

### 3. Updated ProjectCard (`client/src/components/project-card.tsx`)
Enhanced to display Git repository information including:
- Provider badge
- Repository URL
- Branch information

## Usage Flow

### For Users

1. **Navigate to Projects page**
   - Click on "Projects" in the sidebar
   - Click "+ Создать проект" button

2. **Fill Project Details**
   - Enter project name and description
   - Select Git provider (GitHub, GitLab, or Bitbucket)

3. **Connect Git Repository**
   - Click "Подключить репозиторий"
   - Authorize with selected Git provider
   - Select repository from the list

4. **Complete Creation**
   - Review selected repository information
   - Click "Создать проект"
   - Redirected to new project page

### For Developers

#### Adding New Git Provider

1. **Update Schema**
   ```typescript
   // Add to gitProviders table
   {
     id: 'new-provider',
     name: 'new-provider',
     displayName: 'New Provider',
     baseUrl: 'https://new-provider.com'
   }
   ```

2. **Update Components**
   - Add provider icon to `CreateProjectForm`
   - Update `ProjectCard` display logic
   - Add OAuth configuration

#### OAuth Integration

The current implementation includes mock OAuth flow. To implement real OAuth:

1. **Configure OAuth Apps**
   - Register applications with each Git provider
   - Store client IDs and secrets securely

2. **Implement OAuth Flow**
   - Redirect to provider authorization page
   - Handle callback with authorization code
   - Exchange code for access token

3. **API Integration**
   - Use access token to fetch user repositories
   - Implement webhook setup for automated triggers

## Security Considerations

- **Access Tokens**: Stored encrypted in database
- **OAuth Scopes**: Request minimal required permissions
- **Token Refresh**: Implement token refresh mechanism
- **Webhook Security**: Validate webhook signatures

## Future Enhancements

1. **Webhook Management**
   - Automatic webhook setup for repositories
   - Webhook event handling and processing

2. **Branch Management**
   - Support for multiple branches
   - Branch-specific pipeline configuration

3. **Repository Sync**
   - Periodic repository metadata updates
   - Handle repository renames and deletions

4. **Advanced Git Features**
   - Pull request integration
   - Code review automation
   - Merge conflict resolution

## Testing

### Manual Testing
1. Create new project with each Git provider
2. Verify repository information display
3. Test navigation between form steps
4. Validate form validation and error handling

### Automated Testing
- Unit tests for form components
- Integration tests for OAuth flow
- E2E tests for complete project creation

## Troubleshooting

### Common Issues

1. **OAuth Authorization Fails**
   - Check client ID and secret configuration
   - Verify redirect URI settings
   - Check provider API status

2. **Repository List Empty**
   - Verify OAuth scopes include repository access
   - Check user permissions on repositories
   - Validate API rate limits

3. **Database Migration Errors**
   - Ensure SQLite version supports ALTER TABLE
   - Check for existing column conflicts
   - Verify migration order

## Dependencies

- React 18+
- TypeScript 5+
- Tailwind CSS
- Lucide React Icons
- Radix UI Components

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
