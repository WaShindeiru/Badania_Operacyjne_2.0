package com.ja.model.abstraction;

import com.ja.model.part.History;

import java.util.Map;

public interface IFactory {

    void setProductionCost(Map<Integer, Double> productionCostMap, int maxProduction);

    void setStorageCost(Map<Integer, Double> storageCostMap, int storage);

    void setTruckPenalty(Map<Integer, Double> truckCostMap);

    void setDonateValue(double donateValue);

    void setCumulativePenalty(double cumulativePenaltyValue);

    History compute();
}
