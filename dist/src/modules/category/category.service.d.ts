import type { IAddCategory } from "./category.interface";
declare const createCategory: (payload: IAddCategory, userId: string) => Promise<{
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    author_id: string;
}>;
export declare const categoryServices: {
    createCategory: typeof createCategory;
};
export {};
//# sourceMappingURL=category.service.d.ts.map