import { Component, OnInit } from '@angular/core';
import { RateOfIntrest } from './bank.model';
import { Emi } from './emi.model';
import { EmiService } from './emi.service';

@Component({
  selector: 'app-emi',
  templateUrl: './emi.component.html',
  styleUrls: ['./emi.component.css']
})
export class EmiComponent implements OnInit {
  public EmiModel: Emi = new Emi;
  addEmiFields: any = [];
  val = 0;
  public EMI: Emi[] = [];
  public bank: Emi[] = [];
  selectedBank: any;
  public rateOfIntrest: RateOfIntrest[] = [];
  public roi: RateOfIntrest[] = [];
  bankid: any;
  public isBankShow = true;
  constructor(
    private emiService: EmiService,

  ) {
    this.getBankList();
    this.getROIList();
  }
  bankOpen() {
    this.isBankShow = false;
  }
  ngOnInit(): void {
    this.addEmiFields = [{ name: this.val }];
    this.val++;
  }
  addEmiMonths() {
    this.val++;
    this.addEmiFields.push({ name: this.val });
  }
  removeEmiMonths(val) {
    this.addEmiFields.splice(val, 1);
  }
  addBankList() {
    this.emiService.saveBankList(this.EmiModel).subscribe((response) => {
      console.log(response);
    })
  }
  getBankList() {
    this.emiService.getBankList().subscribe((data: any) => {
      this.EMI = data;
    });
  }
  selectBankList(id) {
    this.bankid = id;
    this.EMI.forEach(element => {
      if (element.id == id) {
        this.selectedBank = element.bankname;
      }
    })
  }
  saveROIntrest(data) {
    this.addEmiFields.forEach(element => {
      element.bankid = this.bankid
    });
    this.emiService.addEmiOption(this.addEmiFields).subscribe((data: any) => {
      alert("succfull");
      this.getROIList();
    })
  }
  getROIList() {
    this.emiService.getRateOfIntrest().subscribe((data: any) => {
      this.roi = data;
    });
  }
  removeEmi(id){
    this.emiService.removeROIList(id).subscribe((req) => {
      this.getROIList();
    })
  }
  closeAddBank(){
    this.isBankShow=true;
  }
}
