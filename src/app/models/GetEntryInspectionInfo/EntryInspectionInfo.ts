import { ReportImageModel } from "../GetJobServiceReport/ReportImageModel";

export class EntryInspectionInfo {
    Id: string;
    JobNo: string;
    CustName: string;
    DriverName: string;
    Phone: string;
    ServiceAdv: string;
    EngPhone: string;
    PlateNo: string;
    Model: string;
    EngineNo: string;
    ChassisNo: string;
    KmReading: string;
    RepairCard: string;
    Dent: string;
    Scratch: string;
    Chipe: string;
    Rust: string;
    InternalLight: string;
    Radio: string;
    Liner: string;
    Clock: string;
    AshTray: string;
    SideMirror: string;
    Lighter: string;
    Horn: string;
    HazardLight: string;
    Jack: string;
    ToolJack: string;
    SpareTyre: string;
    SaftyBuilt: string;
    FrontAndRearLights: string;
    Wipper: string;
    FuseBoxCover: string;
    DoorOuterHand: string;
    DoorInnerHand: string;
    WheelCap: string;
    FuelCap: string;
    RadCap: string;
    BrakeOilCap: string;
    ClutchOilCap: string;
    OilCap: string;
    DarksonOilCap: string;
    FloorPedals: string;
    HandBrakeCover: string;
    EngineCover: string;
    CustRequest: string;
    GenRemarks: string;
    FuelSelection: string;
    JobTypeSelection: string;
    PayModeSelection: string;
    TimeIn: string;
    DeliverDate: string;
    DeliverTime: string;
    AltPhone: string;
    EmpCode: string;
    submit_uid: string;
    cr_dt: string;
    submit_dt: string;
    submitted: string;
    CustomerSignature: string;
    InspectionImages: ReportImageModel[];
}
