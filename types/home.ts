export interface SubIndustry {
    id: string | number;
    name: string;
}

export interface Industry {
    id: string | number;
    name: string;
    subIndustries: SubIndustry[];
}

export interface ImageItem {
    id?: string;
    file?: string;
    url?: string;
    name?: string;
    title?: string;
}

export interface Festival {
    id: string;
    name: string;
    date: string;
    pic: string;
}
