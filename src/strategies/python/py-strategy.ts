import { capitalizeFirstLetter } from "../../utils";
import { StrategyHexagonalFolder, StrategyLayeredFolder } from "../strategy";

export default class PythonStrategyCreated implements StrategyHexagonalFolder {

    getDomain(): StrategyLayeredFolder {
        return {
            getFileName: (folderName: string, extension: string): string => {
                return `${capitalizeFirstLetter(folderName)}.${extension}`;
            },
            contentFile: (_folderName: string): string => {
                return `// TODO: Your content \n`
            }
        };
    }
    getApplication(): StrategyLayeredFolder {
         return {
            getFileName: (folderName: string, extension: string): string => {
                return `${capitalizeFirstLetter(folderName)}-usecase.${extension}`;
            },
            contentFile: (folderName: string): string => {
                return `// TODO: Your content \n class ${capitalizeFirstLetter(folderName)}UseCase {\n // Your Code\n }`
            }
        };
    }
    getInfrastructure(): StrategyLayeredFolder {
         return {
            getFileName: (folderName: string, extension: string): string => {
                return `${capitalizeFirstLetter(folderName)}-controller.${extension}`;
            },
            contentFile: (folderName: string): string => {
                return `// TODO: Your content \n class ${capitalizeFirstLetter(folderName)}Controller {\n // Your Code\n }`
            }
        };
    }
}