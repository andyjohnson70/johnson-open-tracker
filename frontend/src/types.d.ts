interface GoogleSheet {
    properties?: {
        title?: string;
    };
}

interface TableProps {
    data: string[][];
    isPending: boolean
}

interface ConfettiProps {
    direction: string;
}
