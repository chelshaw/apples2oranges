'use client'

import { InputBar } from "../form";

export default function NameLayout({ onNext, loading, title = 'Name your topic' }: { onNext: CallableFunction, loading: boolean, title?: string }) {
    return (
        <>
            <div className="content">

                {loading ? "Creating topic..." : title}
            </div>
            <div className="footer">
                <InputBar onSubmit={onNext} buttonText="Next" />
            </div>
        </>
    );
}
