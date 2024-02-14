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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
/* import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); */
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(10);
        return yield bcrypt_1.default.hash(password, salt);
    });
}
function fieldsValidation(firstName, lastName, role, email, avatar, password, confirmPassword) {
    if (!firstName || !lastName || !password || !role || !email) {
        return "Veillez remplir tous les champs";
    }
    if (password !== confirmPassword) {
        return "Veillez entrer les mots de passe identiques";
    }
    if (password.length < 6) {
        return "Le mot de passe doit contenir au moins 6 caractères";
    }
    if (firstName.length < 2 || lastName.length < 2) {
        return "Le prénom et le nom doivent contenir au moins 2 caractères";
    }
    const avatarRegex = /\.(jpeg|jpg|gif|png)$/;
}
function registerUser(firstName, lastName, role, email, avatar, password, confirmPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const validationMessage = fieldsValidation(firstName, lastName, role, email, avatar, password, confirmPassword);
        if (validationMessage) {
            throw new Error(validationMessage);
        }
        const hashedPassword = yield hashPassword(password);
        const newUser = yield prisma.user.create({
            data: {
                firstName,
                lastName,
                role,
                email,
                avatar,
                password: hashedPassword,
            },
        });
        return newUser;
    });
}
