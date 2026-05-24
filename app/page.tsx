import { LandingNav } from "@/components/landing/LandingNav"
import { LandingHero } from "@/components/landing/LandingHero"
import { LandingFeatures } from "@/components/landing/LandingFeatures"
import { LandingHowItWorks } from "@/components/landing/LandingHowItWorks"
import { LandingPricing } from "@/components/landing/LandingPricing"
import { LandingFooter } from "@/components/landing/LandingFooter"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LandingNav />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingPricing />
      </main>
      <LandingFooter />
    </div>
  )
}
