import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { customerId } = await request.json();

    // 1. Fetch live metrics from PostgreSQL
    let customer = null;
    if (customerId) {
      try {
        customer = await prisma.customer.findUnique({
          where: { id: customerId },
        });
      } catch (dbError) {
        console.warn('DB lookup failed, using fallback.');
      }
    }

    if (!customer) {
      return NextResponse.json({ error: "Customer profile not found" }, { status: 404 });
    }

    // 2. Simulated AI Retention Strategy (No API Key Required!)
    const mockRetentionStrategy = `
**EXECUTIVE SUMMARY:**
${customer.name} represents a high revenue risk ($${customer.monthlySpend}/mo) due to high support ticket volume (${customer.supportTickets} tickets) and low engagement score (${customer.usageScore}/100).

**1. OPERATIONAL INTERVENTION:**
Assign a dedicated Technical Account Manager immediately to resolve the open support tickets within 24 hours and schedule an onboarding refresh session.

**2. COMMERCIAL INCENTIVES:**
Offer a 15% discount on their annual renewal if extended for 12 months to secure recurring revenue while stabilizing platform usage.
    `;

    // 3. Return response instantly
    return NextResponse.json({
      metrics: customer,
      retentionStrategy: mockRetentionStrategy.trim()
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}