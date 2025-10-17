import { capitalizeFirstLetter } from "../../utils";
import { StrategyHexagonalFolder, StrategyLayeredFolder } from "../strategy";

export default class GoStrategyCreated implements StrategyHexagonalFolder {

    getDomain(): StrategyLayeredFolder {
        return {
            getFileName: (folderName: string, extension: string): string => {
                return `${folderName.toLowerCase()}.${extension}`;
            },
            contentFile: (_folderName: string): string => {
                return `// TODO: Your content \n`
            }
        };
    }
    getApplication(): StrategyLayeredFolder {
         return {
            getFileName: (folderName: string, extension: string): string => {
                return `${folderName.toLowerCase()}-usecase.${extension}`;
            },
            contentFile: (folderName: string): string => {
                return `// TODO: Your content \n type ${capitalizeFirstLetter(folderName)}UseCase struct {\n // Your Code\n }`
            }
        };
    }
    getInfrastructure(): StrategyLayeredFolder {
         return {
            getFileName: (folderName: string, extension: string): string => {
                return `${folderName.toLowerCase()}-controller.${extension}`;
            },
            contentFile: (folderName: string): string => {
                return `// TODO: Your content \n func ${capitalizeFirstLetter(folderName)} {\n // Your Code\n }`
            }
        };
    }
}