import { useState } from 'react';
import { Table } from "@Components";
import { getPreviewSelectors, useAppSelector } from "@Services";
import { BLOB_TYPE, COMA, CSV_FILE_NAME, JSON_FILE_NAME, LETTER_A, NEW_LINE } from '@Constants';

export function Preview() {
    const preview = useAppSelector(getPreviewSelectors);
    const [exportMenu, setExportMenu] = useState(false);

    type Data = string[][] | string;

    function exportToJSON(data: Data): void {
        const jsonData = JSON.stringify(data, null, 2);
        downloadFile(jsonData, JSON_FILE_NAME);
    }

    function exportToCSV(data: Data): void {
        let csvData: string;
        if (Array.isArray(data)) {
            csvData = data.map(row => row.join(COMA)).join(NEW_LINE);
        } else {
            csvData = data;
        }
        downloadFile(csvData, CSV_FILE_NAME);
    }

    function downloadFile(data: string, fileName: string): void {
        const blob = new Blob([data], { type: BLOB_TYPE });
        const url = URL.createObjectURL(blob);
        const a = document.createElement(LETTER_A);
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setExportMenu(false)
    }

    return (
        <>
            <div className="flex items-center justify-start gap-4 border-y border-border px-4 py-1 cursor-pointer h-8">
                <span className="text-sm font-bold">Output</span>
                <div className="dropdown inline-block relative">
                    <button className="bg-exportButton text-xs py-1 px-2 rounded inline-flex items-center" onClick={() => setExportMenu(prev => !prev)}>
                        <span className="mr-1">Export data</span>
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                    </button>
                    {
                        exportMenu
                            ? (
                                <ul className="dropdown-menu absolute w-full shadow-xl bg-exportButtonMenu mt-1 rounded-md overflow-hidden z-50">
                                    <li onClick={() => exportToCSV(preview)} className="hover:bg-exportButtonMenuHover py-1 px-2 block whitespace-no-wrap">.csv</li>
                                    <li onClick={() => exportToJSON(preview)} className="hover:bg-exportButtonMenuHover py-1 px-2 block whitespace-no-wrap">.json</li>
                                </ul>
                            )
                            : null
                    }

                </div>
            </div>
            <div className="mt-2 pt-0 p-4 h-full overflow-y-auto">
                {typeof preview === "string" ? (
                    <div>{preview}</div>
                ) : (
                    <Table data={preview} />
                )}
            </div>
        </>
    );
}