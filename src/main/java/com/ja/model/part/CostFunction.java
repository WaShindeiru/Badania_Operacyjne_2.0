package com.ja.model.part;

import java.util.List;

public class CostFunction implements DayIncrementable, IFinishDay{

    private int dayMax;
    private int currentDay = -1;

    private History history;

    private ProductionCost productionCost;
    private StorageCost storageCost;

    private TruckPenalty truckPenalty;
    private final Storage storage;
    private final Production production;
    private final TruckQueue truckQueue;

    private final DayIncrementableComposite dayIncrementableComposite;
    private final FinishDayComposite finishDayComposite;

    private final Donate donate;
    private final CumultativePenalty cumultativePenalty;

    public CostFunction(List<Integer> expectedProduction, List<Integer> scheduledProduction, int dayMax) throws IllegalArgumentException {

        if(!((expectedProduction.size() == scheduledProduction.size()) && (scheduledProduction.size() == dayMax))) {
            throw new IllegalArgumentException();
        }

        this.dayMax = dayMax;

        history = new History(dayMax);

        productionCost = new ProductionCost();
        storageCost = new StorageCost();

        truckPenalty = new TruckPenalty();
        storage = new Storage(history, storageCost);
        production = new Production(history, productionCost, scheduledProduction);
        truckQueue = new TruckQueue(history, truckPenalty, expectedProduction);

        dayIncrementableComposite = new DayIncrementableComposite(dayMax);
        dayIncrementableComposite.addDayIncrementable(truckPenalty, storage, production, truckQueue, history);

        finishDayComposite = new FinishDayComposite();
        finishDayComposite.addFinishDayComposite(truckQueue);
        finishDayComposite.addFinishDayComposite(storage);

        donate = new Donate(history);
        cumultativePenalty = new CumultativePenalty(truckQueue);
    }

    @Override
    public void incrementDay() {
        currentDay++;
        dayIncrementableComposite.incrementDay();
    }

    @Override
    public void finishDay() {
        finishDayComposite.finishDay();
    }

    public double getCost() {
        boolean enoughProduction;

        while(currentDay < dayMax - 1) {
            this.incrementDay();

            enoughProduction = true;
            int currentProduction = production.getCurrentProduction();

            while(enoughProduction) {

                // if there are no truck in the queue
                if(truckQueue.isEmpty()) {
                    enoughProduction = false;
                    storage.storeProduction(currentProduction);

                } else {
                    int requiredProduction = truckQueue.peek();

                    // if today's production is bigger than required production
                    if(currentProduction >= requiredProduction) {
                        truckQueue.removeTruck();
                        currentProduction -= requiredProduction;

                        // if today's production + production in storage is smaller than required production
                    } else if (currentProduction + storage.getCurrentStorage() < requiredProduction) {
                        enoughProduction = false;
                        storage.storeProduction(currentProduction);

                        // if today's production + production in storage is greater than required production
                    } else if (currentProduction + storage.getCurrentStorage() >= requiredProduction) {
                        truckQueue.removeTruck();
                        storage.takeStoredProduction(requiredProduction - currentProduction);
                        currentProduction = 0;

                    }
                }
            }

            this.finishDayComposite.finishDay();
        }

        double cost = history.getTotalCost();

        double donateCost = donate.getDonate();
        cost -= donateCost;

        double penaltyCost = cumultativePenalty.getPenalty();
        cost += penaltyCost;

        return cost;
    }

    public String getHistory() {
        return history.toString();
    }
}
