export interface ExpectedBenefits {
  expectedRetirementAllowance: number; // קצבה צפוייה לגיל פרישה
  retirementAge: number; // גיל הפרישה
  expectedDisabilityAllowance: number; // קצבת נכות צפוייה
  survivorsBenefits: number; // קצבת שארים צפוייה
}

export interface ManagementFees {
  fromAccumulation: number; // מצבירה
  fromDeposit: number; // מהפקדה
}

export interface Route {
  percentage: number;
  name: string;
}

export interface InvestmentRoutes {
  benefits: Route; // תגמולים
  compensations: Route; // פיצויים
}

export interface Accumulation {
  percentage: number;
  balance: number;
}

export interface Accumulations {
  associate: Accumulation; // עמית
  employer: Accumulation; // מעסיק
  compensations: Accumulation; // פיצויים
}

export interface AnnualFinancialDatum {
  // TODO: define
  whatever: string;
}

export interface AnnualFinancialData {
  [key: string]: AnnualFinancialDatum;
}

export interface Deposit {
  amount: number; // סכום הפקדה
  date: Date; // תאריך הפקדה
  salaryMonth: string; // חודש משכורת
  definitiveSalary: number; // שכר קובע
  employerBenefits: number; // תגמול מעסיק
  associateBenefits: number; // תגמול עובד
  compensations: number; // פיצויים
}

export interface EmployerDeposit {
  employer: string; // שם המעסיק
  firstDepositDate: Date; // תאריך הפקדה ראשון
  lastDepositDate: Date; // תאריך הפקדה אחרון
  totalAssociateBenefits: number; // סה"כ תגמולי עמית
  totalEmployerBenefits: number; // סה"כ תגמולי מעסיק
  totalCompensstions: number; // סה"כ פיצויים
  depositsDetails?: Deposit[]; // פירוט הפקדות
}

export interface Coverages {
  disabilityPension: {
    // פנסיית נכות
    monthlyCost: number; // עלות חודשית
    definitiveSalary: number; // שכר קובע
    disabilityCoverageRate: number; // שיעור כיסוי נכות
    disabilityAllowance: number; // קצבה לנכות
    expandedDetails?: {
      status: string; // סטאטוס
      insuranceRoute: string; // מסלול ביטוחי
      seniorityMonths: number; // חודשי ותק
      disabilityCoverageRate: number; // שיעור כיסוי נכות
      franchise: boolean; // פרנציזה
      developingDisability: boolean; // נכות מתפתחת
      monthlyDisabilityRiskCost: number; // עלות סיכון נכות חודשי
    };
  };
  survivorsPension: {
    //פנסיית שארים
    monthlyCost: number; // עלות חודשית
    definitiveSalary: number; // שכר קובע
    spouseExpectedSurvivorsAllowance: number; // קצבת שארים צפויה לבן זוג
    orphanedExpectedSurvivorsAllowance: number; // קצבת שארים צפויה ליתום
    expandedDetails?: {
      status: string; // סטאטוס
      survivorsCoverageRate: number; // שיעור כיסוי לשארים
      seniorityMonths: number; // חודשי ותק
      waiverOfSurvivors: boolean; // ויתור על שארים
      spouseCoverageRate: number; // שיעור כיסוי לבני זוג
      orphanedCoverageRate: number; // שיעור כיסוי ליתום
      supportedParentExpectedSurvivorsPension: number; // פנסיית שארים צפויה להורה נתמך
    };
  };
}

export interface PersonalDetails {
  birthDate: Date; // תאריך לידה
  phone: string; // טלפון
  gender: 'M' | 'F'; // מין
  address: string; // כתובת
  email: string; // דוא"ל
}

export interface MenoraData {
  userName: string;
  userId: string;
  lastConnection: Date;
  dataRelevanceDate: Date; // תאריך נכונות הנתונים
  fundNumber: string; // מספר קופה
  expectedBenefits: ExpectedBenefits; // הקצבאות הצפויות
  accumulatedBalance: number; // יתרה צבורה
  joinDate: Date; // מתי הצטרפתי
  managementFees: ManagementFees; // דמי ניהול
  investmentRoutes: InvestmentRoutes; // חלוקת מסלולי השקעה
  accumulation: Accumulations; // צבירה
  annualFinancialData?: AnnualFinancialData;
  deposits?: EmployerDeposit[]; // הפקדות
  coverages?: Coverages; // כיסויים
  personalDetails?: PersonalDetails; // פרטים אישיים
}

export interface Config {
  validate: boolean;
  visibleBrowser: boolean;
  getAnnualFinancialData: boolean;
  getDeposits: boolean;
  getDepositsDetails: boolean;
  getCoverages: boolean;
  getCoveragesDetails: boolean;
  getPersonalDetails: boolean;
}

export interface Credentials {
  userID: string;
  phoneNumber: string;
}
