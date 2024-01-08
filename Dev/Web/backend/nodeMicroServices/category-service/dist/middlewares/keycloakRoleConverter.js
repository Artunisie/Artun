"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keycloakRoleConverter = void 0;
function keycloakRoleConverter(req, res, next) {
    var _a, _b, _c, _d;
    // Use type assertion to inform TypeScript about the existence of 'kauth' property
    const roles = (_d = (_c = (_b = (_a = req['kauth']) === null || _a === void 0 ? void 0 : _a.grant) === null || _b === void 0 ? void 0 : _b.access_token) === null || _c === void 0 ? void 0 : _c.content.realm_access) === null || _d === void 0 ? void 0 : _d.roles;
    if (!roles) {
        return next();
    }
    const authorities = roles.map((role) => `ROLE_${role}`);
    req.authorities = authorities; // Attach roles to the request object
    next();
}
exports.keycloakRoleConverter = keycloakRoleConverter;
