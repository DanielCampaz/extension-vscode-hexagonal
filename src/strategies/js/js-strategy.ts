import { capitalizeFirstLetter } from "../../utils";
import { StrategyHexagonalFolder, StrategyLayeredFolder } from "../strategy";

export default class JsStrategyCreated implements StrategyHexagonalFolder {

    getDomain(): StrategyLayeredFolder {
        return {
            getFileName: (folderName: string, extension: string): string => {
                return `${folderName.toLowerCase()}.${extension}`;
            },
            contentFile: (folderName: string): string => {
                return `// TODO: Your content \n export default class ${capitalizeFirstLetter(folderName)} {\n // Your Code\n }`
            }
        };
    }
    getApplication(): StrategyLayeredFolder {
         return {
            getFileName: (folderName: string, extension: string): string => {
                return `${folderName.toLowerCase()}.usecase.${extension}`;
            },
            contentFile: (folderName: string): string => {
                return `// TODO: Your content \n export default class ${capitalizeFirstLetter(folderName)}UseCase {\n // Your Code\n }`
            }
        };
    }
    getInfrastructure(): StrategyLayeredFolder {
         return {
            getFileName: (folderName: string, extension: string): string => {
                return `${folderName.toLowerCase()}.controller.${extension}`;
            },
            contentFile: (folderName: string): string => {
                return `// TODO: Your content \n export default class ${capitalizeFirstLetter(folderName)} {\n // Your Code\n }`
            }
        };
    }
}