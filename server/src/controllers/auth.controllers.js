// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const client = new PrismaClient

// export const loginUser = async (req, res) => {
//     try {
//       const email = req.body.email;
//       const password = req.body.password;

//       const user = await client.user.findFirst({
//         where: { email: email },
//       });
//       if (!user) {
//         res.status(401).json({ message: "wrong email or password" });
//         return;
//       }

//       const passwordsMatch = await bcrypt.compare(password, user.password);
//       if (passwordsMatch === false) {
//         res.status(401).json({ message: "wrong email or password" });
//         return;
//       }
//       //implement json web token
//       const token = jwt.sign(user.id, process.env.JWT_SECRET);

//       res.status(200).cookie("authToken", token, { httpOnly: true }).json(user);
//     } catch (e) {
//       res.status(500).json({ message: "something went wrong, please try again" });
//     }
//   }
