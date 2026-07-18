export interface VisaDetail {
  title: string;
  subclass: string;
  category: "Skilled" | "Employer" | "Family" | "Other";
  overview: string;
  duration: string;
  cost: string;
  location: string;
  keyBenefits: string[];
  eligibility: string[];
  steps: string[];
}

export const visaDatabase: Record<string, VisaDetail> = {
  "skilled-189": {
    title: "Skilled Independent Visa",
    subclass: "Subclass 189",
    category: "Skilled",
    overview: "A points-tested permanent visa for skilled workers who are not sponsored by an employer, a state or territory government, or a family member. It allows you to live, work, and study anywhere in Australia as a permanent resident.",
    duration: "Permanent (PR)",
    cost: "From $4,640 AUD",
    location: "Onshore or Offshore",
    keyBenefits: [
      "Work and study anywhere in Australia",
      "Enroll in Medicare (Australia's public healthcare system)",
      "Sponsor eligible relatives for permanent residence",
      "Travel to and from Australia for 5 years",
      "Apply for Australian citizenship if eligible"
    ],
    eligibility: [
      "Have an occupation on the relevant skilled occupation list",
      "Have a suitable positive skills assessment for the occupation",
      "Satisfy the points test by scoring at least 65 points",
      "Be under 45 years of age when invited to apply",
      "Have at least Competent English (e.g. IELTS 6+ or PTE 50+ in all bands)",
      "Be invited to apply via Expression of Interest (EOI)"
    ],
    steps: [
      "Obtain a positive Skills Assessment from the relevant assessing authority",
      "Sit an English language test to verify competent or higher English ability",
      "Submit an Expression of Interest (EOI) through SkillSelect",
      "Wait for an Invitation Round to receive an Invitation to Apply (ITA)",
      "Submit a complete visa application with all supporting evidence within 60 days"
    ]
  },
  "skilled-190": {
    title: "Skilled Nominated Visa",
    subclass: "Subclass 190",
    category: "Skilled",
    overview: "A points-tested permanent visa for skilled workers who are nominated by an Australian state or territory government. Being nominated by a state adds 5 points to your immigration score and binds you to live and work in the nominating state for your first two years.",
    duration: "Permanent (PR)",
    cost: "From $4,640 AUD",
    location: "Onshore or Offshore",
    keyBenefits: [
      "Live, work, and study permanently in the nominating state",
      "Enroll in Medicare and sponsor eligible family members",
      "Receive 5 bonus points towards your immigration point score",
      "Travel to and from Australia for 5 years",
      "Direct pathway to citizenship"
    ],
    eligibility: [
      "Be nominated by an Australian state or territory government agency",
      "Have an occupation on the nominating state's occupation list",
      "Have a suitable skills assessment and score 65 points (including nomination points)",
      "Be under 45 years of age",
      "Have competent English or higher",
      "Submit EOI and receive state invitation"
    ],
    steps: [
      "Secure a positive Skills Assessment and pass English test requirements",
      "Submit an EOI in SkillSelect indicating state nomination interest",
      "Apply for State Nomination directly with the state government agency",
      "Once state nomination is approved, receive an automated invitation to apply from the federal government",
      "Lodge the subclass 190 visa application within 60 days"
    ]
  },
  "skilled-491": {
    title: "Skilled Work Regional (Provisional) Visa",
    subclass: "Subclass 491",
    category: "Skilled",
    overview: "A 5-year provisional points-tested visa for skilled workers nominated by a regional state government or sponsored by an eligible family member living in a designated regional area. It offers a direct pathway to permanent residency after 3 years.",
    duration: "5 Years (Provisional)",
    cost: "From $4,640 AUD",
    location: "Onshore or Offshore",
    keyBenefits: [
      "Live, work, and study in a designated regional area of Australia",
      "Receive 15 bonus points towards your point score from state nomination/sponsorship",
      "Access Medicare and public schooling options",
      "Pathway to Permanent Residency (Subclass 191) after living in regional area for 3 years"
    ],
    eligibility: [
      "Be nominated by a state/territory or sponsored by an eligible family member in a regional area",
      "Regional area includes most of Australia outside Sydney, Melbourne, and Brisbane",
      "Score at least 65 points (including the 15 nomination/sponsorship points)",
      "Under 45 years of age",
      "Competent English capability",
      "Positive skills assessment"
    ],
    steps: [
      "Complete Skills Assessment and English test (IELTS/PTE)",
      "Lodge EOI via SkillSelect and state nomination application (or family sponsor documents)",
      "Receive regional invitation to apply",
      "Submit regional visa application and provide health & character checks",
      "Move to regional Australia and live/work there in compliance with visa conditions"
    ]
  },
  "skills-assessment": {
    title: "Skills Assessment Process",
    subclass: "Migration Requirement",
    category: "Skilled",
    overview: "A skills assessment is a mandatory step for almost all skilled migration pathways to Australia. It verifies that your qualification, skills, and work experience meet the Australian standards for your nominated occupation.",
    duration: "Varies (typically 1 - 4 months validity of 3 years)",
    cost: "Varies by assessing authority ($500 - $1,500 AUD)",
    location: "Online",
    keyBenefits: [
      "Verifies your foreign credentials to Australian employers",
      "Essential prerequisite for submitting a SkillSelect EOI",
      "Validates years of skilled work experience for extra point claims",
      "Ensures professional registration requirements are matched"
    ],
    eligibility: [
      "Have relevant post-secondary qualifications matching the occupation",
      "Meet the minimum required years of post-qualification work experience",
      "Some authorities require English test results prior to application (e.g. ANMAC for nurses)"
    ],
    steps: [
      "Identify your ANZSCO code on the Skilled Occupations List",
      "Determine the designated Assessing Authority (e.g. ACS, Engineers Australia, VETASSESS, TRA)",
      "Gather academic certificates, transcripts, detailed reference letters, and payslips",
      "Lodge the skills assessment application and pay the fee",
      "Receive the Skills Assessment Outcome Letter to use in your visa application"
    ]
  },
  "employer-482": {
    title: "Temporary Skill Shortage Visa",
    subclass: "Subclass 482",
    category: "Employer",
    overview: "An employer-sponsored visa that enables employers to address labor shortages by bringing in genuine skilled workers where they cannot find an appropriately skilled Australian worker. It consists of Short-term, Medium-term, and Labor Agreement streams.",
    duration: "1 to 4 Years (depending on stream)",
    cost: "From $1,455 AUD (Short) / $3,035 AUD (Medium)",
    location: "Onshore or Offshore",
    keyBenefits: [
      "Work in Australia for your sponsoring employer",
      "Bring your immediate family members (who will have unrestricted work rights)",
      "Pathway to Permanent Residency (subclass 186) under the TRT stream",
      "No age limit applies for the 482 visa itself"
    ],
    eligibility: [
      "Be nominated by an approved standard business sponsor",
      "Have at least 2 years of relevant work experience in the nominated occupation",
      "Meet English language requirements",
      "Have a relevant qualification or equivalent experience",
      "Pass the Labor Market Testing (LMT) requirements unless exempt"
    ],
    steps: [
      "Employer lodges an application to become a Standard Business Sponsor",
      "Employer lodges a Nomination application for the specific occupation and candidate",
      "Candidate lodges the Subclass 482 visa application",
      "Provide health exams, character certificates, and qualifications checks",
      "Visa grant allows candidate to begin working for the sponsor"
    ]
  },
  "employer-186": {
    title: "Employer Nomination Scheme Visa",
    subclass: "Subclass 186",
    category: "Employer",
    overview: "A permanent residency visa for skilled workers nominated by their employer. It allows Australian employers to recruit skilled foreign workers to fill vacant positions on a permanent basis. It features Direct Entry (DE) and Temporary Residence Transition (TRT) streams.",
    duration: "Permanent (PR)",
    cost: "From $4,640 AUD",
    location: "Onshore or Offshore",
    keyBenefits: [
      "Permanent residence from day one (Direct Entry stream)",
      "Access Medicare and sponsor family members",
      "Unrestricted study and travel permissions",
      "Apply for citizenship once eligible"
    ],
    eligibility: [
      "Be nominated by an approved Australian employer",
      "Be under 45 years of age (exemptions apply for certain roles/TRT conditions)",
      "Have at least 3 years of relevant skilled work experience",
      "Have a positive skills assessment (Direct Entry stream)",
      "Competent English score"
    ],
    steps: [
      "Employer submits nomination application for the position",
      "Nominee secures skills assessment and English credentials",
      "Lodge the subclass 186 visa application linking to employer's nomination ID",
      "Undergo medical evaluations and national police checks",
      "Receive visa grant and remain working for employer in compliance with agreements"
    ]
  },
  "employer-494": {
    title: "Skilled Employer Sponsored Regional (Provisional) Visa",
    subclass: "Subclass 494",
    category: "Employer",
    overview: "A provisional visa that enables regional employers to address labor shortages by sponsoring skilled workers where they cannot find an appropriately skilled Australian worker. Sponsoring employers must be located in regional areas.",
    duration: "5 Years",
    cost: "From $4,640 AUD",
    location: "Onshore or Offshore",
    keyBenefits: [
      "Live, work, and study in regional Australia for 5 years",
      "Sponsor family members and access Medicare",
      "Pathway to regional Permanent Residency (subclass 191) after 3 years"
    ],
    eligibility: [
      "Be nominated by an approved regional sponsor",
      "Occupation must be on the regional occupation list",
      "Have at least 3 years of post-qualification full-time work experience",
      "Have a suitable positive skills assessment",
      "Be under 45 years of age",
      "Competent English ability"
    ],
    steps: [
      "Employer obtains Regional Migration Advice (RMA) from Local Regional Certifying Body (RCB)",
      "Employer lodges nomination for the regional role",
      "Employee secures positive skills assessment and lodges subclass 494 application",
      "Complete health checkups and regional registration checks",
      "Lodge visa and move to designated regional sponsor location"
    ]
  },
  "labour-agreement": {
    title: "Labour Agreement Pathway",
    subclass: "Custom Pathway",
    category: "Employer",
    overview: "A specialized visa pathway that allows Australian employers to sponsor skilled workers under customized labor agreements. These agreements are negotiated with the Australian Government to address specific industry or regional shortages where standard visa programs are not flexible enough.",
    duration: "Temporary to Permanent (varies by agreement type)",
    cost: "Varies by visa subclass (typically 482, 494, or 186 fees)",
    location: "Onshore or Offshore",
    keyBenefits: [
      "Enables sponsorship of occupations not on the standard skilled lists",
      "Can include age, English, and salary concessions depending on the industry",
      "Provides paths to PR for niche occupations (e.g. dairy farmers, meat workers, aged care workers)",
      "Addresses critical localized regional labor market demands"
    ],
    eligibility: [
      "Employer must have an active, signed Labour Agreement with the Commonwealth",
      "Employee must meet the terms of that specific agreement (e.g., specific age, English, or experience thresholds)",
      "Agreement types include Company Specific, Industry (e.g. Aged Care, Dairy, Meat), Designated Area Migration Agreements (DAMA), or Project Agreements"
    ],
    steps: [
      "Employer applies to the Department of Home Affairs to negotiate/join a Labour Agreement",
      "Once signed, employer lodges nomination for the foreign worker under the agreement terms",
      "Foreign worker lodges their visa application linking to the approved nomination",
      "Meet health, character, and customized skills requirements defined in the agreement"
    ]
  },
  "partner-visa": {
    title: "Partner Visa (Temporary & Permanent)",
    subclass: "Subclasses 820/801 & 309/100",
    category: "Family",
    overview: "Allows the partner or spouse of an Australian citizen, Australian permanent resident, or eligible New Zealand citizen to live in Australia. If you apply onshore, you receive a temporary subclass 820 visa transitioning to a permanent subclass 801 visa. If offshore, it is subclass 309 transitioning to subclass 100.",
    duration: "Temporary leading to Permanent (PR)",
    cost: "From $8,850 AUD",
    location: "Onshore (820/801) or Offshore (309/100)",
    keyBenefits: [
      "Live, work, and study in Australia without restrictions",
      "Access Medicare public health care immediately",
      "Bring dependent children under the application",
      "Clear pathway to permanent residency and citizenship"
    ],
    eligibility: [
      "Be in a genuine and continuing relationship with an eligible sponsor",
      "Be married or in a de facto relationship (usually for at least 12 months)",
      "Sponsor must be an Australian citizen, PR, or eligible NZ citizen",
      "Meet health and character requirements"
    ],
    steps: [
      "Gather comprehensive relationship evidence across four pillars (Financial, Household, Social, Commitment)",
      "Submit joint visa application (both temporary and permanent stages) and pay fee",
      "Sponsor completes sponsorship application form online",
      "Onshore applicants receive a Bridging Visa A (BVA) to remain legally while processing",
      "After 2 years from application, submit second-stage evidence to verify relationship continuity for permanent visa grant"
    ]
  },
  "parent-visa": {
    title: "Parent Visa Pathways",
    subclass: "Subclasses 103, 143, 173, 804, 864",
    category: "Family",
    overview: "Allows parents of settled Australian citizens, permanent residents, or eligible New Zealand citizens to migrate to Australia. Options include Non-Contributory (long queue times) and Contributory Parent visas (shorter queue but significantly higher application fees).",
    duration: "Permanent (PR) or Temporary (Provisional)",
    cost: "From $4,990 AUD (103/804) / From $48,495 AUD (143/864 Contributory)",
    location: "Onshore (Aged Parents) or Offshore",
    keyBenefits: [
      "Live permanently in Australia with your children",
      "Access Medicare (Contributory visa holders have immediate access)",
      "Work and study permissions",
      "Pathway to citizenship"
    ],
    eligibility: [
      "Have an eligible child who is a settled Australian citizen, permanent resident, or NZ citizen",
      "Pass the 'Balance of Family' test (at least half of your children must reside in Australia)",
      "Have an Assurance of Support (AOS) provider to guarantee financial security",
      "Meet Aged Parent thresholds if applying onshore"
    ],
    steps: [
      "Determine eligibility under the Balance of Family test",
      "Decide between Non-contributory (subclass 103) or Contributory (subclass 143) based on budget and timeline",
      "Prepare application form, identity documentation, and relationship proof",
      "Lodge application and wait in queue. Provide Assurance of Support when requested",
      "Undergo health exams and receive visa grant"
    ]
  },
  "visitor-visa": {
    title: "Visitor Visa",
    subclass: "Subclass 600",
    category: "Family",
    overview: "Allows you to visit Australia for tourism, business visitor activities, or to visit family members. It is a temporary visa that does not permit work in Australia.",
    duration: "Up to 3, 6, or 12 months",
    cost: "From $195 AUD (Offshore) / $490 AUD (Onshore)",
    location: "Onshore or Offshore",
    keyBenefits: [
      "Visit family and friends residing in Australia",
      "Cruise or holiday around Australia's states",
      "Conduct short business inquiries or attend conferences",
      "Study for up to 3 months total"
    ],
    eligibility: [
      "Intend to visit Australia temporarily for tourism, family, or business",
      "Have sufficient funds to support yourself during your stay",
      "Must not work in Australia (except business visitor streams)",
      "Meet genuine temporary entrant criteria"
    ],
    steps: [
      "Select appropriate stream (Tourist, Sponsored Family, Business Visitor)",
      "Lodge visitor application online via ImmiAccount and upload financial statements",
      "Provide letter of invitation from sponsor if applying in Sponsored Family stream",
      "Complete biometrics and medical exams if requested by the department",
      "Receive visa grant notification specifying entry conditions (single vs multiple entry)"
    ]
  },
  "graduate-visa-485": {
    title: "Temporary Graduate Visa",
    subclass: "Subclass 485",
    category: "Other",
    overview: "A temporary visa for international students who have completed their studies in Australia. It allows you to live, study, and work in Australia temporarily after completing your course, helping you gain valuable local work experience.",
    duration: "18 months to 4 years (varies by qualification and regional studies)",
    cost: "From $1,945 AUD",
    location: "Must apply Onshore (within 6 months of course completion)",
    keyBenefits: [
      "Full work and study rights in Australia",
      "Bring immediate family members",
      "Gaining Australian work experience to qualify for employer sponsorship or skilled points subclass pathways",
      "Extra regional study stream extends visa duration by 1-2 years"
    ],
    eligibility: [
      "Be under 50 years of age (note: policy caps apply for post-vocational streams)",
      "Hold an eligible student visa or have held one recently",
      "Meet the Australian Study Requirement (completed registered CRICOS course of at least 2 academic years)",
      "Meet English language test requirements (e.g. IELTS 6.5 or equivalent)",
      "Hold adequate health cover (OVHC)"
    ],
    steps: [
      "Receive official Completion Letter and academic transcripts from your university",
      "Secure Overseas Visitor Health Cover (OVHC) policy",
      "Lodge the Subclass 485 visa application within 6 months of course completion date",
      "Undergo police checks and submit application",
      "Receive visa grant and transition to graduate work rights"
    ]
  },
  "business-investment": {
    title: "Business Innovation & Investment",
    subclass: "Subclass 188 / 888",
    category: "Other",
    overview: "Designed for business owners, investors, and entrepreneurs who wish to establish, develop, or manage a new or existing business in Australia, or make a significant investment. It is a provisional visa that leads to permanent residency (Subclass 888) once business/investment benchmarks are met.",
    duration: "5 Years (Provisional leading to PR)",
    cost: "From $6,500 AUD",
    location: "Onshore or Offshore",
    keyBenefits: [
      "Establish or invest in a business in Australia",
      "Unrestricted travel, study, and work rights",
      "Clear pathway to permanent residency subclass 888",
      "Family members can accompany"
    ],
    eligibility: [
      "Be nominated by an Australian State or Territory government",
      "Pass the innovation points test or meet minimum asset, turnover, or funding thresholds",
      "Provide details of proposed business venture or investment plan",
      "Meet English and health checks"
    ],
    steps: [
      "Lodge an Expression of Interest (EOI) via SkillSelect",
      "Apply for State/Territory government nomination",
      "Receive invitation to apply and submit subclass 188 visa lodge",
      "Lodge funds in complying investments or establish the business venture in Australia",
      "Meet operational thresholds for 3 years, then apply for permanent subclass 888"
    ]
  },
  "citizenship": {
    title: "Australian Citizenship",
    subclass: "Final Milestone",
    category: "Other",
    overview: "Becoming an Australian citizen is the final step in the migration journey. It signifies a pledge of loyalty to Australia and grants you full legal rights, including the right to vote in elections, work in public service, and obtain an Australian passport.",
    duration: "Lifetime",
    cost: "From $540 AUD",
    location: "Onshore or Offshore",
    keyBenefits: [
      "Obtain a premium Australian passport (one of the strongest globally)",
      "Unrestricted right of entry and residence in Australia",
      "Right to vote in Federal and State elections",
      "Consular assistance abroad",
      "Access to federal public service and defense roles"
    ],
    eligibility: [
      "Be an Australian permanent resident (PR) at the time of application",
      "Meet the residence requirement (lived in Australia for the past 4 years, including at least the last 12 months as a PR)",
      "Not been absent from Australia for more than 12 months in the last 4 years, and no more than 90 days in the last year",
      "Be of good character and plan to reside in Australia",
      "Pass the Citizenship test (score 75% or higher, showing understanding of values and history)"
    ],
    steps: [
      "Confirm residency eligibility and check absence history",
      "Lodge the Citizenship application online via ImmiAccount and submit identity/residence evidence",
      "Attend a Citizenship Appointment for document verification and sit the Citizenship Test",
      "Receive official approval letter from the Department of Home Affairs",
      "Attend the local Council Citizenship Ceremony and make the pledge to receive your Citizenship Certificate"
    ]
  }
};
