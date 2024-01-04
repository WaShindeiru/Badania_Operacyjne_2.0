import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { PlotlyService } from '../plotly.service';
import { checkIfNumber, checkIfNumberInRange, checkIfNumberPositive, checkIfNumberPositiveFloat, negativeValidator } from './Validators';

@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.css']
})
export class CustomizationComponent implements OnInit{
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  products: number[] = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  totalCost: number = 0;
  numberOfIter: number = 0;
  missedProduction: number = 0;
  productionHistory: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  productionHistoryRounded: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  warehouseHistory: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  costHistory: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  customizationForm!: FormGroup;

  constructor(private httpService: HttpService, private plot: PlotlyService) {}

  ngOnInit() {
    let productionCostMap = [5000, 14000, 15000, 17000, 20000, 52000, 27000, 30000, 35000, 40000]
    let productionArray = [];
    for(let i=0; i<productionCostMap.length; i++) {
      productionArray.push(new FormControl(productionCostMap[i],
        [Validators.required, negativeValidator.bind(this), checkIfNumber.bind(this)]));

    }

    let warehouseCostMap = [3000, 4000, 6000, 8000, 7000, 8000, 9000, 1000, 1100, 1200];
    let warehouseArray = [];
    for(let i=0; i<warehouseCostMap.length; i++) {
      warehouseArray.push(new FormControl(warehouseCostMap[i],
        [Validators.required, negativeValidator.bind(this), checkIfNumber.bind(this)]));

    }

    let truckCostMap = [2000, 5000, 4000, 3000, 5000, 2000, 2000, 2000, 3000, 2000];
    let penaltyArray = [];
    for(let i=0; i<truckCostMap.length; i++) {
      penaltyArray.push(new FormControl(truckCostMap[i],
        [Validators.required, negativeValidator.bind(this), checkIfNumber.bind(this)]));

    }

    let scheduledProductionTemp = [400, 450, 300, 1000, 100, 400, 450, 600, 600, 200];
    let scheduledArray = [];
    for(let i=0; i<scheduledProductionTemp.length; i++) {
      scheduledArray.push(new FormControl(scheduledProductionTemp[i],
        [Validators.required, negativeValidator.bind(this), checkIfNumber.bind(this)]));

    }

    this.customizationForm = new FormGroup({

      algorithmProperites: new FormGroup({
        swarmSize: new FormControl(100,
          [Validators.required, checkIfNumberPositive.bind(this)]),
        
        inertia: new FormControl(0.8,
          [Validators.required, checkIfNumberInRange.bind(this)]),
        
        c1: new FormControl(0.1,
          [Validators.required, checkIfNumberInRange.bind(this)]),

        c2: new FormControl(0.1,
          [Validators.required, checkIfNumberInRange.bind(this)]),

        iterStop: new FormControl(10,
        [Validators.required, checkIfNumberPositive.bind(this)])
      }),

      factoryProperties: new FormGroup({
        'donateValue': new FormControl(2000,
          [Validators.required, checkIfNumberPositiveFloat.bind(this)]),
          
        'cumPenaltyValue': new FormControl(97.5,
          [Validators.required, checkIfNumberPositiveFloat.bind(this)]),
          
        'productionTable': new FormArray(productionArray),

        'warehouseTable': new FormArray(warehouseArray),

        'penaltyTable': new FormArray(penaltyArray),

        'scheduledProduction': new FormArray(scheduledArray)
      })
    });
  }

  getProductionCost() {
    return (<FormArray>this.customizationForm.get('factoryProperties.productionTable')).controls;
  }

  getWarehouseCost() {
    return (<FormArray>this.customizationForm.get('factoryProperties.warehouseTable')).controls;
  }

  getPenaltyTable() {
    return (<FormArray>this.customizationForm.get('factoryProperties.penaltyTable')).controls;
  }

  getScheduledProduction() {
    return (<FormArray>this.customizationForm.get('factoryProperties.scheduledProduction')).controls;
  }

  // getControls() {
  //   return (<FormArray>this.signupForm.get('hobbies')).controls;
  // }

  onSubmit() {
    console.log(this.customizationForm);

    const production = this.customizationForm.get('factoryProperties.productionTable').value;
    const productionCostMap = {};
    for(let i=0; i<production.length; i++) {
      productionCostMap[100 * (i + 1)] = production.at(i);
    }

    const warehouse = this.customizationForm.get('factoryProperties.warehouseTable').value;
    const storageCostMap = {};
    for(let i=0; i<warehouse.length; i++) {
      storageCostMap[100 * (i + 1)] = warehouse.at(i);
    }

    const truck = this.customizationForm.get('factoryProperties.penaltyTable').value;
    const truckCostMap = {};
    for(let i=0; i<truck.length; i++) {
      truckCostMap[(i + 1)] = truck.at(i);
    }

    const temp = {
      'donateValue': this.customizationForm.get('factoryProperties.donateValue').value,
      'cumulativePenaltyValue': this.customizationForm.get('factoryProperties.cumPenaltyValue').value,
      'inertia': this.customizationForm.get('algorithmProperites.inertia').value,
      'c1': this.customizationForm.get('algorithmProperites.c1').value,
      'c2': this.customizationForm.get('algorithmProperites.c2').value,
      'swarmSize': this.customizationForm.get('algorithmProperites.swarmSize').value,
      'iterStop': this.customizationForm.get('algorithmProperites.iterStop').value,
      'expectedProduction': this.customizationForm.get('factoryProperties.scheduledProduction').value,
      'truckCostMap': truckCostMap,
      'productionCostMap': productionCostMap,
      'storageCostMap': storageCostMap
    }

    console.log(temp);

    let response;

    this.httpService.calculate(temp).subscribe((aha) => {
      console.log(aha);

      let x = [];
      for(let i=0; i<aha.costHistory.length; i++) {
        x.push(i);
      }

      this.plot.plotLine("Wykres kosztu od liczby iteracji","plot",x,aha.costHistory);

      this.totalCost = aha.totalCost;
      this.productionHistory = aha.productionHistory;
      this.productionHistoryRounded = aha.productionHistoryRounded;
      this.warehouseHistory = aha.warehouseHistory;
      this.costHistory = aha.costHistory;
      this.numberOfIter = aha.iterationCount;
      this.missedProduction = aha.missingProductionCount;
    })

  }
}
