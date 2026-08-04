// as web container accept files structure differently
// we have to transform our preview file and folder structure compatible with web container
// in database we store files differently which are not compitable with webcontainer

import { TemplateFile, TemplateFolder } from "@/modules/playground/types";

interface TemplateItem {
  filename: string;
  fileExtension: string;
  content: string;
  folderName?: string;
  items?: TemplateItem[];
}

interface WebContainerFile {
  file: {
    contents: string;
  };
}

interface WebContainerDirectory {
  directory: {
    [key: string]: WebContainerFile | WebContainerDirectory;
  };
}

type WebContainerFileSystem = Record<
  string,
  WebContainerFile | WebContainerDirectory
>;

export function transformToWebContainerFormat(template :TemplateItem): WebContainerFileSystem {
  function processItem(
    item: TemplateItem,
  ): WebContainerFile | WebContainerDirectory {
    if (item.folderName && item.items) {
      // This is a directory
      const directoryContents: WebContainerFileSystem = {};

      item.items.forEach((subItem) => {
        const key = subItem.fileExtension
          ? `${subItem.filename}.${subItem.fileExtension}`
          : subItem.folderName!;
        directoryContents[key] = processItem(subItem);
      });

      return {
        directory: directoryContents,
      };
    } else {
      // This is a file
      return {
        file: {
          contents: item.content,
        },
      };
    }
  }

  const result: WebContainerFileSystem = {};

  template?.items?.forEach((item) => {
    const key = item.fileExtension
      ? `${item.filename}.${item.fileExtension}`
      : item.folderName!;
    result[key] = processItem(item);
  });

  return result;
};