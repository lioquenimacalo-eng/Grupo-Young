import type { LoginUser } from "@model/dao";
import { prisma } from "../database/prisma";


export class userAdmin {
  async adminLogin(data: LoginUser) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: data.email,
          role: "Admin",
        },
      });

      return user;
    } catch (error) {
      throw new Error("Error to login User!");
    }
  }

//   async dashboard() {
//     try {
//       const totalUsuario = await prisma.user.count({ where: { role: "User" } });

//       const totalParoquia = await prisma.paroquias.count();

//       const totalCentros = await prisma.centrosparoquias.count();

//       //Promessados
//       const totalUsuarioPromessados = await prisma.user.count({
//         where: { promessado: "Sim", role: "User" },
//       });

//       //Não Promessados
//       const totalUsuarioNaoPromessados = await prisma.user.count({
//         where: { Promessado: "Não", role: "User" },
//       });

//       const data = {
//         totalUsuario,
//         totalParoquia,
//         totalCentros,
//         totalUsuarioPromessados,
//         totalUsuarioNaoPromessados,
//       };

//       return data;
//     } catch (error) {
//       console.log(error);
//       throw new Error("Error to get data");
//     }
//   }

}
