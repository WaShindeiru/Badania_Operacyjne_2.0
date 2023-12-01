package com.ja.model.part;


public class CumultativePenalty {

    private final TruckQueue truckQueue;
    public double penaulty = 97.5;

    public CumultativePenalty(TruckQueue queue) {
        this.truckQueue = queue;
    }

    public double getPenalty() {

        int missedProduction = 0;

        for(var i : truckQueue) {
            missedProduction += i;
        }

        if (missedProduction < 0) {
            throw new RuntimeException("missedProduction is lower than 0!");
        } else {
            return missedProduction * penaulty;
        }
    }
}
