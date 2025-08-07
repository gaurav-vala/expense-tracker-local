import DataListing from '@/components/CombinedList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/history')({
    component: RouteComponent,
})

function RouteComponent() {
    return <section className='py-4'>
        <DataListing />
    </section>

}
