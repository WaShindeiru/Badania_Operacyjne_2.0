package com.ja.model.dto;

import com.ja.model.part.History;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HistoryDTO {

    private List<Integer> warehouseHistory;
    private List<Integer> productionHistoryRounded;
    private List<Integer> productionHistory;
    private double totalCost;
    private int dayMax;
    private int missingProductionCount;

    public HistoryDTO(History history) {
        warehouseHistory = history.getWarehouseHistory();
        productionHistoryRounded = history.getProductionHistoryRounded();
        totalCost = history.getTotalCost();
        dayMax = history.getDayMax();
        productionHistory = history.getProductionHistory();
        missingProductionCount = history.getMissingProduct();
    }
}
