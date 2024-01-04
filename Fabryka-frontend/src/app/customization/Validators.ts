import { FormControl } from "@angular/forms";

export function negativeValidator(control: FormControl): {[s: string]: boolean} {
    if(control.value < 0) {
        return {'valueIsNegative': true}
    }

    return null;
}

export function checkIfNumber(control: FormControl): {[s: string]: boolean} {
    if (isNaN(Number(control.value))) {
        return {'notANumber': true};
    }

    return null;
}

export function checkIfNumberPositive(control: FormControl): {[s: string]: boolean} {
    let temp = Number(control.value);
    if(isNaN(temp)) {
        return {'notANumber': true};
    }

    if(!Number.isInteger(temp)) {
        return {'notAInteger': true};
    }

    return null;
}

export function checkIfNumberInRange(control: FormControl): {[s: string]: boolean} {
    const left = 0;
    const right = 1;
    let temp = Number(control.value);
    if(isNaN(temp)) {
        return {'notANumber': true};
    }

    if(temp < left || temp > right) {
        return {'notInRange': true};
    }

    return null;
}

export function checkIfNumberPositiveFloat(control: FormControl): {[s: string]: boolean} {
    let temp = Number(control.value);
    if(isNaN(temp)) {
        return {'notANumber': true};
    }

    if(temp < 0) {
        return {'negativeNumber': true};
    }

    return null;
}