export interface StrategyLayeredFolder {
    getFileName(folderName: string, extension: string): string;
    contentFile(folderName: string): string;
}
export interface StrategyHexagonalFolder {
  getDomain(): StrategyLayeredFolder;
  getApplication(): StrategyLayeredFolder;
  getInfrastructure(): StrategyLayeredFolder;
}
export default interface Strategy {
  execute(): StrategyHexagonalFolder;
}