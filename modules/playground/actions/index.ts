"use server";

import { db } from "@/lib/db";
import { TemplateFolder } from "../lib/path-to-json";
import { getCurrentUser } from "@/modules/auth/actions";

export const getPlaygroundById = async (id: string) => {
  try {
    const playground = await db.playground.findUnique({
      where: {
        id,
      },
      select: {
        templateFiles: {
          select: {
            content: true,
          },
        },
      },
    });
    return playground;
  } catch (error) {
    console.log(error);
  }
};

export const SaveUpdatedCode = async (
  playgroundId: string,
  data: TemplateFolder,
) => {
  const user = await getCurrentUser();
  if (!user) return null;
  try {
    //if already exist update else create new (function upsert used for)
    const updatedPlayground = await db.templateFile.upsert({
      where: {
        playgroundId,
      },
      update: {
        content: JSON.stringify(data),
      },
      create: {
        playgroundId,
        content: JSON.stringify(data),
      },
    });
    await db.playground.update({
      where: {
        id:playgroundId
      },
      data: {

      },
    });
    return updatedPlayground;
  } catch (error) {
    console.log("SaveUpdatedCode error : " , error);
    return null;
  }
};
