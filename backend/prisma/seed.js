"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../src/database");
var initialUsers = [
    {
        id: 1,
        email: "bobvance@gmail.com",
        firstName: "Bob",
        lastName: "Vance",
        username: "bobvance",
        password: "123",
    },
    {
        id: 2,
        email: "tonysoprano@gmail.com",
        firstName: "Tony",
        lastName: "Soprano",
        username: "tonysoprano",
        password: "123",
    },
    {
        id: 3,
        email: "billburr@gmail.com",
        firstName: "Bill",
        lastName: "Burr",
        username: "billburr",
        password: "123",
    },
];
var initialMemberUserIds = [
    { memberId: 1, userId: 1 },
    { memberId: 2, userId: 2 },
    { memberId: 3, userId: 3 },
];
var initialPosts = [
    {
        id: 1,
        title: "First post!",
        content: "This is bob vances first post",
        postType: "Text",
        dateCreated: new Date(),
        memberId: 1,
    },
    {
        id: 2,
        title: "Second post!",
        content: "This is bobs second post",
        postType: "Text",
        dateCreated: new Date(),
        memberId: 1,
    },
    {
        id: 3,
        title: "another post",
        content: "This is tonys first post",
        postType: "Text",
        dateCreated: new Date(),
        memberId: 2,
    },
    {
        id: 4,
        title: "Links",
        content: "This is a link post",
        postType: "<https://khalilstemmler.com>",
        dateCreated: new Date(),
        memberId: 2,
    },
];
var initialPostVotes = [
    // Everyone upvotes their own first post
    { id: 1, postId: 1, voteType: "Upvote", memberId: 1 },
    { id: 2, postId: 2, voteType: "Upvote", memberId: 1 },
    { id: 3, postId: 3, voteType: "Upvote", memberId: 2 },
    { id: 4, postId: 4, voteType: "Upvote", memberId: 2 },
    // Tony's post upvoted by Bob
    { id: 5, postId: 3, voteType: "Upvote", memberId: 1 },
    // Bob's second post downvoted by Bill
    { id: 6, postId: 2, voteType: "Downvote", memberId: 3 },
];
var initialPostComments = [
    {
        id: 1,
        text: "I posted this!",
        memberId: 1,
        postId: 1,
        parentCommentId: null,
    },
    { id: 2, text: "Nice", memberId: 2, postId: 2, parentCommentId: null },
];
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, initialUsers_1, user, newUser, _a, initialPosts_1, post, _b, initialPostVotes_1, vote, _c, initialPostComments_1, comment;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _i = 0, initialUsers_1 = initialUsers;
                    _d.label = 1;
                case 1:
                    if (!(_i < initialUsers_1.length)) return [3 /*break*/, 5];
                    user = initialUsers_1[_i];
                    return [4 /*yield*/, database_1.prisma.user.create({
                            data: user,
                        })];
                case 2:
                    newUser = _d.sent();
                    return [4 /*yield*/, database_1.prisma.member.create({
                            data: {
                                user: {
                                    connect: { id: newUser.id },
                                },
                            },
                        })];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5:
                    _a = 0, initialPosts_1 = initialPosts;
                    _d.label = 6;
                case 6:
                    if (!(_a < initialPosts_1.length)) return [3 /*break*/, 9];
                    post = initialPosts_1[_a];
                    return [4 /*yield*/, database_1.prisma.post.create({
                            data: post,
                        })];
                case 7:
                    _d.sent();
                    _d.label = 8;
                case 8:
                    _a++;
                    return [3 /*break*/, 6];
                case 9:
                    _b = 0, initialPostVotes_1 = initialPostVotes;
                    _d.label = 10;
                case 10:
                    if (!(_b < initialPostVotes_1.length)) return [3 /*break*/, 13];
                    vote = initialPostVotes_1[_b];
                    return [4 /*yield*/, database_1.prisma.vote.create({
                            data: vote,
                        })];
                case 11:
                    _d.sent();
                    _d.label = 12;
                case 12:
                    _b++;
                    return [3 /*break*/, 10];
                case 13:
                    _c = 0, initialPostComments_1 = initialPostComments;
                    _d.label = 14;
                case 14:
                    if (!(_c < initialPostComments_1.length)) return [3 /*break*/, 17];
                    comment = initialPostComments_1[_c];
                    return [4 /*yield*/, database_1.prisma.comment.create({
                            data: comment,
                        })];
                case 15:
                    _d.sent();
                    _d.label = 16;
                case 16:
                    _c++;
                    return [3 /*break*/, 14];
                case 17: return [2 /*return*/];
            }
        });
    });
}
seed();
