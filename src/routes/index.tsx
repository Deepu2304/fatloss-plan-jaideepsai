import { createFileRoute } from '@tanstack/react-router'
import DietPlan from '@/components/DietPlan'

export const Route = createFileRoute('/')({
  component: DietPlan,
})
