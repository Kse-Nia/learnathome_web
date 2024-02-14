import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/* import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); */

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

function fieldsValidation(
  firstName: string,
  lastName: string,
  role: "tutor" | "student",
  email: string,
  avatar: string,
  password: string,
  confirmPassword: string
) {
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

async function registerUser(
  firstName: string,
  lastName: string,
  role: "tutor" | "student",
  email: string,
  avatar: string,
  password: string,
  confirmPassword: string
) {
  const validationMessage = fieldsValidation(
    firstName,
    lastName,
    role,
    email,
    avatar,
    password,
    confirmPassword
  );
  if (validationMessage) {
    throw new Error(validationMessage);
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await prisma.user.create({
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
}
