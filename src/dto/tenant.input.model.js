class TenantInput {
  constructor({ id, identifier, name, sso_provider, status, apps }) {
    this.id = id;
    this.name = name;
    this.identifier = identifier;
    this.sso_provider = sso_provider;
    this.status = status;
    this.apps = apps?.map((app) => new AppTenantMappingInput(app));
  }
}

// DTO for Table B Input
class AppTenantMappingInput {
  constructor({
    app_id,
    tenant_id,
    status,
    id,
    name,
    sso_provider,
    post_logout_redirect_uri,
    source_url,
    display_name,
    logo,
    auth_server_url,
    metadata_url,
    login_redirect_uri,
  }) {
    this.app_id = app_id;
    this.tenant_id = tenant_id;
    this.status = status;
    this.id = id;
    this.name = name;
    this.sso_provider = sso_provider;
    this.post_logout_redirect_uri = post_logout_redirect_uri;
    this.source_url = source_url;
    this.display_name = display_name;
    this.logo = logo;
    this.auth_server_url = auth_server_url;
    this.metadata_url = metadata_url;
    this.login_redirect_uri = login_redirect_uri;
  }
}

module.exports = { TenantInput, AppTenantMappingInput };
