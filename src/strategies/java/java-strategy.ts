import { capitalizeFirstLetter } from "../../utils";
import { StrategyHexagonalFolder, StrategyLayeredFolder } from "../strategy";

export default class JavaStrategyCreated implements StrategyHexagonalFolder {

    getDomain(): StrategyLayeredFolder {
        return {
            getFileName: (folderName: string, extension: string): string => {
                return `${capitalizeFirstLetter(folderName)}.${extension}`;
            },
            contentFile: (folderName: string): string => {
                return `// TODO: Your content \n package; //tab package \n \n interface ${capitalizeFirstLetter(folderName)} {\n // Your Code\n }`
            }
        };
    }
    getApplication(): StrategyLayeredFolder {
         return {
            getFileName: (folderName: string, extension: string): string => {
                return `${capitalizeFirstLetter(folderName)}Usecase.${extension}`;
            },
            contentFile: (folderName: string): string => {
                return `// TODO: Your content \n package; //tab package \n \n interface ${capitalizeFirstLetter(folderName)}UseCase {\n // Your Code\n }`
            }
        };
    }
    getInfrastructure(): StrategyLayeredFolder {
         return {
            getFileName: (folderName: string, extension: string): string => {
                return `${capitalizeFirstLetter(folderName)}Controller.${extension}`;
            },
            contentFile: (folderName: string): string => {
                return `// TODO: Your content \n package; //tab package \n \n class ${capitalizeFirstLetter(folderName)}Controller {\n // Your Code\n }`
            }
        };
    }
}