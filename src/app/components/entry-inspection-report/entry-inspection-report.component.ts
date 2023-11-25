import { EntryInspectionInfo } from './../../models/GetEntryInspectionInfo/EntryInspectionInfo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-inspection-report',
  templateUrl: './entry-inspection-report.component.html',
  styleUrls: ['./entry-inspection-report.component.scss']
})
export class EntryInspectionReportComponent implements OnInit {

  @Input() EntryInspectionInfo: EntryInspectionInfo;
  MJobType: boolean = false;
  BJobType: boolean = false;

  CashPayMode: boolean = false;
  CreditPayMode: boolean = false;
  WarrantyPayMode: boolean = false;
  HRPayMode: boolean = false;
  InsurancePayMode: boolean = false;
  BuPayMode: boolean = false;
  DentFaultSymbol: boolean = false;
  RustFaultSymbol: boolean = false;
  ChipeFaultSymbol: boolean = false;
  ScratchFaultSymbol: boolean = false;

  InternalLight: boolean = false;
  Radio: boolean = false;
  Liner: boolean = false;
  Clock: boolean = false;
  AshTray: boolean = false;
  SideMirror: boolean = false;
  Lighter: boolean = false;
  Horn: boolean = false;
  HazardLight: boolean = false;
  Jack: boolean = false;
  ToolJack: boolean = false;
  SpareTyre: boolean = false;
  SaftyBuilt: boolean = false;
  FrontAndRearLights: boolean = false;
  Wipper: boolean = false;
  FuseBoxCover: boolean = false;
  DoorOuterHand: boolean = false;
  DoorInnerHand: boolean = false;
  WheelCap: boolean = false;
  FuelCap: boolean = false;
  RadCap: boolean = false;
  BrakeOilCap: boolean = false;
  ClutchOilCap: boolean = false;
  OilCap: boolean = false;
  DarksonOilCap: boolean = false;
  FloorPedals: boolean = false;
  HandBrakeCover: boolean = false;
  EngineCover: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log("EntryInspectionReportComponent");
    console.log(this.EntryInspectionInfo);

    this.MJobType = this.EntryInspectionInfo.JobTypeSelection == "M" ? true : false;
    this.BJobType = this.EntryInspectionInfo.JobTypeSelection == "B" ? true : false;

    this.CashPayMode = this.EntryInspectionInfo.PayModeSelection == "Cash" ? true : false;
    this.CreditPayMode = this.EntryInspectionInfo.PayModeSelection == "Credit" ? true : false;
    this.WarrantyPayMode = this.EntryInspectionInfo.PayModeSelection == "Warranty" ? true : false;
    this.HRPayMode = this.EntryInspectionInfo.PayModeSelection == "HR" ? true : false;
    this.InsurancePayMode = this.EntryInspectionInfo.PayModeSelection == "Insurance" ? true : false;
    this.BuPayMode = this.EntryInspectionInfo.PayModeSelection == "Bu" ? true : false;


    this.DentFaultSymbol = this.EntryInspectionInfo.Dent == "Y" ? true : false;
    this.ScratchFaultSymbol = this.EntryInspectionInfo.Scratch == "Y" ? true : false;
    this.ChipeFaultSymbol = this.EntryInspectionInfo.Chipe == "Y" ? true : false;
    this.RustFaultSymbol = this.EntryInspectionInfo.Rust == "Y" ? true : false;

    this.InternalLight = this.EntryInspectionInfo.InternalLight == "Y" ? true : false;
    this.Radio = this.EntryInspectionInfo.Radio == "Y" ? true : false;
    this.Liner = this.EntryInspectionInfo.Liner == "Y" ? true : false;
    this.Clock = this.EntryInspectionInfo.Clock == "Y" ? true : false;
    this.AshTray = this.EntryInspectionInfo.AshTray == "Y" ? true : false;
    this.SideMirror = this.EntryInspectionInfo.SideMirror == "Y" ? true : false;
    this.Lighter = this.EntryInspectionInfo.Lighter == "Y" ? true : false;
    this.Horn = this.EntryInspectionInfo.Horn == "Y" ? true : false;
    this.HazardLight = this.EntryInspectionInfo.HazardLight == "Y" ? true : false;
    this.Jack = this.EntryInspectionInfo.Jack == "Y" ? true : false;
    this.ToolJack = this.EntryInspectionInfo.ToolJack == "Y" ? true : false;
    this.SpareTyre = this.EntryInspectionInfo.SpareTyre == "Y" ? true : false;
    this.SaftyBuilt = this.EntryInspectionInfo.SaftyBuilt == "Y" ? true : false;
    this.FrontAndRearLights = this.EntryInspectionInfo.FrontAndRearLights == "Y" ? true : false;
    this.Wipper = this.EntryInspectionInfo.Wipper == "Y" ? true : false;
    this.FuseBoxCover = this.EntryInspectionInfo.FuseBoxCover == "Y" ? true : false;
    this.DoorOuterHand = this.EntryInspectionInfo.DoorOuterHand == "Y" ? true : false;
    this.DoorInnerHand = this.EntryInspectionInfo.DoorInnerHand == "Y" ? true : false;
    this.WheelCap = this.EntryInspectionInfo.WheelCap == "Y" ? true : false;
    this.FuelCap = this.EntryInspectionInfo.FuelCap == "Y" ? true : false;
    this.RadCap = this.EntryInspectionInfo.RadCap == "Y" ? true : false;
    this.BrakeOilCap = this.EntryInspectionInfo.BrakeOilCap == "Y" ? true : false;
    this.ClutchOilCap = this.EntryInspectionInfo.ClutchOilCap == "Y" ? true : false;
    this.OilCap = this.EntryInspectionInfo.OilCap == "Y" ? true : false;
    this.DarksonOilCap = this.EntryInspectionInfo.DarksonOilCap == "Y" ? true : false;
    this.FloorPedals = this.EntryInspectionInfo.FloorPedals == "Y" ? true : false;
    this.HandBrakeCover = this.EntryInspectionInfo.HandBrakeCover == "Y" ? true : false;
    this.EngineCover = this.EntryInspectionInfo.EngineCover == "Y" ? true : false;


  }



}
