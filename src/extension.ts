// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import Strategy, { StrategyHexagonalFolder } from "./strategies/strategy";
import TsStrategyCreated from "./strategies/ts/ts-strategy";
import JsStrategyCreated from "./strategies/js/js-strategy";
import PythonStrategyCreated from "./strategies/python/py-strategy";
import JavaStrategyCreated from "./strategies/java/java-strategy";
import GoStrategyCreated from "./strategies/golang/go-strategy";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function capitalizeFirstLetter(inputString: string): string {
  return (
    inputString.substring(0, 1).toUpperCase() +
    inputString.substring(1).toLowerCase()
  );
}

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "hexagonal-arquitecture-folders" is now active!'
  );
    const languageId = detectLanguage();
    const fileExtension = getFileExtension(languageId);
  let createFolder = vscode.commands.registerCommand(
    "hexagonal-arquitecture-folders.createfolder",
    (resource: vscode.Uri) => {
      if (resource && resource.fsPath) {
        vscode.window
          .showInputBox({ prompt: "Enter folder name:" })
          .then((folderNames) => {
            if (folderNames) {
              //const folderPath = vscode.workspace.rootPath ? path.join(vscode.workspace.rootPath, folderName) : '';
              const folderName = capitalizeFirstLetter(folderNames);
              const folderPath = path.join(resource.fsPath, folderName);
              if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
                const subFolders = ["domain", "application", "infrastructure"];
                subFolders.forEach((subFolder) => {
                  fs.mkdirSync(path.join(folderPath, subFolder));
                });

                // Crear Archivo segun lenguaje
                const strategy = getStrategy(languageId).execute();
                //const domainFile = `${folderName.toLowerCase()}.${fileExtension}`;
                const domainFile = strategy.getDomain().getFileName(
                  folderName,
                  fileExtension
                );
                // Crear y escribir en el archivo dependencies.ts
                const filePathFolderNameDomain = path.join(
                  folderPath,
                  subFolders[0],
                  domainFile
                );
                //const fileContentFolderNameDomain = `// TODO: Your content for ${domainFile}\n export default interface ${folderName} {\n // Your Code\n }`;
                const fileContentFolderNameDomain = strategy.getDomain().contentFile(
                  
                  folderName
                );
                const applicationFile = strategy.getApplication().getFileName(
                  folderName,
                  fileExtension
                );
                // Crear y escribir en La Application
                const filePathApplication = path.join(
                  folderPath,
                  subFolders[1],
                  applicationFile
                );
                 const fileContentFolderNameApplication = strategy.getApplication().contentFile(
                  folderName
                );

                 const infrastructureFile = strategy.getInfrastructure().getFileName(
                  folderName,
                  fileExtension
                );
                // Crear y escribir en el archivo dependencies.ts
                const filePathInfrastructure = path.join(
                  folderPath,
                  subFolders[2],
                  infrastructureFile
                );
                const fileContentInfrastructure = strategy.getInfrastructure().contentFile(
                  folderName
                );

                // Create Dependencies in Domain
                fs.writeFileSync(
                  filePathFolderNameDomain,
                  fileContentFolderNameDomain
                );
                // Create Dependencies in Application
                fs.writeFileSync(filePathApplication, fileContentFolderNameApplication);
                // Create Exports in Infrastructure
                fs.writeFileSync(filePathInfrastructure, fileContentInfrastructure);
                vscode.window.showInformationMessage(
                  `Folder "${folderName}" created with subfolders.`
                );
              } else {
                vscode.window.showErrorMessage(
                  `Folder "${folderName}" already exists.`
                );
              }
            }
          });
        // Resto del código para crear la estructura de carpetas en folderPath...
      } else {
        vscode.window.showErrorMessage("No folder selected.");
      }
      vscode.window.showInformationMessage(
        "Hello World from Hexagonal-Arquitecture-Folders!"
      );
    }
  );

  context.subscriptions.push(createFolder);
}

// Detectar lenguaje activo o del workspace
function detectLanguage(): string {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const languageId = editor.document.languageId;
    return languageId;
  }

  // Si no hay editor abierto, intentar detectar por archivos del workspace
  const files = vscode.workspace.textDocuments;
  if (files.length > 0) {
    return files[0].languageId;
  }

  // Default (si no puede detectar nada)
  return "typescript";
}

// Convertir el lenguaje en extensión de archivo
function getFileExtension(languageId: string): string {
  const map: Record<string, string> = {
    typescript: "ts",
    javascript: "js",
    python: "py",
    java: "java",
    go: "go",
  };
  return map[languageId.toLowerCase()] || "ts";
}

function getStrategy(languageId: string): Strategy {
  const map: Record<string, StrategyHexagonalFolder> = {
    typescript: new TsStrategyCreated(),
    javascript: new JsStrategyCreated(),
    python: new PythonStrategyCreated(),
    java: new JavaStrategyCreated(),
    go: new GoStrategyCreated(),
  };

  let strategy = map[languageId.toLowerCase()];
  if (!strategy) {
    strategy = map["typescript"];
  }
  return {
    execute: () => strategy,
  }
}

export function deactivate() {}
