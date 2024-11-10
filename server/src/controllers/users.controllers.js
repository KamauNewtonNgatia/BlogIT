// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const client = new PrismaClient

//  export const registerUser = async (req, res) => {
//     try {
//       const { firstName, lastName, username, email, password } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 8);
//       if (!username) {
//         res.status(400).json("username is required");
//         return;
//       }

//       if (!firstName) {
//         res.status(400).json("firstname is required");
//         return;
//       }

//       if (!lastName) {
//         res.status(400).json("lastname is required");
//         return;
//       }

//       if (!email) {
//         res.status(400).json("email is required");
//         return;
//       }
//       if (!password) {
//         res.status(400).json("password is required");
//         return;
//       }

//       const userWithEmail = await client.user.findFirst({
//         where: { email: email },
//       });
//       if (userWithEmail) {
//         res.status(400).json({ message: "email already taken" });
//         return;
//       }

//       const userWithusername = await client.user.findFirst({
//         where: { username: username },
//       });
//       if (userWithusername) {
//         res.status(400).json({ message: "username already taken" });
//         return;
//       }

//       const newUser = await client.user.create({
//         data: {
//           firstName,
//           lastName,
//           username,
//           email,
//           password: hashedPassword,
//         },
//       });

//       res.status(200).json(newUser);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
