"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keycloak_connect_1 = __importDefault(require("keycloak-connect"));
const express_session_1 = __importDefault(require("express-session"));
class KeycloakConfigService {
    constructor(router) {
        this.keycloak = new keycloak_connect_1.default({ store: new express_session_1.default.MemoryStore() });
        // Add a session middleware
        router.use((0, express_session_1.default)({
            secret: 'your-secret-key',
            resave: false,
            saveUninitialized: true,
        }));
        // Initialize Keycloak middleware
        router.use(this.keycloak.middleware());
    }
    getKeycloak() {
        return this.keycloak;
    }
}
exports.default = KeycloakConfigService;
