import { useState, useEffect, useCallback } from "react";
import type { TemplateFolder } from "../lib/path-to-json";
import { toast } from "sonner";
import { getPlaygroundById, SaveUpdatedCode } from "../actions";

interface PlaygroundData {
  id: string;
  name?: string;
  [key: string]: any;
}

interface UsePlaygroundReturn {
  playgroundData: PlaygroundData | null;
  templateData: TemplateFolder | null;
  isLoading: boolean;
  error: string | null;
  loadPlayground: () => Promise<void>;
  saveTemplateData: (data: TemplateFolder) => Promise<void>;
}

export const usePlayground = (id: string): UsePlaygroundReturn => {
  const [playgroundData, setPlaygroundData] = useState<PlaygroundData | null>(
    null,
  );
  const [templateData, setTemplateData] = useState<TemplateFolder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadPlayground = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      setError(null);
      const data = await getPlaygroundById(id);
      // @ts-ignore
      setPlaygroundData(data);
      const rawContent = data?.templateFiles?.[0]?.content;
      console.log("Raw content " , rawContent)
      if (typeof rawContent === "string") {
        const parseContent = JSON.parse(rawContent);
        setTemplateData(parseContent);
        toast.success("Playground loaded successfully");
        return;
      }
      // load template from api if not in saved content
      const res = await fetch(`/api/template/${id}`);
      if (!res.ok) throw new Error(`Failed to load template : ${res.status}`);
      const templateRes = await res.json();
      if (templateRes.templateJson && Array.isArray(templateRes.templateJson.items)) {
        setTemplateData({
          folderName: "Root",
          items: templateRes.templateJson,
        });
      } else {
        setTemplateData({
          folderName: "Root",
          items: [],
        });

      }
      toast.success("Template loaded successfully");
    } catch (error) {
      console.error("Error loading playground", error);
      setError("Failed to load the playground");
      toast.error("Failed to load the playground");
    } finally {
      setIsLoading(false);
    }
  }, [id]);
  const saveTemplateData = useCallback(
    async(data:TemplateFolder)=>{
        try{
        await SaveUpdatedCode(id , data);
        setTemplateData(data);
        toast.success("Changes saved successfully");
        }catch(error){
            console.error("Error saving template data", error);
            setError("Failed to save changes");
            toast.error("Failed to save changes");
        }
    }
  ,[id])
  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPlayground()
  },[loadPlayground])
  return {
    playgroundData,
    templateData,
    isLoading,
    error,
    loadPlayground ,
    saveTemplateData
  }
};
