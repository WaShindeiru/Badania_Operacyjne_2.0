export interface ResponseData {
    warehouseHistory: number[],
    productionHistoryRounded: number[],
    productionHistory: number[],
    totalCost: number,
    dayMax: number,
    costHistory: number[]

    //new
    missingProductionCount: number;
    iterationCount: number;
}