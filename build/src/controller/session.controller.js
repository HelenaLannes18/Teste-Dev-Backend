"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSessionHandler = exports.getUserSessionsHandler = exports.createUserSessionHandler = void 0;
var config_1 = __importDefault(require("config"));
var session_service_1 = require("../service/session.service");
var user_service_1 = require("../service/user.service");
var jwt_utils_1 = require("../utils/jwt.utils");
function createUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, session, accessToken, refreshToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, user_service_1.validatePassword)(req.body)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(401).send("Invalid email or password")];
                    }
                    return [4 /*yield*/, (0, session_service_1.createSession)(user._id, req.get("user-agent") || "")];
                case 2:
                    session = _a.sent();
                    accessToken = (0, jwt_utils_1.signJwt)(__assign(__assign({}, user), { session: session._id }), "accessTokenPrivateKey", { expiresIn: config_1.default.get("accessTokenTtl") } // 15 minutes,
                    );
                    refreshToken = (0, jwt_utils_1.signJwt)(__assign(__assign({}, user), { session: session._id }), "refreshTokenPrivateKey", { expiresIn: config_1.default.get("refreshTokenTtl") } // 15 minutes
                    );
                    // return access & refresh tokens
                    return [2 /*return*/, res.send({ accessToken: accessToken, refreshToken: refreshToken })];
            }
        });
    });
}
exports.createUserSessionHandler = createUserSessionHandler;
function getUserSessionsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, sessions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.user._id;
                    return [4 /*yield*/, (0, session_service_1.findSessions)({ user: userId, valid: true })];
                case 1:
                    sessions = _a.sent();
                    return [2 /*return*/, res.send(sessions)];
            }
        });
    });
}
exports.getUserSessionsHandler = getUserSessionsHandler;
function deleteSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var sessionId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sessionId = res.locals.user.session;
                    return [4 /*yield*/, (0, session_service_1.updateSession)({ _id: sessionId }, { valid: false })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, res.send({
                            accessToken: null,
                            refreshToken: null,
                        })];
            }
        });
    });
}
exports.deleteSessionHandler = deleteSessionHandler;
