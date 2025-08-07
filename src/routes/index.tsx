import DataListing from '@/components/CombinedList'
import ExpenseData from '@/components/ListExpense'
import { ThemeProvider } from '@/components/theme-provider'
import ThemeToggle from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { BadgeIndianRupee, Mail } from 'lucide-react'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <>
            <ExpenseData />
            <div className="mt-4">
                <DataListing />
            </div>
        </>
    )
}