import { createRouter } from "./context";
import { prisma } from "../db/client";
import { z } from "zod";

export const doDateRouter = createRouter()
  .query("get-doDates", {
    async resolve() {
      return prisma.doDate.findMany({
        orderBy: {
          done: 'asc',
        },
      })
    },
  }).mutation("update-doDate", {
    input: z.object({id: z.string(), done: z.boolean()}),
    async resolve({ input }) {
      const { id, done } = input;
      return await prisma.doDate.update({
        where: {
          id,
        },
        data: {
          done,
        },
      });
    }
  }).mutation("create-doDate", {
    input: z.object({text: z.string()}),
    async resolve({ input }) {
      const { text } = input;
      await prisma.doDate.create({
        data: {
          text
        }
      });
    }
  });
