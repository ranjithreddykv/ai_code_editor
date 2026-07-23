import AddNewButton from "@/modules/dashboard/components/add-new-button";
import AddRepo from "@/modules/dashboard/components/add-new-repo";
import React from "react";
import { getAllplaygroundForUser, deleteProjectById, editProjectById, duplicateProjectById } from '../../modules/dashboard/actions/index';
import EmptyState from "@/modules/dashboard/components/empty-state";
import ProjectTable from "@/modules/dashboard/components/project-table";

const Page = async () => {
  const playground = await getAllplaygroundForUser();
  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AddNewButton />
        <AddRepo />
      </div>
      <div className="mt-10 flex flex-col justify-center items-center w-full">
        {playground && playground.length === 0 ? (
          <EmptyState />
        ) : (
          <ProjectTable
            projects={playground || []}
            onDeleteProject={deleteProjectById}
            onUpdateProjct={editProjectById}
            onDuplicateProject={duplicateProjectById}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
