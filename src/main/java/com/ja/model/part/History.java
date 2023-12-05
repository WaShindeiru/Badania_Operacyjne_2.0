package com.ja.model.part;

import lombok.Getter;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;

public class History implements DayIncrementable {

    @Getter
    private int dayCounter;
    @Getter
    private List<Integer> warehouseHistory;
    @Getter
    private List<Integer> productionHistory;
    @Getter
    private double totalCost;
    @Getter
    private int dayMax;

    public History(int dayMax) {
        warehouseHistory = new ArrayList<>();
        productionHistory = new ArrayList<>();

        dayCounter = -1;
        totalCost = 0;
        this.dayMax = dayMax;
    }

    public History() {
        warehouseHistory = new ArrayList<>();
        productionHistory = new ArrayList<>();

        dayCounter = -1;
        totalCost = 0;
    }

    @Override
    public void incrementDay() {
        dayCounter += 1;
    }

    public void addProduction(int production) {
        productionHistory.add(production);
    }

    public void addWarehouse(int storage) {
        warehouseHistory.add(storage);
    }

    public void addCost(double cost) {
        totalCost += cost;
    }

    public int getProduction(int day) {
        return productionHistory.get(day);
    }

    private class ProductionHistoryIterator implements Iterator<Integer> {

        int index;
        List<Integer> productionHistory;

        ProductionHistoryIterator() {
            this.productionHistory = History.this.productionHistory;
            index = 0;
        }

        @Override
        public boolean hasNext() {
            return index < productionHistory.size();
        }

        @Override
        public Integer next() {
            if(hasNext()) {
                int temp = productionHistory.get(index);
                index++;
                return temp;
            }

            else {
                throw new NoSuchElementException();
            }
        }
    }

    public Iterator<Integer> getProductionHistoryIterator() {
        return new ProductionHistoryIterator();
    }

    @Override
    public String toString() {
        return "Production history: " + productionHistory.toString() + "\n" + "Warehouse history: " + warehouseHistory.toString();
    }
}
