"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/modules/auth/actions";
import { revalidatePath } from "next/cache";

export const getAllplaygroundForUser = async () => {
  try {
    const user = await getCurrentUser();
    const id = user?.id;
    const playgrounds = await db.playground.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
        starMark: {
          where: {
            userId: id,
          },
          select: {
            isMarked: true,
          },
        },
      },
    });
    return playgrounds;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createPlayground = async (data: {
  title: string;
  template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
  description?: string;
}) => {
  const user = await getCurrentUser();

  const { title, template, description } = data;
  try {
    const playground = await db.playground.create({
      data: {
        title: title,
        template: template,
        description: description,
        userId: user?.id,
      },
    });
    revalidatePath("/dashboard");
    return playground;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProjectById = async (id: string) => {
  try {
    await db.playground.delete({
      where: {
        id: id,
      },
    });
    //udpating table withour reloading
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
export const editProjectById = async (
  id: string,
  data: { title: string; description: string },
) => {
  try {
    const editedProject = await db.playground.update({
      where: {
        id: id,
      },
      data: data,
    });
    revalidatePath("/dashboard");
    return editedProject;
  } catch (error) {
    console.log(error);
  }
};

export const duplicateProjectById = async (id: string) => {
  try {
    const originalPlayground = await db.playground.findUnique({
      where: {
        id,
      },
      //todo add template file
    });
    if (!originalPlayground) {
      throw new Error("Original playground not found");
    }
    const duplicatePlayground = await db.playground.create({
      data: {
        title: `${originalPlayground.title} (Copy)`,
        description: originalPlayground.description,
        template: originalPlayground.template,
        userId: originalPlayground.userId,
        //todo : add template files
      },
    });
    revalidatePath("/dashboard");
    return duplicatePlayground;
  } catch (error) {
    console.log(error);
  }
};

export const toggleStarMarked = async (
  playgroundId: string,
  isChecked: boolean,
) => {
  const user = await getCurrentUser();
  const userId = user?.id;
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    if (isChecked) {
      await db.starMark.create({
        data: {
          userId: userId!,
          playgroundId,
          isMarked: isChecked,
        },
      });
    } else {
      await db.starMark.delete({
        where: {
          userId_playgroundId: {
            userId,
            playgroundId: playgroundId,
          },
        },
      });
    }

    revalidatePath("/dashboard");
    return { success: true, isMarked: isChecked };
  } catch (error) {
    console.error("Error updating problem:", error);
    return { success: false, error: "Failed to update problem" };
  }
};
