"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    circle: {
        baseUrl: process.env.CIRCLE_BASEURL,
        apiKey: process.env.API_KEY
    },
    session: {
        secret: process.env.SESSION_SECRET
    }
});
//# sourceMappingURL=app.js.map