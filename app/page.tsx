const GENERATE_GLOBAL_LEDGER = () => {
  const corporateBases = [
    { name: "TATA Consultancy Services", email: "ops@tcs.in", plan: "Enterprise Platinum", currency: "₹", baseSpend: 850000, region: "India / APAC" },
    { name: "Apple Inc. Infrastructure", email: "billing@apple.com", plan: "Infinite Cloud Tier", currency: "$", baseSpend: 24000, region: "Americas / US" },
    { name: "BMW Logistics Systems", email: "supply@bmw.de", plan: "Premium Global Corporate", currency: "€", baseSpend: 18500, region: "Europe / EMEA" },
    { name: "Sony Corporation Tokyo", email: "it@sony.co.jp", plan: "Enterprise Platinum", currency: "¥", baseSpend: 2200000, region: "Japan / APAC" },
    { name: "Emirates Group Networks", email: "cloud@emirates.ae", plan: "Premium Global Corporate", currency: "AED ", baseSpend: 55000, region: "Middle East" },
    { name: "Reliance Jio Telemetry", email: "networks@jio.com", plan: "Infinite Cloud Tier", currency: "₹", baseSpend: 980000, region: "India / APAC" },
    { name: "Microsoft EMEA Systems", email: "azure.ops@microsoft.com", plan: "Enterprise Platinum", currency: "€", baseSpend: 31000, region: "Europe / EMEA" },
    { name: "Toyota Global Automation", email: "supply@toyota.co.jp", plan: "Premium Global Corporate", currency: "¥", baseSpend: 3400000, region: "Japan / APAC" }
  ];

  const syntheticList = [];
  // Scale loop count here (e.g., 5000 records)
  for (let i = 1; i <= 5000; i++) {
    const base = corporateBases[i % corporateBases.length];
    const ticketLoad = Math.floor(Math.random() * 15);
    const activityIndex = parseFloat((10 + Math.random() * 88).toFixed(1));

    const scaleFactor = 0.5 + (Math.random() * 1.5);
    const nativeSpend = Math.round(base.baseSpend * scaleFactor);
    
    let usdConversion = nativeSpend;
    if (base.currency === '₹') usdConversion = nativeSpend / 84;
    else if (base.currency === '€') usdConversion = nativeSpend / 0.92;
    else if (base.currency === '¥') usdConversion = nativeSpend / 150;
    else if (base.currency === 'AED ') usdConversion = nativeSpend / 3.67;

    // Advanced risk categorization rules
    let derivedRisk = "Low";
    if (ticketLoad >= 8 || activityIndex < 35 || (usdConversion > 20000 && activityIndex < 50)) {
      derivedRisk = "High";
    } else if (ticketLoad >= 4 || activityIndex < 60) {
      derivedRisk = "Medium";
    }

    syntheticList.push({
      id: `CUST-ID-#${String(i).padStart(5, '0')}`,
      name: `${base.name} [Node-${i}]`,
      email: base.email.replace("@", `${i}@`),
      planType: base.plan,
      nativeCurrency: base.currency,
      monthlySpendNative: nativeSpend,
      baseInUSD: usdConversion,
      tenureMonths: Math.floor(6 + Math.random() * 48),
      supportTickets: ticketLoad,
      usageScore: activityIndex,
      churnRisk: derivedRisk,
      region: base.region
    });
  }
  return syntheticList;
};