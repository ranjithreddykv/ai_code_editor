"use client";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { usePlayground } from "@/modules/playground/hooks/usePlayground";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { TemplateFileTree } from "@/modules/playground/components/playground.explorer";
import { useFileExplorer } from "@/modules/playground/hooks/useFileExplorer";
import { TemplateFile } from "@/modules/playground/lib/path-to-json";

const MainPlaygroundPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    playgroundData,
    templateData,
    isLoading,
    error,
    loadPlayground,
    saveTemplateData,
  } = usePlayground(id);
  const {
    activeFileId,
    closeAllFiles,
    openFile,
    openFiles,
    setTemplateData,
    setActiveFileId,
    setPlaygroundId,
    setOpenFiles,
    closeFile,
  } = useFileExplorer();

  // set template data when playground loads
  useEffect(() => {
    setPlaygroundId(id);
  }, [id, setPlaygroundId]);

  //load template data from zustand
  useEffect(()=>{
    setTemplateData(templateData)
  },[templateData , setTemplateData , openFile.length])

  const activeFile = openFiles.find((file)=> file.id === activeFileId)
  const hasUnsavedChanges = openFiles.some((file)=>file.hasUnsavedChanges);

  const handleFileSelect = (file:TemplateFile)=>{
    openFile(file)
  }
  return (
    <TooltipProvider>
      <>
        <TemplateFileTree
          data={templateData!}
          onFileSelect={handleFileSelect}
          selectedFile={activeFile}
          title="File Explorer"
          onAddFile={() => {}}
          onAddFolder={() => {}}
          onDeleteFile={() => {}}
          onDeleteFolder={() => {}}
          onRenameFile={() => {}}
          onRenemeFolder={() => {}}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </header>
          <div className="flex flex-1 items-center gap-2">
            <h1 className="text-sm font-medium">
              {playgroundData?.title || "Code playground"}
            </h1>
          </div>
        </SidebarInset>
      </>
    </TooltipProvider>
  );
};

export default MainPlaygroundPage;
