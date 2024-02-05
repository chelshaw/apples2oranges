'use client'

import { InputBar } from "../form";

export default function NameLayout({ onNext, title = 'Name your topic' }: { onNext: CallableFunction, title?: string }) {
    return (
        <>
            <div className="content">{title}</div>
            <div className="footer">
                <InputBar onSubmit={onNext} buttonText="Next" />
            </div>
        </>
    );
}
