class UserDTO {
  constructor(
    id,
    username,
    identity_id,
    tenantId,
    email,
    first_name,
    last_name,
    app_map_ids
  ) {
    this.id = id;
    this.username = username;
    this.identity_id = identity_id;
    this.tenantId = tenantId;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.app_map_ids = app_map_ids;
  }
}

module.exports = UserDTO;
