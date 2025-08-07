import DataListing from '@/components/CombinedList'
import ExpenseData from '@/components/ListExpense'
import { createFileRoute } from '@tanstack/react-router'

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