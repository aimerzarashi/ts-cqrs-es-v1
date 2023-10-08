
# admin
## well-known request
```
https://iam-provider.aimerzarashi.com/realms/aimerzarashi/.well-known/uma2-configuration
```

##  well-know response
```
{
    "issuer": "https://iam-provider.aimerzarashi.com/realms/aimerzarashi",
    "authorization_endpoint": "https://iam-provider.aimerzarashi.com/realms/aimerzarashi/protocol/openid-connect/auth",
    "token_endpoint": "https://iam-provider.aimerzarashi.com/realms/aimerzarashi/protocol/openid-connect/token",
    "introspection_endpoint": "https://iam-provider.aimerzarashi.com/realms/aimerzarashi/protocol/openid-connect/token/introspect",
    "end_session_endpoint": "https://iam-provider.aimerzarashi.com/realms/aimerzarashi/protocol/openid-connect/logout",
    "frontchannel_logout_session_supported": true,
    "frontchannel_logout_supported": true,
    "jwks_uri": "https://iam-provider.aimerzarashi.com/realms/aimerzarashi/protocol/openid-connect/certs",
    "grant_types_supported": [
        "authorization_code",
        "implicit",
        "refresh_token",
        "password",
        "client_credentials",
        "urn:ietf:params:oauth:grant-type:device_code",
        "urn:openid:params:grant-type:ciba"
    ],
    "response_types_supported": [
        "code",
        "none",
        "id_token",
        "token",
        "id_token token",
        "code id_token",
        "code token",
        "code id_token token"
    ],
    "response_modes_supported": [
        "query",
        "fragment",
        "form_post",
        "query.jwt",
        "fragment.jwt",
        "form_post.jwt",
        "jwt"
    ],
    "registration_endpoint": "https://iam-provider.aimerzarashi.com/realms/aimerzarashi/clients-registrations/openid-connect",
    "token_endpoint_auth_methods_supported": [
        "private_key_jwt",
        "client_secret_basic",
        "client_secret_post",
        "tls_client_auth",
        "client_secret_jwt"
    ],
    "token_endpoint_auth_signing_alg_values_supported": [
        "PS384",
        "ES384",
        "RS384",
        "HS256",
        "HS512",
        "ES256",
        "RS256",
        "HS384",
        "ES512",
        "PS256",
        "PS512",
        "RS512"
    ],
    "scopes_supported": [
        "openid",
        "email",
        "offline_access",
        "acr",
        "phone",
        "web-origins",
        "address",
        "roles",
        "microprofile-jwt",
        "profile"
    ],
    "resource_registration_endpoint": "https://iam-provider.aimerzarashi.com/realms/aimerzarashi/authz/protection/resource_set",
    "permission_endpoint": "https://iam-provider.aimerzarashi.com/realms/aimerzarashi/authz/protection/permission",
    "policy_endpoint": "https://iam-provider.aimerzarashi.com/realms/aimerzarashi/authz/protection/uma-policy"
}
```

## admin get token
```
curl -X POST https://iam-provider.aimerzarashi.com/realms/master/protocol/openid-connect/token -H 'content-type: application/x-www-form-urlencoded' -d 'client_id=admin-cli&grant_type=password&username=admin&password=password'
```

## admin regist user
```
curl -X POST https://iam-provider.aimerzarashi.com/admin/realms/aimerzarashi/users -d '{"username": "20231005211000@example.com", "enabled": true, "email": "20231005211000@example.com"}' -H 'Content-Type: application/json; charset=UTF-8' -H 'Authorization: Bearer xxx'
```

# user get token
## client credentials
### client_secret_basic
```
curl -X POST https://iam-provider.aimerzarashi.com/realms/aimerzarashi/protocol/openid-connect/token --user website-ui:gu7g0oCMBvKR09eHKMZjRy1EiYAPAy8F -H 'content-type: application/x-www-form-urlencoded' -d 'grant_type=password&username=20230930124500@example.com&password=password'
```
### client_secret_jwt
```
curl -X POST https://iam-provider.aimerzarashi.com/realms/aimerzarashi/protocol/openid-connect/token --user website-ui:gu7g0oCMBvKR09eHKMZjRy1EiYAPAy8F -H 'content-type: application/x-www-form-urlencoded' -d 'grant_type=authorization_code&username=20230930124500@example.com'
```

# user verify token
```
curl -X POST https://iam-provider.aimerzarashi.com/realms/aimerzarashi/protocol/openid-connect/token/introspect --user website-ui:gu7g0oCMBvKR09eHKMZjRy1EiYAPAy8F -H 'content-type: application/x-www-form-urlencoded' -d 'token=xxx'
```
