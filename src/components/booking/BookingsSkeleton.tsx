
export default function BookingsSkeleton() {
    return (
        <div className="animate-pulse space-y-4" aria-hidden>
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="rounded-xl border border-border p-5"
                >
                    <div className="h-5 w-48 rounded bg-muted" />
                    <div className="mt-4 h-4 w-64 rounded bg-muted" />
                    <div className="mt-3 h-4 w-40 rounded bg-muted" />
                </div>
            ))}
        </div>
    )
}