import { InputBar } from "@/shared/form";

export default function UrlsLayout({ onNext, title = 'Add URLs about your topic' }: { onNext: CallableFunction, title?: string }) {
    // TODO: for allowing multiple URL sources
    // const [urls, setUrls] = useState<string[]>([])
    // const addUrl = useCallback((newValue: string) => {
    //     const values = [...urls];
    //     values.push(newValue);
    //     setUrls(values);
    // }, [urls, setUrls])

    // const removeUrl = useCallback((idx: number) => {
    //     const values = [...urls];
    //     values.splice(idx, 1);
    //     setUrls(values);
    // }, [urls, setUrls])

    return (
        <>
            <div className="content">
                {title}
            </div>
            <div className="footer">
                <InputBar onSubmit={onNext} />
            </div>
        </>
    );
}
